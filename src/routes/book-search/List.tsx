import Book from "@/components/book/book";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import DebouncedInput from "@/routes/book-search/DebouncedInput";
import type { BookDoc, OpenLibraryResponse } from "@/utils/types";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const List = () => {
    const [books, setBooks] = useState<BookDoc[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchBooks = useCallback(async (searchQuery: string) => {
        if (!searchQuery || searchQuery === "") {
            setBooks([]);
            return;
        }

        setIsLoading(true);

        try {
            const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}`;
            const response = await fetch(url);
            const data: OpenLibraryResponse = await response.json();
            setBooks(data.docs);
        } catch (error) {
            let errorMessage = "An unknown error occurred.";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            console.error(error);
            toast.error("Search Failed", {
                description: `Error details: ${errorMessage}`,
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <ScrollArea className="rounded-lg mx-3 mb-3 p-3 flex-1 overflow-y-auto bg-primary-foreground">
            <DebouncedInput
                debounceMs={250}
                placeholder="Start typing to search for books..."
                onChange={fetchBooks}
            />
            {isLoading && (
                <Empty className="w-full">
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
            )}
            <div className="flex flex-wrap gap-3 mt-3 justify-center">
                {books.map((b) => (
                    <Book key={b.key} book={b} />
                ))}
            </div>
        </ScrollArea>
    );
};

export default List;
