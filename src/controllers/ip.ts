// ipRoute.ts
import { Router, Request, Response } from 'express';
import requestIp from 'request-ip';
const ipRouter = Router();

// ipRouter.get('/', (req: Request, res: Response) => {
//     const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//     console.log('IP do cliente:', ip);
//     res.send(`Seu IP é: ${ip}`);
// });
ipRouter.get('/', (req: Request, res: Response) => {
    const ip = requestIp.getClientIp(req);
    console.log('IP do cliente:', ip);
    res.send(`Seu IP é: ${ip}`);
});

export default ipRouter;
