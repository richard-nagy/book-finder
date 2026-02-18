import EmptyView from "@/components/EmptyView";
import { Spinner } from "@/components/ui/spinner";
import { useBook } from "@/context/BookContext";
import { firstPage } from "@/lib/constants";
import { SearchQuery } from "@/lib/types";
import BookCard from "@/pages/search/BookCard";
import { getVisitCountBatch } from "@/services/VisitsApi";
import { Frown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import ListPagination from "./ListPagination";

const List = () => {
    const { booksByPage, maxNumberOfPages, bookFetchIsPending } = useBook();

    const [searchParams] = useSearchParams();

    const [visitCounterMapById, setVisitCounterMapById] = useState<
        Map<string, number>
    >(new Map());

    const currentPageNumber = useMemo(
        () =>
            parseInt(
                searchParams.get(SearchQuery.page) ?? firstPage.toString(),
            ),
        [searchParams],
    );

    const booksOfCurrentPage = useMemo(
        () => booksByPage?.get(currentPageNumber),
        [booksByPage, currentPageNumber],
    );

    useEffect(() => {
        if (!import.meta.env.DEV) return;

        const fetchIncrementVisit = async () => {
            if (!booksOfCurrentPage) return;

            try {
                const newVisitCounts = await getVisitCountBatch(
                    booksOfCurrentPage.map((book) => book.id),
                );

                setVisitCounterMapById(
                    new Map(newVisitCounts.map((e) => [e.id, e.count])),
                );
            } catch (error) {
                console.error("Failed to fetch visit counts:", error);
                toast.error("Failed to load view counts", {
                    description: "Could not retrieve book view statistics.",
                });
            }
        };

        void fetchIncrementVisit();
    }, [booksOfCurrentPage]);

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
                            <BookCard
                                key={b.id}
                                book={b}
                                visitCount={visitCounterMapById.get(b.id) ?? 0}
                            />
                        ))}
                    </div>
                )}

            {maxNumberOfPages > 0 && <ListPagination />}
        </div>
    );
};

export default List;
