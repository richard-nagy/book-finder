import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import List from "./pages/book-search/List";

const App = () => {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Toaster />
            <List />
        </ThemeProvider>
    );
};

export default App;
