import { AppSidebar } from "@/components/app-sidebar";
import { SettingsDropDown } from "@/components/settings-dropdown";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import List from "./routes/book-search/List";

const App = () => {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Toaster />
            <SidebarProvider>
                <div className="flex h-screen w-full">
                    <AppSidebar />
                    <main className="flex-1 overflow-y-auto p-3">
                        <div className="flex justify-between w-full mb-3">
                            <SidebarTrigger />
                            <div className="flex gap-3">
                                <ThemeToggle />
                                <SettingsDropDown />
                            </div>
                        </div>
                        <List />
                    </main>
                </div>
            </SidebarProvider>
        </ThemeProvider>
    );
};

export default App;
