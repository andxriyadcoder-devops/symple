import { Schema, model } from "mongoose";

import { IReferralDocument } from "./referral.types";

const ReferralSchema = new Schema<IReferralDocument>(
  {
    referrerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    referredUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    reward: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ReferralSchema.index({
  referrerId: 1,
});

export const Referral = model<IReferralDocument>(
  "Referral",
  ReferralSchema
);