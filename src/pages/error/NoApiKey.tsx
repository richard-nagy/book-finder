import EmptyView from "@/components/EmptyView";
import { Input } from "@/components/ui/input";
import { googleBooksApiKey } from "@/lib/constants";
import { Page } from "@/lib/types";
import { KeyRound } from "lucide-react";
import type { FC } from "react";
import { Navigate } from "react-router-dom";

const NoApiKey: FC = () => {
    if (googleBooksApiKey) {
        return <Navigate to={Page.homepage} replace relative="route" />;
    }

    return (
        <EmptyView
            title="No API key..."
            description={`
            The Google Books API key is missing.
            Please put the API key to the root of the project to a .env file like this: VITE_GOOGLE_BOOK_API_KEY="your_key".
            Or enter it here:`}
            icon={<KeyRound />}
        >
            <Input
                disabled
                placeholder="Google Books API key..."
                className="w-70"
            />
        </EmptyView>
    );
};

export default NoApiKey;
