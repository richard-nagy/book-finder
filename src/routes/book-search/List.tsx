import Book from "@/components/book";
import { useBookSearch } from "@/components/book/BookSearchContext";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import DebouncedInput from "@/routes/book-search/DebouncedInput";

const List = () => {
    const { books, isLoading, fetchBooks } = useBookSearch();

    return (
        <ScrollArea className="rounded-lg mx-3 mb-3 p-3 flex-1 overflow-y-auto bg-primary-foreground">
            <DebouncedInput
                debounceMs={250}
                placeholder="Start typing to search for books..."
                onChange={fetchBooks}
            />
            {isLoading && (
                <Empty className="w-full">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <Spinner />
                        </EmptyMedia>
                        <EmptyTitle>Searching for Books</EmptyTitle>
                        <EmptyDescription>
                            Please wait while we are searching for books.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            )}
            <div className="flex flex-wrap gap-3 mt-3 justify-center">
                {books.map((b) => (
                    <Book key={b.key} book={b} />
                ))}
            </div>
        </ScrollArea>
    );
};

export default List;
