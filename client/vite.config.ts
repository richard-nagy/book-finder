import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    base: "/book-finder/",
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
        viteStaticCopy({
            targets: [
                {
                    src: "index.html",
                    dest: "",
                    rename: "404.html",
                },
            ],
            hook: "writeBundle",
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
