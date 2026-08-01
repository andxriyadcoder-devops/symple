import { Document, Types } from "mongoose";

export interface IDailyCheckinDocument
  extends Document {
  userId: Types.ObjectId;

  streak: number;

  totalCheckins: number;

  lastCheckinAt?: Date | null;

  createdAt: Date;
  updatedAt: Date;
}