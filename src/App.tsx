import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";
import { BookSearchProvider } from "./context/BookSearchProvider";

const App = () => {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <BookSearchProvider>
                <Toaster />
                <SidebarProvider>
                    <div className="flex w-full h-screen">
                        <main className="flex-1 overflow-y-auto flex flex-col">
                            <TopBar />
                            <ScrollArea className="rounded-lg mx-3 mb-3 p-3 flex-1 overflow-y-auto bg-primary-foreground relative">
                                <Outlet />
                            </ScrollArea>
                        </main>
                    </div>
                </SidebarProvider>
            </BookSearchProvider>
        </ThemeProvider>
    );
};

export default App;
