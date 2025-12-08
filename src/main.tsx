import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import { Page } from "./lib/types";
import Book from "./pages/book/Book";
import ApiKeyGuard from "./pages/error/ApiKeyGuard";
import CustomErrorBoundary from "./pages/error/CustomErrorBoundary";
import NoApiKey from "./pages/error/NoApiKey";
import PageNotFound from "./pages/error/PageNotFound";
import Homepage from "./pages/homepage/Homepage";
import List from "./pages/search/List";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <CustomErrorBoundary />,
        children: [
            {
                path: "/",
                element: <Navigate to={Page.homepage} />,
            },
            {
                path: Page.noApiKey,
                element: <NoApiKey />,
            },
            {
                element: <ApiKeyGuard />,
                children: [
                    {
                        path: Page.search,
                        element: <List />,
                    },
                    {
                        path: `${Page.book}/:id`,
                        element: <Book />,
                    },
                    {
                        path: Page.homepage,
                        element: <Homepage />,
                    },
                ],
            },
            {
                path: "*",
                element: <PageNotFound />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
