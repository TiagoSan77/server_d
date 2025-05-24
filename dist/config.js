"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.DATABASE_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Carrega o .env da raiz do projeto
const envPath = path_1.default.resolve(__dirname, '../.env');
dotenv_1.default.config({ path: envPath });
exports.DATABASE_URI = process.env.DATABASE_URI || '';
exports.PORT = process.env.PORT;
console.log('DATABASE_URI:', exports.DATABASE_URI); // Isso está funcionando
console.log('PORT', exports.PORT); // Isso está funcionando
