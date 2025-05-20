// servidor.ts (Node.js com Express e MongoDB)
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { MONGO_URI, PORT } from './config';
dotenv.config();

const app = express();
app.use(cors());

mongoose.connect(MONGO_URI);

const viewSchema = new mongoose.Schema({ count: Number });
const View = mongoose.model('View', viewSchema);

View.findOne().then(doc => {
  if (!doc) new View({ count: 0 }).save();
});

app.get('/api/views', async (req, res) => {
  const view = await View.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true });
  res.json({ views: view?.count });
});

app.listen(PORT, () => console.log('Servidor rodando na porta 3001'));
