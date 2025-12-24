import type { NextFunction, Request, Response } from "express";
import type { ApiResponse, IVisitCounter } from "../../types.js";
import { VisitsService } from "./visits-service.js";

export default class VisitController {
    static async post(req: Request, res: Response, next: NextFunction) {
        try {
            const visitCounter = await VisitsService.increment(req.body.id);
            const response: ApiResponse<IVisitCounter> = {
                message: "Ok",
                ok: true,
                data: visitCounter,
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    static async get(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const visitCount = await VisitsService.getBookVisits(req.params.id);
            const response: ApiResponse<number> = {
                message: "Ok",
                ok: true,
                data: visitCount,
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
}
