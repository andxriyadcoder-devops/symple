import { Document, Types } from "mongoose";

export interface ISession {
  userId: Types.ObjectId;
  refreshToken: string;
  device?: string;
  ipAddress?: string;
  userAgent?: string;
  isRevoked: boolean;
  expiresAt: Date;
  lastUsedAt?: Date;
}

export interface ISessionDocument
  extends ISession,
    Document {
  createdAt: Date;
  updatedAt: Date;
}