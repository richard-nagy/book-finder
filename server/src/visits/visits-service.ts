import type { IVisitCounter } from "../../types.js";

// * In-memory storage for book visits (temporary solution)
const visitsMap: Map<string, number> = new Map();

export class VisitsService {
    public static increment(identifier: string): IVisitCounter {
        const currentCount = visitsMap.get(identifier) ?? 0;
        const newCount = currentCount + 1;

        visitsMap.set(identifier, newCount);

        return { id: identifier, count: newCount };
    }

    public static getBookVisits(identifier: string): number {
        return visitsMap.get(identifier) ?? 0;
    }
}
