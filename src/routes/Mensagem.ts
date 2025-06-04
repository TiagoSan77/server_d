import { Router } from "express";
import mens from "../controllers/MensagemController";

const router = Router();

// router.post('/enviar',mens.enviarMensagem);
router.post('/send-message', mens.enviarMensagem.bind(mens));
router.get('/qrcode', mens.getQRCode);

export default router;