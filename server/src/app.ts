import cors from "cors";
import type { Express, NextFunction, Request, Response } from "express";
import express from "express";
import { visitsRouter } from "./visits/visits-routes.js";

const app: Express = express();

// Environment-based CORS configuration
const allowedOrigins =
    process.env.NODE_ENV === "production" ?
        process.env.CLIENT_URL ?
            [process.env.CLIENT_URL]
        :   []
    :   ["http://localhost:5173"];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) {
                return callback(null, true);
            }

            if (!allowedOrigins.includes(origin)) {
                const msg =
                    "The CORS policy for this site does not allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }

            return callback(null, true);
        },
    }),
);

app.use(express.json());
app.use("/api", visitsRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err.message);
    res.status(500).json({
        message: err.message || "Internal Server Error",
        ok: false,
        data: null,
    });
});

export default app;
