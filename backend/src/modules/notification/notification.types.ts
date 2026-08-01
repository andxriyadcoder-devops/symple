import { Document, Types } from "mongoose";

export interface INotificationDocument
  extends Document {
  userId: Types.ObjectId;

  title: string;

  message: string;

  type: string;

  isRead: boolean;

  createdAt: Date;
  updatedAt: Date;
}