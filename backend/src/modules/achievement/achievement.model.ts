import { Schema, model } from "mongoose";

import { IAchievementDocument } from "./achievement.types";

const AchievementSchema =
  new Schema<IAchievementDocument>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      badge: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        default: "",
      },

      rewardCoin: {
        type: Number,
        default: 0,
      },

      rewardXP: {
        type: Number,
        default: 0,
      },

      achievedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

AchievementSchema.index(
  {
    userId: 1,
    badge: 1,
  },
  {
    unique: true,
  }
);

export const Achievement =
  model<IAchievementDocument>(
    "Achievement",
    AchievementSchema
  );