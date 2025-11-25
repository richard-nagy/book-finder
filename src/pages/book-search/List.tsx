import Book from "@/components/Book";
import { useBookSearch } from "@/components/book/BookSearchContext";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import DebouncedInput from "@/pages/book-search/DebouncedInput";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import { useSearchParams } from "react-router-dom";

const List = () => {
    const { books, bookFetchIsLoading, fetchBooks } = useBookSearch();

    const [searchParams, setSearchParams] = useSearchParams();

    const searchQuery = searchParams.get("q") ?? undefined;

    const [inputValue, setInputValue] = useState<string | undefined>(
        searchQuery,
    );

    useEffect(() => {
        setInputValue(searchQuery);
    }, [searchQuery]);

    const navigateToSearchQuery = useCallback(() => {
        setSearchParams({ q: inputValue ?? "" });
    }, [inputValue, setSearchParams]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" && searchQuery) {
                navigateToSearchQuery();
            }
        },
        [navigateToSearchQuery, searchQuery],
    );

    useEffect(() => {
        fetchBooks(searchQuery ?? null);
    }, [fetchBooks, searchQuery]);

    return (
        <>
            <div className="left flex flex-row gap-2 justify-center align-middle absolute bg-primary-foreground pb-3 z-1 w-[calc(100%-24px)]">
                <DebouncedInput
                    className="w-75"
                    // debounceMs={250}
                    // placeholder="Start typing to search for books..."
                    autoFocus={true}
                    defaultValue={inputValue}
                    onChange={setInputValue}
                    handleKeyDown={handleKeyDown}
                />
                <Button onClick={navigateToSearchQuery}>
                    <Search /> Search
                </Button>
            </div>
            {bookFetchIsLoading ?
                <Empty className="w-full mt-10">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <Spinner />
                        </EmptyMedia>
                        <EmptyTitle>Searching for Books</EmptyTitle>
                        <EmptyDescription>
                            Please wait while we are searching for books.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            :   <div className="flex flex-wrap gap-6 mt-15 justify-center">
                    {books?.map((b) => (
                        <Book key={b.id} book={b} />
                    ))}
                </div>
            }
        </>
    );
};

export default List;
