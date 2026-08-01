import { Document, Types } from "mongoose";

export interface IPaymentDocument extends Document {
  userId: Types.ObjectId;

  paymentId: string;

  type: "DEPOSIT" | "WITHDRAW";

  method:
    | "BKASH"
    | "NAGAD"
    | "SSL_COMMERZ"
    | "BANK";

  amount: number;

  status:
    | "PENDING"
    | "PROCESSING"
    | "SUCCESS"
    | "FAILED"
    | "REJECTED";

  transactionId?: string;

  note?: string;

  createdAt: Date;
  updatedAt: Date;
}