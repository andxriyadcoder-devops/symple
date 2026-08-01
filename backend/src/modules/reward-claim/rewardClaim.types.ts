import { Document, Types } from "mongoose";

export interface IRewardClaimDocument extends Document {
  userId: Types.ObjectId;

  taskId: Types.ObjectId;

  reward: number;

  claimedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}