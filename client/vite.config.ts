import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        checker({
            typescript: true,
            eslint: {
                useFlatConfig: true,
                lintCommand:
                    'eslint "./src/**/*.{ts,tsx,js,jsx}" --max-warnings=0',
            },
            overlay: { initialIsOpen: true },
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        hmr: {
            overlay: true,
        },
    },
});
