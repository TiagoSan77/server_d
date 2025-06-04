import { Router } from "express";
import mens from "../controllers/MensagemController";

const router = Router();

router.post('/send-message', (req, res) => mens.enviarMensagem(req, res));
router.get('/qrcode', (req, res) => mens.getQRCode(req, res));

export default router;