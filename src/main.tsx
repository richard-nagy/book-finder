import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { AppContextProvider } from "./context/ContextProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppContextProvider>
            <Toaster />
            <App />
        </AppContextProvider>
    </StrictMode>,
);
