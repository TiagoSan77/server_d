"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envPath = path_1.default.resolve(__dirname, './.env');
dotenv_1.default.config({ path: envPath });
// export const DATABASE_URI = ;
exports.PORT = process.env.PORT;
exports.MONGO_URI = process.env.MONGO_URI + '';
console.log('DATABASE_URI:', exports.MONGO_URI); // Isso está funcionando
console.log('PORT:', exports.PORT); // Isso está funcionando
