import { Schema, model } from "mongoose";

import { IRewardClaimDocument } from "./rewardClaim.types";

const RewardClaimSchema =
  new Schema<IRewardClaimDocument>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      taskId: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true,
        index: true,
      },

      reward: {
        type: Number,
        required: true,
        default: 0,
      },

      claimedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

RewardClaimSchema.index(
  {
    userId: 1,
    taskId: 1,
  },
  {
    unique: true,
  }
);

export const RewardClaim = model<IRewardClaimDocument>(
  "RewardClaim",
  RewardClaimSchema
);