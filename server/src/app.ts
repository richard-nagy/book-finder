import cors from "cors";
import type { Express } from "express";
import express from "express";
import { visitsRouter } from "./visits/visits-routes.js";

const app: Express = express();

// Current development setup - adjust as needed for production
const allowedOrigins = ["http://localhost:5173"];

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

export default app;
