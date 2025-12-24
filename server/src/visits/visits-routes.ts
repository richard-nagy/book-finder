import { Router } from "express";
import VisitController from "./visits-controller.js";
import { validateBodyId, validateId } from "./visits-middleware.js";

const router: Router = Router();

router.post("/visits/increment", validateBodyId, VisitController.post);
router.get("/visits/:id", validateId, VisitController.get);

export { router as visitsRouter };
