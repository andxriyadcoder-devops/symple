import { Schema, model } from "mongoose";

import { ILeaderboardDocument } from "./leaderboard.types";

const LeaderboardSchema =
  new Schema<ILeaderboardDocument>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      totalCoin: {
        type: Number,
        default: 0,
      },

      totalXP: {
        type: Number,
        default: 0,
      },

      level: {
        type: Number,
        default: 1,
      },

      rank: {
        type: Number,
        default: 0,
      },

      country: {
        type: String,
        default: "Bangladesh",
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

LeaderboardSchema.index({
  totalCoin: -1,
});

LeaderboardSchema.index({
  totalXP: -1,
});

LeaderboardSchema.index({
  country: 1,
});

export const Leaderboard =
  model<ILeaderboardDocument>(
    "Leaderboard",
    LeaderboardSchema
  );