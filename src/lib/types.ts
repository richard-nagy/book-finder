/** Data of a book. */
export type Volume = {
    /** The unique identifier for the book volume. */
    id: string;
    /** Container for detailed metadata about the book volume. */
    volumeInfo: {
        /** The main title of the book. */
        title?: string;
        /** The secondary title or subtitle of the book. */
        subtitle?: string;
        /** An array of authors who wrote the book. */
        authors?: [string];
        /** The publisher of the book. */
        publisher?: string;
        /** The date the book was published (often in YYYY-MM-DD format). */
        publishedDate?: string;
        /** A summary or description of the book content. */
        description?: string;
        /** The total number of pages in the book. */
        pageCount?: number;
        /** The average rating given to the book. */
        averageRating?: number;
        /** The total number of ratings the book has received. */
        ratingsCount?: number;
        /** Container for links to various image sizes of the book cover. */
        imageLinks?: {
            /** URL for the small thumbnail image of the cover. */
            smallThumbnail?: string;
            /** URL for the regular thumbnail image of the cover. */
            thumbnail?: string;
        };
        /** The language of the book (e.g., "en"). */
        language?: string;
    };
};

/** Response of the search. */
export type BookResponse = {
    /** The total number of items found for the search query. */
    totalItems: number;
    /** An optional array of book volume data matching the search query. */
    items?: Volume[];
};

/** Theme options */
export const Theme = {
    /** Uses the user's operating system preference for light or dark mode. */
    system: "system",
    /** Forces a light color scheme. */
    light: "light",
    /** Forces a dark color scheme. */
    dark: "dark",
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];

/** Query options on the search page. */
export const SearchQuery = {
    /** Key for specifying the current page number in the search query parameters. */
    page: "page",
    /** Key for specifying the search term or query string in the search query parameters. */
    q: "q",
} as const;

export type SearchQuery = (typeof SearchQuery)[keyof typeof SearchQuery];

/** Page options. */
export const Page = {
    /** Book search results page. */
    search: "search",
    /** Individual book detail page. */
    book: "book",
    /** Starting or home page. */
    homepage: "homepage",
    /** No API key page. */
    noApiKey: "noapikey",
} as const;

export type Page = (typeof Page)[keyof typeof Page];

/** Sizes of the logo. */
export const LogoSize = {
    /** The smallest logo size option. */
    small: "small",
    /** The medium logo size option. */
    medium: "medium",
    /** The largest logo size option. */
    large: "large",
} as const;

export type LogoSize = (typeof LogoSize)[keyof typeof LogoSize];
