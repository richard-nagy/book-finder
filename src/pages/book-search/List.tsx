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
import { useCallback, useState, type KeyboardEvent } from "react";

const List = () => {
    const { books, bookFetchIsLoading, fetchBooks } = useBookSearch();

    const [searchQuery, setSearchQuery] = useState<string>("");

    const fetchBooksWithQuery = useCallback(() => {
        fetchBooks(searchQuery);
    }, [fetchBooks, searchQuery]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                fetchBooks(searchQuery);
            }
        },
        [fetchBooks, searchQuery],
    );

    return (
        <>
            <div className="left flex flex-row gap-2 justify-center align-middle absolute bg-primary-foreground pb-3 z-1 w-[calc(100%-24px)]">
                <DebouncedInput
                    className="w-75"
                    // debounceMs={250}
                    // placeholder="Start typing to search for books..."
                    onChange={setSearchQuery}
                    handleKeyDown={handleKeyDown}
                />
                <Button onClick={fetchBooksWithQuery}>
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
            :   <div className="flex flex-wrap gap-3 mt-15 justify-center">
                    {books?.map((b) => (
                        <Book key={b.id} book={b} />
                    ))}
                </div>
            }
        </>
    );
};

export default List;
