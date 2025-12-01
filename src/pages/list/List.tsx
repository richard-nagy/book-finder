import EmptyView from "@/components/EmptyView";
import { Spinner } from "@/components/ui/spinner";
import { useBookSearch } from "@/context/BookSearchContext";
import Book from "@/pages/list/Book";
import ListPagination from "./ListPagination";

const List = () => {
    const { books, maxNumberOfPages, bookFetchIsLoading } = useBookSearch();

    return (
        <div className="flex flex-col gap-10">
            {bookFetchIsLoading ?
                <EmptyView
                    description="Please wait while we are searching for books."
                    title="Searching for Books..."
                    icon={<Spinner />}
                />
            :   <div className="flex flex-wrap gap-6 mt-15 justify-center">
                    {books && books.length <= 0 ?
                        <EmptyView
                            description="No books were found."
                            title="No results..."
                        />
                    :   books?.map((b) => <Book key={b.id} book={b} />)}
                </div>
            }
            {maxNumberOfPages > 0 && <ListPagination />}
        </div>
    );
};

export default List;
