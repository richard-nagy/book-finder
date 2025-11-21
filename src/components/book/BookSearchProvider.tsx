import type { BookDoc } from "@/utils/types";
import { useCallback, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { BookSearchContext } from "./BookSearchContext";

const YOUR_API_KEY = "";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export interface BookSearchContextType {
    books: BookDoc[];
    isLoading: boolean;
    fetchBooks: (searchQuery: string) => Promise<void>;
}

interface BookSearchProviderProps {
    children: ReactNode;
}

export const BookSearchProvider = ({ children }: BookSearchProviderProps) => {
    const [books, setBooks] = useState<BookDoc[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchBooks = useCallback(async (searchQuery: string) => {
        if (!searchQuery || searchQuery === "" || searchQuery.length <= 3) {
            setBooks([]);
            return;
        }

        setIsLoading(true);

        const url = new URL(BASE_URL);
        url.searchParams.append("q", searchQuery);
        url.searchParams.append("key", YOUR_API_KEY);

        try {
            const response = await fetch(url.toString());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            console.log(`Found ${data.totalItems} books.`);
            data.items.forEach((item: any, index: number) => {
                console.log(`${index + 1}. Title: ${item.volumeInfo.title}`);
                console.log(`   Authors: ${item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'N/A'}`);
            });
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

    // const fetchCover = useCallback(async (isbn: string): Promise<ArrayBuffer | null> => {
    //     try {
    //         const url = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
    //         const response = await fetch(url);

    //         if (!response.ok) {
    //             if (response.status === 404) {
    //                 return null;
    //             }

    //             throw new Error(`Failed to fetch cover. Status: ${response.status}`);
    //         }

    //         const buffer: ArrayBuffer = await response.arrayBuffer();
    //         return buffer;
    //     } catch (error) {
    //         let errorMessage = "An unknown error occurred.";

    //         if (error instanceof Error) {
    //             errorMessage = error.message;
    //         }

    //         console.error(error);
    //         toast.error("Cover fetching failed", {
    //             description: `Error details: ${errorMessage}`,
    //         });

    //         return null;
    //     }
    // }, []);

    // const getBookCover = useCallback(async (isbn: string | undefined) => {
    //     if (!isbn) {
    //         return null;
    //     }

    //     const coverUrl: string | undefined | null = coverMap.get(isbn);

    //     if (coverUrl !== undefined) {
    //         return coverUrl;
    //     }

    //     const cover = await fetchCover(isbn);
    //     const cover2 = cover
    //         ? bufferToBase64(cover)
    //         : null;

    //     setCoverMap((oldCoverMap) => {
    //         const newCoverMap = new Map([...oldCoverMap]);
    //         newCoverMap.set(isbn, cover2);
    //         return newCoverMap;
    //     });
    // }, [coverMap, fetchCover]);

    const value = {
        books,
        isLoading,
        fetchBooks,
    };

    return (
        <BookSearchContext.Provider value={value}>
            {children}
        </BookSearchContext.Provider>
    );
};
