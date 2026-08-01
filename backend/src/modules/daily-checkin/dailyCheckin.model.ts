import { Schema, model } from "mongoose";

import { IDailyCheckinDocument } from "./dailyCheckin.types";

const DailyCheckinSchema =
  new Schema<IDailyCheckinDocument>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      streak: {
        type: Number,
        default: 0,
      },

      totalCheckins: {
        type: Number,
        default: 0,
      },

      lastCheckinAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

export const DailyCheckin =
  model<IDailyCheckinDocument>(
    "DailyCheckin",
    DailyCheckinSchema
  );