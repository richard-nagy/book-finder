import type { NextFunction, Request, Response } from "express";
import type { ApiResponse, IVisitCounter } from "../../types.js";
import { VisitsService } from "./visits-service.js";

export default class VisitController {
    static async post(req: Request, res: Response, next: NextFunction) {
        try {
            const contact = await VisitsService.increment(req.body.identifier);
            const response: ApiResponse<IVisitCounter> = {
                message: "Ok",
                ok: true,
                data: contact,
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
            const contact = await VisitsService.getBookVisits(req.params.id);
            const response: ApiResponse<number> = {
                message: "Ok",
                ok: true,
                data: contact,
            };
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
}
