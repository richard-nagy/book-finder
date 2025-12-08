import { useBook } from "@/context/BookContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { googleBooksApiKey } from "@/lib/constants";
import { Page, SearchQuery } from "@/lib/types";
import { isStringEmpty } from "@/lib/utils";
import { ArrowLeft, Search } from "lucide-react";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type FC,
    type KeyboardEvent,
    type ReactElement,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchFieldDialog from "./SearchFieldDialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const firstPageNumber = "1";

type SearchInputProps = {
    /** If true, show a back button. */
    showBackButton?: boolean;
    /** If true, show a button instead that opens a search dialog. */
    isDialogViewAllowed?: boolean;
    /** Optional additional CSS class names to apply to the container element. */
    className?: string;
};

const SearchField: FC<SearchInputProps> = ({
    showBackButton,
    isDialogViewAllowed,
    className,
}): ReactElement | null => {
    const isMobile = useIsMobile();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { currentSearchQuery, fetchBooks } = useBook();

    const isSearchPage = useMemo(
        () => location.pathname === `/${Page.search}`,
        [],
    );

    const searchQuery =
        isSearchPage ?
            (searchParams.get(SearchQuery.q) ?? currentSearchQuery ?? "")
        :   "";

    const [inputValue, setInputValue] = useState<string>(searchQuery);

    const canGoBack = (history.state?.idx ?? 0) > 0;

    const currentPageNumber = useMemo(
        () => parseInt(searchParams.get(SearchQuery.page) ?? firstPageNumber),
        [searchParams],
    );

    const isInputEmpty = useMemo(() => isStringEmpty(inputValue), [inputValue]);

    const navigateToSearchQuery = useCallback(() => {
        navigate(`/search?q=${inputValue ?? ""}&page=${firstPageNumber}`, {
            relative: "path",
        });
    }, [inputValue, navigate]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" && inputValue && !isInputEmpty) {
                navigateToSearchQuery();
            }
        },
        [inputValue, isInputEmpty, navigateToSearchQuery],
    );

    const onBackButtonClick = useCallback(() => {
        if (isSearchPage) {
            navigate(Page.homepage);
        } else if (location.pathname.includes(`/${Page.book}`)) {
            if (!isStringEmpty(searchQuery)) {
                navigate(-1);
            } else {
                navigate(Page.homepage);
            }
        }
    }, [navigate, searchQuery, isSearchPage]);

    useEffect(() => {
        setInputValue(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        if (isSearchPage && !isInputEmpty) {
            fetchBooks(searchQuery, currentPageNumber);
        }
    }, [
        currentPageNumber,
        fetchBooks,
        isInputEmpty,
        isSearchPage,
        searchQuery,
    ]);

    const backButton =
        showBackButton ?
            <Button
                size="icon"
                disabled={!canGoBack}
                onClick={onBackButtonClick}
            >
                <ArrowLeft />
            </Button>
        :   null;

    if (!googleBooksApiKey) {
        return null;
    }

    return (
        <div
            className={`flex flex-row gap-2 justify-center align-middle ${className}`}
        >
            {backButton}
            {isMobile && isDialogViewAllowed ?
                <SearchFieldDialog
                    handleKeyDown={handleKeyDown}
                    inputValue={inputValue}
                    isInputEmpty={isInputEmpty}
                    navigateToSearchQuery={navigateToSearchQuery}
                    setInputValue={setInputValue}
                />
            :   <>
                    <Input
                        className="w-75"
                        type="text"
                        value={inputValue}
                        autoFocus
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button
                        size="icon"
                        disabled={isInputEmpty}
                        onClick={navigateToSearchQuery}
                    >
                        <Search />
                    </Button>
                </>
            }
        </div>
    );
};

export default SearchField;
