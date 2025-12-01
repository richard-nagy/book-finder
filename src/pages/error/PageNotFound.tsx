import { useBookSearch } from "@/context/BookSearchContext";
import { HomeIcon } from "lucide-react";
import { type FC, type ReactElement } from "react";
import { Link } from "react-router-dom";

const PageNotFound: FC = (): ReactElement => {
    const { clearResults } = useBookSearch();

    clearResults();

    return (
        <div className="text-center p-12">
            <h2 className="text-6xl font-bold mb-4">404</h2>
            <p className="text-2xl mb-6">Page Not Found</p>
            <Link to="/" className="underline">
                <HomeIcon /> Go Home
            </Link>
        </div>
    );
};

export default PageNotFound;
