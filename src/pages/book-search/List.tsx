import { ModeToggle } from "@/components/mode-toggle";
import DebouncedInput from "@/pages/book-search/DebouncedInput";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { BookDoc, OpenLibraryResponse } from "./types";

const List = () => {
    const [books, setBooks] = useState<BookDoc[]>([]);

    const fetchBooks = useCallback(async (searchQuery: string) => {
        try {
            throw new Error("Test error");
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
        <div>
            <ModeToggle />
            <DebouncedInput onChange={fetchBooks} debounceMs={250} />
            <ul>
                {books.map((b) => (
                    <li key={b.key}>
                        {b.author_name} - {b.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;
