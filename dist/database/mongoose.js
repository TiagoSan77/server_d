"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const connect = async () => {
    try {
        await mongoose_1.default.connect(config_1.DATABASE_URI);
        console.log('Conectado ao MongoDB com sucesso');
    }
    catch (err) {
        console.log(err, 'Erro ao conectar com mongodb!');
        throw new Error('Erro interno no servidor');
    }
};
exports.connect = connect;
