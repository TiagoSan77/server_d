"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const viewSchema = new mongoose_1.Schema({
    count: { type: Number, default: 0 },
});
const ViewModel = mongoose_1.models.View || (0, mongoose_1.model)('View', viewSchema);
class View {
    constructor() {
        this.initialize();
    }
    async initialize() {
        const existing = await ViewModel.findOne();
        if (!existing) {
            await new ViewModel({ count: 0 }).save();
        }
    }
    async getViews(req, res) {
        try {
            const view = await ViewModel.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true });
            res.json({ views: view?.count ?? 0 });
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
const viewController = new View();
exports.default = viewController;
