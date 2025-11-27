import { SettingsDropDown } from "@/components/SettingsDropdown";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Outlet } from "react-router-dom";
import { BookSearchProvider } from "./context/BookSearchProvider";
import HomeButton from "./components/HomeButton";
import { Button } from "./components/ui/button";

const App = () => {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <BookSearchProvider>
                <Toaster />
                <SidebarProvider>
                    <div className="flex w-full h-screen">
                        {/* <AppSidebar /> */}
                        <main className="flex-1 overflow-y-auto flex flex-col">
                            <div className="flex justify-between w-full sticky top-0 p-3">
                                {/* <SidebarTrigger /> */}
                                <Button asChild>
                                    <HomeButton />
                                </Button>
                                <div className="flex gap-3">
                                    <ThemeToggle />
                                    <SettingsDropDown />
                                </div>
                            </div>
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
