import { useBookSearch } from "@/components/book/BookSearchContext";
import { Button } from "@/components/ui/button";
import type { FC } from "react";
import { Link, useRouteError } from "react-router-dom";

const CustomErrorBoundary: FC = () => {
    const { clearResults } = useBookSearch();
    const error = useRouteError();
    const isError = error instanceof Error;

    console.error("Route Error Caught:", error);
    clearResults();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1 className="text-3xl font-bold pb-6">
                Oops! Something went wrong.
            </h1>
            <p className="text-lg">
                We encountered an unexpected error while loading this page.
            </p>
            {isError && (
                <div className="text-sm overflow-auto">
                    <h2 className="font-mono font-semibold mb-2">
                        Error Details:
                    </h2>
                    <p className="whitespace-pre-wrap">{error.message}</p>
                </div>
            )}
            <Button asChild className="mt-6">
                <Link to="/">Go to Home Page</Link>
            </Button>
        </div>
    );
};

export default CustomErrorBoundary;
