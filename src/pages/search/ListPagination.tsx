import {
    Pagination,
    PaginationButton,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useBook } from "@/context/BookContext";
import { SearchQuery } from "@/lib/types";
import { useCallback, useMemo, type FC, type ReactElement } from "react";
import { useSearchParams } from "react-router-dom";

// Defines how many pages should appear directly around the current page
const pageWindow = 1;

const ListPagination: FC = (): ReactElement | null => {
    const { maxNumberOfPages } = useBook();
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPageNumber = useMemo(
        () => parseInt(searchParams.get(SearchQuery.page) ?? "1"),
        [searchParams],
    );

    const changePageNumber = useCallback(
        (number: number) => {
            const currentParams = Object.fromEntries(searchParams.entries());
            const newParams = {
                ...currentParams,
                page: number.toString(),
            };
            setSearchParams(newParams);
        },
        [searchParams, setSearchParams],
    );

    const paginationItem = useCallback(
        (number: number) => (
            <PaginationItem key={number}>
                <PaginationButton
                    onClick={() => changePageNumber(number)}
                    isActive={currentPageNumber === number}
                    disabled={number < 1 || number > maxNumberOfPages}
                >
                    {number}
                </PaginationButton>
            </PaginationItem>
        ),
        [changePageNumber, maxNumberOfPages, currentPageNumber],
    );

    const pageNationItemsToRender = useMemo(() => {
        const items: ReactElement[] = [];

        // Previous Button
        items.push(
            <PaginationPrevious
                key="previous"
                disabled={currentPageNumber <= 1}
                onClick={() => changePageNumber(currentPageNumber - 1)}
            />,
        );

        // Helper to add an ellipsis
        const addEllipsis = (key: string) => (
            <PaginationItem key={key}>
                <PaginationEllipsis />
            </PaginationItem>
        );

        // Add the first page
        items.push(paginationItem(1));

        // Add start ellipsis if current page is far from 1
        if (currentPageNumber > 2 + pageWindow) {
            items.push(addEllipsis("ellipsis-start"));
        }

        // Add pages around the current page
        const startPage = Math.max(2, currentPageNumber - pageWindow);
        const endPage = Math.min(
            maxNumberOfPages,
            currentPageNumber + pageWindow,
        );

        for (let i = startPage; i <= endPage; i++) {
            items.push(paginationItem(i));
        }

        // Add ellipsis if current page is far from the last page
        if (currentPageNumber < maxNumberOfPages - 1 - pageWindow) {
            items.push(addEllipsis("ellipsis-end"));
        }

        // Next Button
        items.push(
            <PaginationNext
                key="next"
                disabled={currentPageNumber >= maxNumberOfPages}
                onClick={() => changePageNumber(currentPageNumber + 1)}
            />,
        );

        return items;
    }, [changePageNumber, maxNumberOfPages, currentPageNumber, paginationItem]);

    // Max number of pages must be 2 or more to show pagination items
    if (maxNumberOfPages <= 1) {
        return null;
    }

    return (
        <Pagination className="my-3">
            <PaginationContent>{pageNationItemsToRender}</PaginationContent>
        </Pagination>
    );
};

export default ListPagination;
