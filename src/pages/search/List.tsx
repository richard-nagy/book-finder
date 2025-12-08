import EmptyView from "@/components/EmptyView";
import { Spinner } from "@/components/ui/spinner";
import { useBook } from "@/context/BookContext";
import { SearchQuery } from "@/lib/types";
import Book from "@/pages/search/Book";
import { Frown } from "lucide-react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ListPagination from "./ListPagination";

const List = () => {
    const { booksByPage, maxNumberOfPages, bookFetchIsPending } = useBook();

    const [searchParams] = useSearchParams();

    const currentPageNumber = useMemo(
        () => parseInt(searchParams.get(SearchQuery.page) ?? "0"),
        [searchParams],
    );

    const booksOfCurrentPage = useMemo(
        () => booksByPage?.get(currentPageNumber),
        [booksByPage, currentPageNumber],
    );

    // TODO: If we open the search page, and there is no search query,
    // TODO: It returns us the no results view.
    return (
        <div className="flex flex-col gap-10">
            {bookFetchIsPending ?
                <EmptyView
                    title="Loading Books.."
                    description="Fetching data. Please wait."
                    icon={<Spinner className="h-9 w-9" />}
                />
            :   <div className="flex flex-wrap gap-6 mt-15 justify-center">
                    {(
                        (booksOfCurrentPage &&
                            booksOfCurrentPage.length <= 0) ||
                        !booksOfCurrentPage
                    ) ?
                        <EmptyView
                            icon={<Frown fontSize={36} />}
                            description="Your search returned no results."
                            title="No Books Found"
                        />
                    :   booksOfCurrentPage?.map((b) => (
                            <Book key={b.id} book={b} />
                        ))
                    }
                </div>
            }
            {maxNumberOfPages > 0 && <ListPagination />}
        </div>
    );
};

export default List;
