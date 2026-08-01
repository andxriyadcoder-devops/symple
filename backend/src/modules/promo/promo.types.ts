import { Document, Types } from "mongoose";

export interface IPromoDocument extends Document {
  code: string;

  reward: number;

  maxUse: number;

  usedCount: number;

  isActive: boolean;

  expiresAt?: Date | null;

  createdBy?: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}