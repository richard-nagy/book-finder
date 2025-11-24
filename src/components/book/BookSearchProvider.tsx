import type { BookResponse, Volume } from "@/utils/types";
import { useCallback, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { BookSearchContext } from "./BookSearchContext";

const apiKey = import.meta.env.VITE_GOOGLE_BOOK_API_KEY;
const baseUrl = "https://www.googleapis.com/books/v1/volumes";

export interface BookSearchContextType {
    books: Volume[] | null;
    bookFetchIsLoading: boolean;
    volumeFetchIsLoading: boolean;
    fetchBooks: (searchQuery: string) => Promise<void>;
    getBookByVolumeId: (volumeId: string) => Promise<Volume | null>;
}

interface BookSearchProviderProps {
    children: ReactNode;
}

export const BookSearchProvider = ({ children }: BookSearchProviderProps) => {
    const [books, setBooks] = useState<Volume[] | null>(null);
    const [bookFetchIsLoading, setBookFetchIsLoading] = useState(false);
    const [volumeFetchIsLoading, setVolumeFetchIsLoading] = useState(false);

    const fetchBooks = useCallback(async (searchQuery: string): Promise<void> => {
        if (!searchQuery || searchQuery === "" || searchQuery.length <= 3) {
            setBooks(null);
            return;
        }

        setBookFetchIsLoading(true);

        const url = `${baseUrl}?q=${encodeURIComponent(searchQuery)}&key=${apiKey}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
            }

            const data: BookResponse = await response.json();

            if (data.items && (data.items?.length ?? 0) > 0) {
                setBooks(data.items);
            }
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
            setBookFetchIsLoading(false);
        }
    }, []);

    const getBookByVolumeId = useCallback(async (volumeId: string): Promise<Volume | null> => {
        setVolumeFetchIsLoading(true);
        let result: Volume | null = null;
        const url = `${baseUrl}/${volumeId}?key=${apiKey}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            result = data;
        } catch (error) {
            console.error("Error fetching book data:", error);
        } finally {
            setVolumeFetchIsLoading(false);
        }

        return result;
    }, [])

    const value = {
        books,
        bookFetchIsLoading,
        volumeFetchIsLoading,
        fetchBooks,
        getBookByVolumeId,
    };

    return (
        <BookSearchContext.Provider value={value}>
            {children}
        </BookSearchContext.Provider>
    );
};
