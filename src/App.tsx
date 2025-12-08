import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";
import { BookProvider } from "./context/BookProvider";

const App = () => {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <BookProvider>
                <Toaster />
                <div className="flex w-full h-screen bg-secondary">
                    <main className="flex-1 overflow-y-auto flex flex-col">
                        <TopBar />
                        <ScrollArea className="rounded-lg mx-3 mb-3 p-3 flex-1 overflow-y-auto bg-background relative">
                            <Outlet />
                        </ScrollArea>
                    </main>
                </div>
            </BookProvider>
        </ThemeProvider>
    );
};

export default App;