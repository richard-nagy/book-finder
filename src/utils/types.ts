export interface Volume {
    id: string,
    volumeInfo: {
        title: string,
        subtitle: string,
        authors: [
            string
        ],
        publisher: string,
        publishedDate: string,
        description: string,
        pageCount: number,
        averageRating: number,
        ratingsCount: number,
        imageLinks: {
            smallThumbnail: string,
            thumbnail: string,
            small: string,
            medium: string,
            large: string,
            extraLarge: string
        },
        language: string,
    },
}

export interface BookResponse {
    kind: string;
    totalItems: number;
    items?: Volume[];
}

export const Theme = {
    system: "system",
    light: "light",
    dark: "dark",
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];
