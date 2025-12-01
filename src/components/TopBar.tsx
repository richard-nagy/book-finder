import { useBookSearch } from "@/context/BookSearchContext";
import DebouncedInput from "@/pages/list/DebouncedInput";
import { isStringEmpty } from "@/utils/common";
import { SearchQuery } from "@/utils/types";
import { ArrowLeft, ArrowRight, HomeIcon, Search } from "lucide-react";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type FC,
    type KeyboardEvent,
    type ReactElement,
} from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SettingsDropDown } from "./SettingsDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

const TopBar: FC = (): ReactElement => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { fetchBooks } = useBookSearch();

    const searchQuery = searchParams.get(SearchQuery.q) ?? undefined;

    const currentPageNumber = useMemo(
        () => parseInt(searchParams.get(SearchQuery.page) ?? "1"),
        [searchParams],
    );

    const [inputValue, setInputValue] = useState<string | undefined>(
        searchQuery,
    );

    const isInputEmpty = useMemo(() => isStringEmpty(inputValue), [inputValue]);

    useEffect(() => {
        setInputValue(searchQuery);
    }, [searchQuery]);

    const navigateToSearchQuery = useCallback(() => {
        setSearchParams({
            [SearchQuery.q]: inputValue ?? "",
            [SearchQuery.page]: "1",
        });
    }, [inputValue, setSearchParams]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" && inputValue && !isInputEmpty) {
                navigateToSearchQuery();
            }
        },
        [inputValue, isInputEmpty, navigateToSearchQuery],
    );

    useEffect(() => {
        fetchBooks(searchQuery ?? null, currentPageNumber);
    }, [currentPageNumber, fetchBooks, searchQuery]);

    return (
        <div className="flex justify-between w-full sticky top-0 p-3">
            <div className="flex gap-2">
                <Button size="icon" disabled>
                    <ArrowLeft />
                </Button>
                <Button size="icon" disabled>
                    <ArrowRight />
                </Button>
            </div>
            <div className="flex flex-row gap-2 justify-center align-middle">
                <Button asChild size="icon">
                    <Link to="/">
                        <HomeIcon />
                    </Link>
                </Button>
                <DebouncedInput
                    className="w-75"
                    autoFocus={true}
                    defaultValue={inputValue}
                    onChange={setInputValue}
                    handleKeyDown={handleKeyDown}
                />
                <Button disabled={isInputEmpty} onClick={navigateToSearchQuery}>
                    <Search /> Search
                </Button>
            </div>
            <div className="flex gap-2">
                <ThemeToggle />
                <SettingsDropDown />
            </div>
        </div>
    );
};

export default TopBar;
