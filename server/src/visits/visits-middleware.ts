import type { NextFunction, Request, Response } from "express";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
        res.status(400).json({
            message: "Invalid or missing 'id' parameter",
            ok: false,
            data: null,
        });

        return;
    }

    next();
};

export const validateBodyId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    if (!id || typeof id !== "string") {
        res.status(400).json({
            message: "Invalid or missing 'id' field in request body",
            ok: false,
            data: null,
        });

        return;
    }

    next();
};
