import { Document, Types } from "mongoose";

export interface ILeaderboardDocument extends Document {
  userId: Types.ObjectId;

  totalCoin: number;

  totalXP: number;

  level: number;

  rank: number;

  country?: string;

  createdAt: Date;
  updatedAt: Date;
}