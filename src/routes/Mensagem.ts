import { Router } from "express";
import {  sendMyMessage } from "../controllers/MensagemController";

const router = Router();

// router.use('/criar',createClient)
router.post('/enviar',sendMyMessage)
// router.post('/multipla',addNewSession) nao funcional ainda

export default router;