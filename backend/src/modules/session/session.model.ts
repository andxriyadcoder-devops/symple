import { Schema, model } from "mongoose";

import {
  ISessionDocument,
} from "./session.types";

const sessionSchema = new Schema<ISessionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },

    device: {
      type: String,
    },

    ipAddress: {
      type: String,
    },

    userAgent: {
      type: String,
    },

    isRevoked: {
      type: Boolean,
      default: false,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: {
        expires: 0,
      },
    },

    lastUsedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const SessionModel = model<ISessionDocument>(
  "Session",
  sessionSchema
);

export default SessionModel;