"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// servidor.ts (Node.js com Express e MongoDB)
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
mongoose_1.default.connect(config_1.MONGO_URI);
const viewSchema = new mongoose_1.default.Schema({ count: Number });
const View = mongoose_1.default.model('View', viewSchema);
View.findOne().then(doc => {
    if (!doc)
        new View({ count: 0 }).save();
});
app.get('/api/views', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const view = yield View.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true });
    res.json({ views: view === null || view === void 0 ? void 0 : view.count });
}));
app.listen(config_1.PORT, () => console.log('Servidor rodando na porta 3001'));
