import { Document, Types } from "mongoose";

export interface ITaskDocument extends Document {
  title: string;
  description: string;

  reward: number;

  isActive: boolean;

  createdBy?: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}