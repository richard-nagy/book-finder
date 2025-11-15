export type BookDoc = {
    title: string;
    author_name: string[];
    key: string;
};

export type OpenLibraryResponse = {
    docs: BookDoc[];
};