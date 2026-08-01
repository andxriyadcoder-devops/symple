import { Document, Types } from "mongoose";

export interface IAchievementDocument
  extends Document {
  userId: Types.ObjectId;

  badge: string;

  title: string;

  description: string;

  rewardCoin: number;

  rewardXP: number;

  achievedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}