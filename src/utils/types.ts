export type BookDoc = {
    title: string;
    author_name: string[];
    key: string;
};

export type OpenLibraryResponse = {
    docs: BookDoc[];
};

export const Theme = {
    system: "system",
    light: "light",
    dark: "dark",
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];
