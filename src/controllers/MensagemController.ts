import mongoose from 'mongoose';
import { Client, RemoteAuth } from 'whatsapp-web.js';
import { MongoStore } from 'wwebjs-mongo';
import qrcode from 'qrcode-terminal';
import { Request, Response } from 'express';
import { DATABASE_URI } from '../config';

//retorna o cliente para a funcao de baixo para nao precisar criar um novo cliente toda vez que for enviar uma mensagem
let client: Client;

export async function createClient(): Promise<Client> {
  if (client) return client;
  // Verifica se o cliente já foi criado no banco de dados, se sim, retorna o cliente existente
  await mongoose.connect(DATABASE_URI);
  const store = new MongoStore({ mongoose: mongoose });

  client = new Client({
    authStrategy: new RemoteAuth({
      store: store,
      backupSyncIntervalMs: 300000
    })
  });
//gera um qrcode caso nao tenha uma sessao salva no banco de dados
  client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
  });
//salva sessao no banco de dados
  client.on('remote_session_saved', () => {
    console.log('✅ Sessão salva no MongoDB com sucesso.');
  });
//carrega as mensagens recebidar e coloca bot de resposta com pong bom para bot de resposta
  client.on('message_create', message => {
    console.log('Mensagem Recebida:', message.body);
    if (message.body === '!ping') {
      message.reply('pong');
    }
  });
//prepara o cliente
  client.once('ready', () => {
    console.log('✅ Cliente WhatsApp está pronto!');
  });
//inicia o cliente
  await client.initialize();

  return client;
}

export async function sendMyMessage(req: Request, res: Response):Promise<void> {
  try {
    const { chatId, message } = req.body;

    if (!chatId || !message) {
      res.status(400).json({ error: 'chatId e message são obrigatórios' });
      return;
    }

    const clientInstance = await createClient();
    const response = await clientInstance.sendMessage(chatId, message);

    res.status(200).json({ success: true, data: response });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar mensagem' });
  }
}

//agora crie uma funcao so para inicializar o cliente pela primeira vez para evitar erro no primeiro uso
// export async function initializeClient(res:Response): Promise<void> {
//   try {
//     await createClient();
//     res.send('Cliente inicializado com sucesso.');
//   } catch (error) {
//     res.send('Erro ao inicializar o cliente:');
//   }
// }

//agora crie uma funcao para desconectar o cliente
// export async function disconnectClient(): Promise<void> {
//   if (client) {
//     await client.destroy();
//     console.log('✅ Cliente desconectado com sucesso.');
//   } else {
//     console.log('❌ Cliente não está conectado.');
//   }
// }

//agora crie uma funcao para adicionar mais uma sessao para o cliente e gere outro qrcode para manter multiplas sessoes
// export async function addNewSession(): Promise<void> {
//   try {
//     const clientInstance = await createClient();
//     clientInstance.on('qr', qr => {
//       qrcode.generate(qr, { small: true });
//     });
//     clientInstance.on('remote_session_saved', () => {
//       console.log('✅ Nova sessão salva no MongoDB com sucesso.');
//     });
//     clientInstance.once('ready', () => {
//       console.log('✅ Cliente WhatsApp está pronto para a nova sessão!');
//     });
//     await clientInstance.initialize();
//   } catch (error) {
//     console.error('Erro ao adicionar nova sessão:', error);
//   }
// }

//crie uma funcao para apagar a sessao do cliente
// export async function deleteSession(): Promise<void> {
//   try {
//     if (client) {
//       await client.destroy();
//       console.log('✅ Sessão do cliente apagada com sucesso.');
//       client = null; // Reseta o cliente para permitir uma nova conexão
//     } else {
//       console.log('❌ Cliente não está conectado.');
//     }
//   } catch (error) {
//     console.error('Erro ao apagar a sessão do cliente:', error);
//   }
// }


//crie uma funcao para enviar uma mensagem programada com data e hora , para ser enviada nesse horario
// export async function scheduleMessage(chatId: string, message: string, date: Date): Promise<void> {
//   const now = new Date();
//   const delay = date.getTime() - now.getTime();
//   if (delay < 0) {
//     console.error('Data e hora para envio programado já passaram.');
//     return;
//   }
//   setTimeout(async () => {
//     try {
//       const clientInstance = await createClient();
//       await clientInstance.sendMessage(chatId, message);
//       console.log(`✅ Mensagem programada enviada para ${chatId} às ${date}`);
//     } catch (error) {
//       console.error('Erro ao enviar mensagem programada:', error);
//     }
//   }, delay);
// }
