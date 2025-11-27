import { isStringEmpty } from "@/utils/common";
import type { BookResponse, Volume } from "@/utils/types";
import { useCallback, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { BookSearchContext } from "./BookSearchContext";

/** This is the max number Google Books API allows by default. */
const maxResults = 40;
/** API key from the Google Cloud project */
const apiKey = import.meta.env.VITE_GOOGLE_BOOK_API_KEY;
/** Base url of the Google Books API */
const baseUrl = "https://www.googleapis.com/books/v1/volumes";

export interface BookSearchContextType {
    /**
     * List of books.
     * If null, there are no results.
     */
    books: Volume[] | null;
    /**
     * Number of available pages.
     * If null, there are no results.
     */
    maxNumberOfPages: number;
    /** If true, the fetching of the books is active. */
    bookFetchIsLoading: boolean;
    /** If true, the fetching of a volume is active. */
    volumeFetchIsLoading: boolean;
    /**
     * Fetches the books.
     * @param searchQuery The query filtering is based upon.
     * @param startIndex Starting index from where the books will be returned from the original list.
     */
    fetchBooks: (
        searchQuery: string | null,
        startIndex?: number,
    ) => Promise<void>;
    /**
     * Fetches a specific book.
     * @param volumeId
     * @returns Returns the the data of the book. Returns null if there were no result.
     */
    getBookByVolumeId: (volumeId: string) => Promise<Volume | null>;
    /** Clears books results and number of pages. */
    clearResults: () => void;
}

interface BookSearchProviderProps {
    children: ReactNode;
}

export const BookSearchProvider = ({ children }: BookSearchProviderProps) => {
    const [books, setBooks] = useState<Volume[] | null>(null);
    const [maxNumberOfPages, setMaxNumberOfPages] = useState<number>(0);
    const [bookFetchIsLoading, setBookFetchIsLoading] =
        useState<boolean>(false);
    const [volumeFetchIsLoading, setVolumeFetchIsLoading] =
        useState<boolean>(false);

    const clearResults = useCallback(() => {
        setBooks(null);
        setMaxNumberOfPages(0);
    }, []);

    const fetchBooks = useCallback(
        async (searchQuery: string | null, startIndex = 0): Promise<void> => {
            try {
                if (!apiKey) {
                    throw new Error("Missing API Key");
                }

                if (!searchQuery || isStringEmpty(searchQuery)) {
                    clearResults();
                    return;
                }

                setBookFetchIsLoading(true);

                const url = `${baseUrl}?q=${encodeURIComponent(searchQuery)}&key=${apiKey}&maxResults=${maxResults}&startIndex=${(startIndex - 1) * maxResults}`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(
                        `HTTP error! Status: ${response.status} ${response.statusText}`,
                    );
                }

                const data: BookResponse = await response.json();

                if (data.totalItems > 0) {
                    setMaxNumberOfPages(
                        Math.floor(data.totalItems / maxResults),
                    );
                }

                if (data.items && (data.items?.length ?? 0) > 0) {
                    setBooks(data.items);
                }
            } catch (error) {
                let errorMessage = "An unknown error occurred.";

                if (error instanceof Error) {
                    errorMessage = error.message;
                }

                clearResults();
                console.error(error);
                toast.error("Search Failed", {
                    description: `Error details: ${errorMessage}`,
                });
            } finally {
                setBookFetchIsLoading(false);
            }
        },
        [clearResults],
    );

    const getBookByVolumeId = useCallback(
        async (volumeId: string): Promise<Volume | null> => {
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
        },
        [],
    );

    const value = {
        books,
        maxNumberOfPages,
        bookFetchIsLoading,
        volumeFetchIsLoading,
        fetchBooks,
        getBookByVolumeId,
        clearResults,
    };

    return (
        <BookSearchContext.Provider value={value}>
            {children}
        </BookSearchContext.Provider>
    );
};
