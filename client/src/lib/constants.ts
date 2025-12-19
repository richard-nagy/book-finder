/** API key from the Google Cloud project */
export const googleBooksApiKey: string | undefined = import.meta.env
    .VITE_GOOGLE_BOOK_API_KEY;

/** This is the max number Google Books API allows by default. */
export const bookPerPage = 40;

/** Base url of the Google Books API */
export const googleBooksBaseUrl = "https://www.googleapis.com/books/v1/volumes";

/** Max number of retries if a fetch fails. */
export const maxRetries = 3;

/** Delay time in ms before retrying a failed fetch. */
export const retryDelayMs = 1000;

/** The first page number for pagination. */
export const firstPage = 1;
