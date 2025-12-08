import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Outlet } from "react-router-dom";
import EmptyView from "./components/EmptyView";
import TopBar from "./components/TopBar";
import { BookProvider } from "./context/BookProvider";
import { googleBooksApiKey } from "./lib/constants";
import { KeyRound } from "lucide-react";
import { Input } from "./components/ui/input";

const App = () => {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <BookProvider>
                <Toaster />
                <div className="flex w-full h-screen">
                    <main className="flex-1 overflow-y-auto flex flex-col">
                        <TopBar />
                        {!googleBooksApiKey ?
                            <EmptyView
                                title="No API key..."
                                description={`
                                    The Google Books API key is missing.
                                    Please put the API key to the root of the project to a .env file like this: VITE_GOOGLE_BOOK_API_KEY="your_key".
                                    Or enter it here:`}
                                icon={<KeyRound />}
                            >
                                <Input disabled placeholder="Google Books API key..." className="w-70" />
                            </EmptyView>
                            : <ScrollArea className="rounded-lg mx-3 mb-3 p-3 flex-1 overflow-y-auto bg-secondary relative">
                                <Outlet />
                            </ScrollArea>
                        }
                    </main>
                </div>
            </BookProvider>
        </ThemeProvider>
    );
};

export default App;
