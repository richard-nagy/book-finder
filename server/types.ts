export interface IVisitCounter {
    id: string;
    count: number;
}

export interface ApiResponse<T> {
    message: string;
    ok: boolean;
    data: T;
}
