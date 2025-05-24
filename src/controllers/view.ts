import mongoose, { Schema, model, models } from "mongoose";
import { Request, Response } from "express";

const viewSchema = new Schema({
  count: { type: Number, default: 0 },
});

const ViewModel = models.View || model('View', viewSchema);

class View {
  constructor() {
    this.initialize();
  }

  private async initialize() {
    const existing = await ViewModel.findOne();
    if (!existing) {
      await new ViewModel({ count: 0 }).save();
    }
  }

  async getViews(req: Request, res: Response) {
    try {
      const view = await ViewModel.findOneAndUpdate(
        {},
        { $inc: { count: 1 } },
        { new: true }
      );

      res.json({ views: view?.count ?? 0 });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

const viewController = new View();
export default viewController;