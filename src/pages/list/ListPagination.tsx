import {
    Pagination,
    PaginationButton,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useBookSearch } from "@/context/BookSearchContext";
import { SearchQuery } from "@/lib/types";
import { useCallback, useMemo, type FC, type ReactElement } from "react";
import { useSearchParams } from "react-router-dom";

const ListPagination: FC = (): ReactElement => {
    const { maxNumberOfPages } = useBookSearch();

    const [searchParams, setSearchParams] = useSearchParams();

    const currentPageNumber = useMemo(
        () => parseInt(searchParams.get(SearchQuery.page) ?? "0"),
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
        (number: number) =>
            number <= 0 || number > maxNumberOfPages ?
                null
            :   <PaginationItem key={number}>
                    <PaginationButton
                        onClick={() => changePageNumber(number)}
                        isActive={currentPageNumber === number}
                    >
                        {number}
                    </PaginationButton>
                </PaginationItem>,
        [changePageNumber, maxNumberOfPages, currentPageNumber],
    );

    const paginationEllipsis = useMemo(
        () => (
            <PaginationItem>
                <PaginationEllipsis />
            </PaginationItem>
        ),
        [],
    );

    const pageNationItemsToRender = useMemo(() => {
        return [
            <PaginationPrevious
                key="previous"
                disabled={currentPageNumber <= 1}
                onClick={() => changePageNumber(currentPageNumber - 1)}
            />,
            currentPageNumber - 2 > 1 ? paginationEllipsis : null,
            paginationItem(currentPageNumber - 2),
            paginationItem(currentPageNumber - 1),
            paginationItem(currentPageNumber),
            paginationItem(currentPageNumber + 1),
            paginationItem(currentPageNumber + 2),
            currentPageNumber + 2 < maxNumberOfPages ?
                paginationEllipsis
            :   null,
            <PaginationNext
                key="next"
                disabled={currentPageNumber >= maxNumberOfPages}
                onClick={() => changePageNumber(currentPageNumber + 1)}
            />,
        ];
    }, [
        changePageNumber,
        maxNumberOfPages,
        currentPageNumber,
        paginationEllipsis,
        paginationItem,
    ]);

    return (
        <Pagination className="my-3">
            <PaginationContent>{pageNationItemsToRender}</PaginationContent>
        </Pagination>
    );
};

export default ListPagination;
