import { createContext, useContext } from "react";
import type { BookSearchContextType } from "./BookSearchProvider";

export const BookSearchContext = createContext<
    BookSearchContextType | undefined
>(undefined);

export const useBookSearch = () => {
    const context = useContext(BookSearchContext);

    if (!context) {
        throw new Error(
            "useBookSearch must be used within a BookSearchProvider",
        );
    }
    return context;
};
