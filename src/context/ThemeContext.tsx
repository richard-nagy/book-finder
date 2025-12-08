import type { SeverityLevel } from "@/lib/types";
import { createContext, useContext } from "react";
import type { ThemeProviderState } from "./ThemeProvider";

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
};

export const ThemeProviderContext =
    createContext<ThemeProviderState>(initialState);

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    const { theme } = context;

    let resolvedTheme: SeverityLevel;

    if (theme === "system") {
        resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    } else {
        resolvedTheme = theme;
    }

    return {
        ...context,
        resolvedTheme,
    };
};
