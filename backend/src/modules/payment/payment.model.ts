import { Schema, model } from "mongoose";

import { IPaymentDocument } from "./payment.types";

const PaymentSchema = new Schema<IPaymentDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    paymentId: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      enum: ["DEPOSIT", "WITHDRAW"],
      required: true,
    },

    method: {
      type: String,
      enum: [
        "BKASH",
        "NAGAD",
        "SSL_COMMERZ",
        "BANK",
      ],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "PROCESSING",
        "SUCCESS",
        "FAILED",
        "REJECTED",
      ],
      default: "PENDING",
    },

    transactionId: {
      type: String,
    },

    note: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Payment = model<IPaymentDocument>(
  "Payment",
  PaymentSchema
);