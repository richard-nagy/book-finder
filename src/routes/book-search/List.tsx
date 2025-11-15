import { ScrollArea } from "@/components/ui/scroll-area";
import DebouncedInput from "@/routes/book-search/DebouncedInput";
import type { BookDoc, OpenLibraryResponse } from "@/utils/types";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const List = () => {
    const [books, setBooks] = useState<BookDoc[]>([]);

    const fetchBooks = useCallback(async (searchQuery: string) => {
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
        }
    }, []);

    return (
        <ScrollArea className="rounded-lg mx-3 mb-3 p-3 flex-1 overflow-y-auto bg-primary-foreground">
            <DebouncedInput onChange={fetchBooks} debounceMs={250} />
            <ul>
                {books.map((b) => (
                    <li key={b.key}>
                        {b.author_name} - {b.title}
                    </li>
                ))}
            </ul>
        </ScrollArea>
    );
};

export default List;
