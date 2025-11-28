/** Data of a book. */
export type Volume = {
    id: string;
    volumeInfo: {
        title?: string;
        subtitle?: string;
        authors?: [string];
        publisher?: string;
        publishedDate?: string;
        description?: string;
        pageCount?: number;
        averageRating?: number;
        ratingsCount?: number;
        imageLinks?: {
            smallThumbnail?: string;
            thumbnail?: string;
        };
        language?: string;
    };
};

/** Response of the search. */
export type BookResponse = {
    totalItems: number;
    items?: Volume[];
};

export const Theme = {
    system: "system",
    light: "light",
    dark: "dark",
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];

export const SearchQuery = {
    page: "page",
    q: "q",
} as const;

export type SearchQuery = (typeof SearchQuery)[keyof typeof SearchQuery];
