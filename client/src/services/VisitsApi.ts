import type { ApiResponse, VisitCounter } from "../lib/types";

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Increments the visit count for a specific book.
 * @param bookId The unique identifier for the book.
 * @returns The updated visit counter.
 */
export async function incrementVisit(bookId: string): Promise<VisitCounter> {
    if (!import.meta.env.DEV) {
        return Promise.resolve({ id: bookId, count: 0 });
    }
    const response = await fetch(`${apiBaseUrl}/api/visits/increment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: bookId }),
    });

    if (!response.ok) {
        throw new Error(`Failed to increment visit: ${response.statusText}`);
    }

    const data: ApiResponse<VisitCounter> = await response.json();
    return data.data;
}

/**
 * Gets the visit count for a specific book.
 * @param bookId The unique identifier for the book.
 * @returns The number of visits.
 */
export async function getVisitCount(bookId: string): Promise<number> {
    if (!import.meta.env.DEV) {
        return Promise.resolve(0);
    }
    const response = await fetch(`${apiBaseUrl}/api/visits/${bookId}`);

    if (!response.ok) {
        throw new Error(`Failed to get visit count: ${response.statusText}`);
    }

    const data: ApiResponse<number> = await response.json();
    return data.data;
}

/**
 * Gets the visit counts for multiple books in a single request.
 * @param bookIds Array of book IDs to fetch visit counts for (max 100).
 * @returns Array of visit counters with id and count.
 */
export async function getVisitCountBatch(
    bookIds: string[],
): Promise<VisitCounter[]> {
    if (!import.meta.env.DEV) {
        return Promise.resolve(bookIds.map(id => ({ id, count: 0 })));
    }
    const response = await fetch(`${apiBaseUrl}/api/visits/batch`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: bookIds }),
    });

    if (!response.ok) {
        throw new Error(
            `Failed to get visit count batch: ${response.statusText}`,
        );
    }

    const data: ApiResponse<VisitCounter[]> = await response.json();
    return data.data;
}
