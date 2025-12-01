import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import List from "./pages/list/List";
import Book from "./pages/book/Book";
import CustomErrorBoundary from "./pages/error/CustomErrorBoundary";
import PageNotFound from "./pages/error/PageNotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <CustomErrorBoundary />,
        children: [
            {
                path: "/",
                element: <Navigate to="search" />,
            },
            {
                path: "search",
                element: <List />,
            },
            {
                path: "book/:id",
                element: <Book />,
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
