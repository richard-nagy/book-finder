import { useBookSearch } from "@/context/BookSearchContext";
import { useIsMobile } from "@/hooks/use-mobile";
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
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchFieldDialog from "./SearchFieldDialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const firstPageNumber = "1";

type SearchInputProps = {
    showBackButton?: boolean;
    isDialogViewAllowed?: boolean;
};
const SearchField: FC<SearchInputProps> = ({
    showBackButton,
    isDialogViewAllowed,
}) => {
    const isMobile = useIsMobile();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { currentSearchQuery, fetchBooks } = useBookSearch();

    const searchQuery =
        searchParams.get(SearchQuery.q) ?? currentSearchQuery ?? "";

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
        if (location.pathname === `/${Page.search}`) {
            navigate(Page.homepage);
        } else if (location.pathname.includes(`/${Page.book}`)) {
            if (!isStringEmpty(searchQuery)) {
                navigate(-1);
            } else {
                navigate(Page.homepage);
            }
        }
    }, [navigate, searchQuery]);

    useEffect(() => {
        setInputValue(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        if (
            location.pathname === `/${Page.homepage}` ||
            location.pathname === `/${Page.search}`
        ) {
            fetchBooks(searchQuery, currentPageNumber);
        }
    }, [currentPageNumber, fetchBooks, searchQuery]);

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

    return (
        <div className="flex flex-row gap-2 justify-center align-middle">
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
