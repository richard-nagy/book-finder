import { useBook } from "@/context/BookContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { firstPage, googleBooksApiKey } from "@/lib/constants";
import { Page, SearchQuery } from "@/lib/types";
import { isStringEmpty } from "@/lib/utils";
import { ArrowLeft, Search } from "lucide-react";
import {
    type FC,
    type KeyboardEvent,
    type ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SearchFieldDialog from "./SearchFieldDialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
    const location = useLocation();

    // Store fetchBooks in a ref to prevent unnecessary effect re-runs
    const fetchBooksRef = useRef(fetchBooks);

    useEffect(() => {
        fetchBooksRef.current = fetchBooks;
    }, [fetchBooks]);

    const isSearchPage = useMemo(
        () => location.pathname.includes(`/${Page.search}`),
        [location.pathname],
    );

    const searchQuery = useMemo(
        () =>
            isSearchPage ?
                (searchParams.get(SearchQuery.q) ?? currentSearchQuery ?? "")
                : "",
        [currentSearchQuery, isSearchPage, searchParams],
    );

    const [inputValue, setInputValue] = useState<string>(searchQuery);

    const canGoBack = (history.state?.idx ?? 0) > 0;

    const currentPageNumber = useMemo(
        () =>
            parseInt(
                searchParams.get(SearchQuery.page) ?? firstPage.toString(),
            ),
        [searchParams],
    );

    const isInputEmpty = useMemo(() => isStringEmpty(inputValue), [inputValue]);

    const onSearchClick = useCallback(() => {
        navigate(`/search?q=${inputValue ?? ""}&page=${firstPage}`, {
            relative: "path",
        });
    }, [inputValue, navigate]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" && inputValue && !isInputEmpty) {
                onSearchClick();
            }
        },
        [inputValue, isInputEmpty, onSearchClick],
    );

    useEffect(() => {
        setInputValue(searchQuery);
    }, [searchQuery]);

    // If we are on the search page,
    useEffect(() => {
        if (isSearchPage) {
            void fetchBooksRef.current(searchQuery, currentPageNumber);
        }
    }, [currentPageNumber, isSearchPage, searchQuery]);

    const backButton =
        showBackButton ?
            <Button
                size="icon"
                disabled={!canGoBack}
                onClick={() => navigate(-1)}
            >
                <ArrowLeft />
            </Button>
            : null;

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
                    onSearchClick={onSearchClick}
                    setInputValue={setInputValue}
                />
                : <>
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
                        onClick={onSearchClick}
                    >
                        <Search />
                    </Button>
                </>
            }
        </div>
    );
};

export default SearchField;
