import type { NextFunction, Request, Response } from "express";
import { VisitsService } from "./visits-service.js";

export default class VisitController {
    static async post(req: Request, res: Response, next: NextFunction) {
        try {
            const contact = await VisitsService.increment(req.body.identifier);
            res.json(contact);
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
            // todo: Unify these responses
            res.json({
                message: "Ok",
                ok: true,
                data: contact,
            });
        } catch (error) {
            next(error);
        }
    }
}
