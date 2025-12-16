import { Router } from "express";
import VisitController from "./visits-controller.js";

const router: Router = Router();

router.post("/visits/increment", VisitController.post);
router.get("/visits/:id", VisitController.get);

export { router as visitsRouter };
