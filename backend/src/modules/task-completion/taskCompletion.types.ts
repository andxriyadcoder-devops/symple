import { Document, Types } from "mongoose";

export interface ITaskCompletionDocument extends Document {
  userId: Types.ObjectId;
  taskId: Types.ObjectId;

  reward: number;

  completedAt: Date;
}