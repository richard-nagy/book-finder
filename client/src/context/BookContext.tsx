import { createContext, useContext } from "react";
import type { BookContextType } from "./BookProvider";

export const BookContext = createContext<BookContextType | undefined>(
    undefined,
);

export const useBook = () => {
    const context = useContext(BookContext);

    if (!context) {
        throw new Error("useBook must be used within a BookProvider");
    }
    return context;
};
