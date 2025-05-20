import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, './.env');
dotenv.config({ path: envPath });

// export const DATABASE_URI = ;
export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI + '';

console.log('DATABASE_URI:', MONGO_URI); // Isso está funcionando
console.log('PORT:', PORT); // Isso está funcionando