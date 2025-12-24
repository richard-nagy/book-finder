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

export const validateBodyId = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
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

export const validateBodyIds = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { ids } = req.body;

    if (
        !ids ||
        !Array.isArray(ids) ||
        ids.length === 0 ||
        ids.length > 100 ||
        !ids.every((id) => typeof id === "string" && id.trim().length > 0)
    ) {
        res.status(400).json({
            message: "Invalid or missing 'ids' field in request body",
            ok: false,
            data: null,
        });

        return;
    }

    next();
};
