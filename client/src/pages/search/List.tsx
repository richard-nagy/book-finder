import EmptyView from "@/components/EmptyView";
import { Spinner } from "@/components/ui/spinner";
import { useBook } from "@/context/BookContext";
import { firstPage } from "@/lib/constants";
import { SearchQuery } from "@/lib/types";
import BookCard from "@/pages/search/BookCard";
import { Frown } from "lucide-react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ListPagination from "./ListPagination";

const List = () => {
    const { booksByPage, maxNumberOfPages, bookFetchIsPending } = useBook();

    const [searchParams] = useSearchParams();

    const currentPageNumber = useMemo(
        () => parseInt(searchParams.get(SearchQuery.page) ?? firstPage.toString()),
        [searchParams],
    );

    const booksOfCurrentPage = useMemo(
        () => booksByPage?.get(currentPageNumber),
        [booksByPage, currentPageNumber],
    );

    return (
        <div className="flex flex-col gap-10">
            {bookFetchIsPending && (
                <EmptyView
                    title="Loading Books.."
                    description="Fetching data. Please wait."
                    icon={<Spinner />}
                />
            )}

            {!bookFetchIsPending &&
                (!booksOfCurrentPage || booksOfCurrentPage.length === 0) && (
                    <EmptyView
                        title="No Books Found"
                        description="Your search returned no results."
                        icon={<Frown />}
                    />
                )}

            {!bookFetchIsPending &&
                booksOfCurrentPage &&
                booksOfCurrentPage.length > 0 && (
                    <div className="flex flex-wrap gap-6 mt-15 justify-center">
                        {booksOfCurrentPage.map((b) => (
                            <BookCard key={b.id} book={b} />
                        ))}
                    </div>
                )}

            {maxNumberOfPages > 0 && <ListPagination />}
        </div>
    );
};

export default List;
