import { Button } from "@/components/ui/button";
import { useBook } from "@/context/BookContext";
import { Page } from "@/lib/types";
import { HomeIcon } from "lucide-react";
import type { FC } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const CustomErrorBoundary: FC = () => {
    const { clearResults } = useBook();
    const navigate = useNavigate();
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
            <Button asChild onClick={() => navigate(Page.homepage)}>
                <HomeIcon /> Go Home
            </Button>
        </div>
    );
};

export default CustomErrorBoundary;
