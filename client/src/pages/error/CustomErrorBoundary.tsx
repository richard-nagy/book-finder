import { Button } from "@/components/ui/button";
import { Page } from "@/lib/types";
import { HomeIcon } from "lucide-react";
import type { FC } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { Typography } from "@/components/ui/typography.tsx";

const CustomErrorBoundary: FC = () => {
    const navigate = useNavigate();
    const error = useRouteError();
    const isError = error instanceof Error;

    return (
        <div className="flex flex-col gap-2 items-center justify-center min-h-screen p-6">
            <Typography variant="h2">Oops! Something went wrong.</Typography>
            <Typography variant="p">
                We encountered an unexpected error while loading this page.
            </Typography>
            {isError && (
                <div className="text-sm overflow-auto">
                    <Typography
                        variant="h4"
                        className="font-mono font-semibold mb-2"
                    >
                        Error Details:
                    </Typography>
                    <Typography variant="muted">{error.message}</Typography>
                </div>
            )}
            <Button className="mt-4" onClick={() => navigate(Page.homepage)}>
                <HomeIcon /> Go Home
            </Button>
        </div>
    );
};

export default CustomErrorBoundary;
