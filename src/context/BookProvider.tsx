import type { BookResponse, Volume } from "@/lib/types";
import { attemptFetch, isStringEmpty } from "@/lib/utils";
import { useCallback, useState, useTransition, type ReactNode } from "react";
import { toast } from "sonner";
import { BookContext } from "./BookContext";
import { googleBooksApiKey } from "@/lib/constants";

/** This is the max number Google Books API allows by default. */
const maxResults = 40;
/** Base url of the Google Books API */
const baseUrl = "https://www.googleapis.com/books/v1/volumes";
/** Max number of retries if the fetch failed. */
const maxRetries = 3;
/** Delay time in ms if the fetch failed. */
const delayMs = 1000;

const fetchBooksCore = async (
    searchQuery: string,
    startIndex: number,
    apiKey: string,
): Promise<BookResponse> => {
    const url = `${baseUrl}?q=${encodeURIComponent(
        searchQuery,
    )}&key=${apiKey}&maxResults=${maxResults}&startIndex=${(startIndex - 1) * maxResults
        }`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `HTTP error! Status: ${response.status} ${response.statusText}`,
        );
    }

    const data: BookResponse = await response.json();
    return data;
};

const getBookByVolumeIdCore = async (
    volumeId: string,
    apiKey: string,
): Promise<Volume> => {
    const url = `${baseUrl}/${volumeId}?key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Volume = await response.json();
    return data;
};

export type BookContextType = {
    /**
     * List of books.
     * If null, there are no results.
     */
    booksByPage: Map<number, Volume[]> | null;
    /** */
    volumeMap: Map<string, Volume> | null;
    /**
     * Number of available pages.
     * If null, there are no results.
     */
    maxNumberOfPages: number;
    /** If true, the fetching of the books is active. */
    bookFetchIsPending: boolean;
    /** If true, the fetching of a volume is active. */
    volumeFetchIsPending: boolean;
    /** Returns the current search query */
    currentSearchQuery: string | null;
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
     * @param volumeId Id of the volume we want to fetch.
     */
    fetchVolume: (volumeId: string) => Promise<void>;
    /** Clears books results and number of pages. */
    clearResults: () => void;
};

type BookProviderProps = {
    children: ReactNode;
};

export const BookProvider = ({ children }: BookProviderProps) => {
    // TODO: There is a bug, where after starting search,
    // TODO: The pagination and the previous results stays visible for a second.
    const [currentSearchQuery, setCurrentSearchQuery] = useState<string | null>(
        null,
    );
    const [booksByPage, setBooksByPage] = useState<Map<
        number,
        Volume[]
    > | null>(null);
    const [maxNumberOfPages, setMaxNumberOfPages] = useState<number>(0);
    const [volumeMap, setVolumeMap] = useState<Map<string, Volume> | null>(
        null,
    );
    const [bookFetchIsPending, startBookFetch] = useTransition();
    const [volumeFetchIsPending, startVolumeFetch] = useTransition();

    const clearResults = useCallback(() => {
        setBooksByPage(null);
        setMaxNumberOfPages(0);
    }, []);

    const fetchBooks = useCallback(
        async (searchQuery: string | null, pageNumber = 0): Promise<void> => {
            startBookFetch(async () => {
                if (googleBooksApiKey === undefined) {
                    return;
                }

                const sameSearchQuery =
                    currentSearchQuery?.toLocaleLowerCase() ===
                    searchQuery?.toLocaleLowerCase();

                try {
                    if (!searchQuery || isStringEmpty(searchQuery)) {
                        return;
                    }

                    // If it's the same search query and we already got the books for the page, don't repeat the fetch.
                    if (sameSearchQuery && booksByPage?.has(pageNumber)) {
                        return;
                    }

                    const data = await attemptFetch(
                        () => fetchBooksCore(searchQuery, pageNumber, googleBooksApiKey ?? ""),
                        maxRetries,
                        delayMs,
                    );

                    if (data.totalItems > 0) {
                        const totalPages = data.totalItems;

                        setMaxNumberOfPages(Math.ceil(totalPages / maxResults));
                    }

                    if (data.items && (data.items?.length ?? 0) > 0) {
                        setBooksByPage((ob) => {
                            const newBooks = new Map(
                                // If we have the same search query, we keep the previous results,
                                // otherwise we clear it out.
                                sameSearchQuery ? [...(ob ?? [])] : [],
                            );
                            newBooks.set(pageNumber, data.items ?? []);
                            return newBooks;
                        });
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
                    if (!sameSearchQuery) {
                        setCurrentSearchQuery(searchQuery);
                        // On query change clear the saved volumes and book results
                        clearResults();
                        setVolumeMap(null);
                    }
                }
            });
        },
        [booksByPage, clearResults, currentSearchQuery],
    );

    const fetchVolume = useCallback(
        async (volumeId: string): Promise<void> => {
            if (googleBooksApiKey === undefined) {
                return;
            }

            startVolumeFetch(async () => {
                if (volumeMap?.has(volumeId)) {
                    return;
                }

                try {
                    const volume = await attemptFetch(
                        () => getBookByVolumeIdCore(volumeId, googleBooksApiKey ?? ""),
                        maxRetries,
                        delayMs,
                    );

                    if (volume) {
                        setVolumeMap((ovm) => {
                            const newVolumeMap = new Map([...(ovm ?? [])]);
                            newVolumeMap.set(volumeId, volume);
                            return newVolumeMap;
                        });
                    }
                } catch (error) {
                    console.error("Error fetching book data:", error);
                }
            });
        },
        [volumeMap],
    );

    const value = {
        booksByPage,
        maxNumberOfPages,
        bookFetchIsPending,
        volumeFetchIsPending,
        volumeMap,
        currentSearchQuery,
        fetchBooks,
        fetchVolume,
        clearResults,
    };

    return (
        <BookContext.Provider value={value}>{children}</BookContext.Provider>
    );
};
