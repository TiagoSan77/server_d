import { Router } from "express";
import viewController from "../controllers/view";
import ipRouter from "../controllers/ip";
import Mensagem from "./Mensagem";
const router = Router();

router.get("/visu", viewController.getViews);
router.get("/mostrar", viewController.mostrarViews);
router.use("/ip",ipRouter);
router.use("/",Mensagem);
export default router;