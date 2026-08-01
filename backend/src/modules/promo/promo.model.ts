import { Schema, model } from "mongoose";

import { IPromoDocument } from "./promo.types";

const PromoSchema = new Schema<IPromoDocument>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    reward: {
      type: Number,
      required: true,
      min: 1,
    },

    maxUse: {
      type: Number,
      default: 1,
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Promo = model<IPromoDocument>(
  "Promo",
  PromoSchema
);