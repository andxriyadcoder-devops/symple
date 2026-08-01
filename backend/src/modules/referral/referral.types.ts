import { Document, Types } from "mongoose";

export interface IReferralDocument extends Document {
  referrerId: Types.ObjectId;

  referredUserId: Types.ObjectId;

  reward: number;

  createdAt: Date;
  updatedAt: Date;
}