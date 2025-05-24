// servidor.ts (Node.js com Express e MongoDB)
import express from 'express';
import cors from 'cors';
import { PORT } from '../config';
import { connect } from './database/mongoose';
import router from './routes';

const app = express();
app.use(cors());
connect();

app.use('/',router)

app.listen(PORT, () => console.log('Servidor rodando na porta 3001'));
