import { Router } from "express";
import VisitController from "./visits-controller.js";
import {
    validateBodyId,
    validateBodyIds,
    validateId,
} from "./visits-middleware.js";

const router: Router = Router();

/**
 * @route   POST /api/visits/increment
 * @desc    Increment visit count for a specific book
 * @access  Public
 * @body    { id: string } - Book ID
 * @returns { data: IVisitCounter } - Updated visit counter
 */
router.post("/visits/increment", validateBodyId, VisitController.post);

/**
 * @route   GET /api/visits/:id
 * @desc    Get visit count for a specific book
 * @access  Public
 * @param   id - Book ID (URL parameter)
 * @returns { data: number } - Visit count
 */
router.get("/visits/:id", validateId, VisitController.get);

/**
 * @route   POST /api/visits/batch
 * @desc    Get visit counts for multiple books (max 100)
 * @access  Public
 * @body    { ids: string[] } - Array of book IDs
 * @returns { data: IVisitCounter[] } - Array of visit counters
 */
router.post("/visits/batch", validateBodyIds, VisitController.getMany);

export { router as visitsRouter };

