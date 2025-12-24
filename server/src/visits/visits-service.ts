import type { IVisitCounter } from "../../types.js";

// * In-memory storage for book visits (temporary solution)
const visitsMap: Map<string, number> = new Map();

export class VisitsService {
    public static increment(id: string): IVisitCounter {
        const currentCount = visitsMap.get(id) ?? 0;
        const newCount = currentCount + 1;

        visitsMap.set(id, newCount);

        return { id: id, count: newCount };
    }

    public static getBookVisits(id: string): number {
        return visitsMap.get(id) ?? 0;
    }
}
