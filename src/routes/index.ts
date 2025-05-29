import { Router } from "express";
import viewController from "../controllers/view";
const router = Router();

router.get("/visu", viewController.getViews);
router.get("/mostrar", viewController.mostrarViews);
export default router;