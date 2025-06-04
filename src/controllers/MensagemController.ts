// // import { Request, Response } from "express";
// // import { Client, LocalAuth } from 'whatsapp-web.js';
// // import qrcode from 'qrcode-terminal';

// // export class MensagemController {
// //   private client: Client;
// //   private clientReady = false;
// //   constructor() {
// //     this.client = new Client({
// //       authStrategy: new LocalAuth(),
// //       puppeteer: {
// //         headless: true,
// //         args: ['--no-sandbox', '--disable-setuid-sandbox']
// //       }
// //     });

// //     this.client.on('qr', (qr) => {
// //       console.log('📲 Escaneie o QR Code abaixo:');
// //       qrcode.generate(qr, { small: true });
// //     });

// //     this.client.on('ready', () => {
// //       console.log('✅ Cliente pronto.');
// //       this.clientReady = true;
// //     });

// //     this.client.initialize();
// //   }

// //   async enviarMensagem(req: Request, res: Response): Promise<void> {
// //     const { number, message } = req.body;

// //     if (!number || !message) {
// //       res.status(400).json({ error: 'Número e mensagem são obrigatórios' });
// //       return;
// //     }

// //     if (!this.clientReady) {
// //       res.status(400).json({ error: 'Cliente WhatsApp não está pronto ainda' });
// //       return;
// //     }

// //     const chatId = `${number}@c.us`;

// //     try {
// //       const sentMessage = await this.client.sendMessage(chatId, message);
// //       res.json({ success: true, id: sentMessage.id.id });
// //     } catch (error) {
// //       console.error('Erro ao enviar mensagem:', error);
// //       res.status(500).json({ error: 'Erro ao enviar mensagem', details: error });
// //     }
// //   }
// // }

// // const mens = new MensagemController();
// // export default mens;

// ///codigo 2

// import { Request, Response } from "express";
// import { Client, LocalAuth } from 'whatsapp-web.js';
// import qrcodeTerminal from 'qrcode-terminal';
// import QRCode from 'qrcode';

// export class MensagemController {
//   private client: Client;//atributo privado da biblioteca whatsapp-web.js que contem metodos do whatsapp
//   private clientReady = false;
//   private qrCodeData: string | null = null; // armazenar o texto do QR

//   constructor() {
//     this.client = new Client({
//       authStrategy: new LocalAuth(),
//       puppeteer: {
//         headless: true,
//         args: ['--no-sandbox', '--disable-setuid-sandbox'],

//       }
//     });

//     this.client.on('qr', (qr) => {
//       console.log('📲 Escaneie o QR Code abaixo:');
//       qrcodeTerminal.generate(qr, { small: true });
//       this.qrCodeData = qr;
//     });

//     this.client.on('ready', () => {
//       console.log('✅ Cliente pronto.');
//       this.clientReady = true;
//       this.qrCodeData = null; // limpa o QR após login
//     });

//     this.client.initialize();
//   }

//   // Envia uma mensagem para o número informado
//   async enviarMensagem(req: Request, res: Response): Promise<void> {
//     const { number, message } = req.body;

//     if (!number || !message) {
//       res.status(400).json({ error: 'Número e mensagem são obrigatórios' });
//       return;
//     }

//     if (!this.clientReady) {
//       res.status(400).json({ error: 'Cliente WhatsApp não está pronto ainda' });
//       return;
//     }

//     const chatId = `${number}@c.us`;

//     try {
//       const sentMessage = await this.client.sendMessage(chatId, message);
//       res.json({ success: true, id: sentMessage.id.id });
//     } catch (error) {
//       console.error('Erro ao enviar mensagem:', error);
//       res.status(500).json({ error: 'Erro ao enviar mensagem', details: error });
//     }
//   }

//   // Retorna o QR Code atual em base64 para ser renderizado no front
// getQRCode = async (req: Request, res: Response): Promise<void> => {
//   if (!this.qrCodeData) {
//     res.status(404).json({ message: 'QR Code ainda não foi gerado ou já expirou.' });
//     return;
//   }

//   try {
//     const qrBase64 = await QRCode.toDataURL(this.qrCodeData);
//     res.json({ qr: qrBase64 });
//   } catch (err) {
//     console.error('Erro ao gerar imagem base64 do QR:', err);
//     res.status(500).json({ error: 'Erro ao gerar QR Code' });
//   }
// }

// }

// const mens = new MensagemController();
// export default mens;



import { Request, Response } from "express";
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcodeTerminal from 'qrcode-terminal';
import * as QRCode from 'qrcode';

export class MensagemController {
  private client: Client;
  private clientReady = false;
  private qrCodeData: string | null = null;

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      }
    });

    this.client.on('qr', (qr: string) => {
      console.log('📲 Escaneie o QR Code abaixo:');
      qrcodeTerminal.generate(qr, { small: true });
      this.qrCodeData = qr;
    });

    this.client.on('ready', () => {
      console.log('✅ Cliente pronto.');
      this.clientReady = true;
      this.qrCodeData = null;
    });

    this.client.initialize().catch(error => {
      console.error('Erro na inicialização do cliente:', error);
    });
  }

  async enviarMensagem(req: Request, res: Response): Promise<void> {
    const { number, message } = req.body;

    if (!number || !message) {
      res.status(400).json({ error: 'Número e mensagem são obrigatórios' });
      return;
    }

    if (!this.clientReady) {
      res.status(400).json({ error: 'Cliente WhatsApp não está pronto ainda' });
      return;
    }

    const chatId = `${number}@c.us`;

    try {
      const sentMessage = await this.client.sendMessage(chatId, message);
      res.json({ success: true, id: sentMessage.id.id });
    } catch (error: any) {
      console.error('Erro ao enviar mensagem:', error);
      res.status(500).json({ error: 'Erro ao enviar mensagem', details: error.message });
    }
  }

  async getQRCode(req: Request, res: Response): Promise<void> {
    if (!this.qrCodeData) {
      res.status(404).json({ message: 'QR Code ainda não foi gerado ou já expirou.' });
      return;
    }

    try {
      const qrBase64 = await QRCode.toDataURL(this.qrCodeData);
      res.json({ qr: qrBase64 });
    } catch (err: any) {
      console.error('Erro ao gerar imagem base64 do QR:', err);
      res.status(500).json({ error: 'Erro ao gerar QR Code', details: err.message });
    }
  }
}

const mens = new MensagemController();
export default mens;
