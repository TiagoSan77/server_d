import { Router } from "express";
import viewController from "../controllers/view";
const router = Router();

router.get("/visu", viewController.getViews);

export default router;