import { Types } from "mongoose";

import paymentRepository from "./payment.repository";

import walletService from "@/modules/wallet/wallet.service";
import notificationService from "@/modules/notification/notification.service";

import { AppError } from "@/shared/errors/AppError";
import { generateWalletId } from "@/shared/utils";

import sslCommerzGateway from "@/gateways/payment/sslcommerz.gateway";
import bkashGateway from "@/gateways/payment/bkash.gateway";
import nagadGateway from "@/gateways/payment/nagad.gateway";
import { PaymentGateway } from "@/gateways/payment";

export class PaymentService {
  async createDeposit(
    userId: string,
    method:
      | "BKASH"
      | "NAGAD"
      | "SSL_COMMERZ"
      | "BANK",
    amount: number
  ) {
    if (amount <= 0) {
      throw new AppError("Invalid amount", 400);
    }

    let gateway: PaymentGateway;

    switch (method) {
      case "SSL_COMMERZ":
        gateway = sslCommerzGateway;
        break;

      case "BKASH":
        gateway = bkashGateway;
        break;

      case "NAGAD":
        gateway = nagadGateway;
        break;

      default:
        throw new AppError(
          "Unsupported payment method",
          400
        );
    }

    const paymentId = generateWalletId();

    const gatewayResponse =
      await gateway.createPayment({
        paymentId,
        amount,
        customerName: "Symple User",
        customerEmail: "user@symple.app",
        successUrl:
          "http://localhost:5000/api/v1/payments/success",
        failUrl:
          "http://localhost:5000/api/v1/payments/fail",
        cancelUrl:
          "http://localhost:5000/api/v1/payments/cancel",
      });

    const payment =
      await paymentRepository.create({
        userId: new Types.ObjectId(userId),
        paymentId,
        type: "DEPOSIT",
        method,
        amount,
        status: "PENDING",
      });

    return {
      payment,
      paymentUrl: gatewayResponse.paymentUrl,
    };
  }

  async createWithdraw(
    userId: string,
    method:
      | "BKASH"
      | "NAGAD"
      | "BANK",
    amount: number
  ) {
    if (amount <= 0) {
      throw new AppError(
        "Invalid amount",
        400
      );
    }

    const wallet =
      await walletService.getWalletByUserObjectId(
        userId
      );

    if (!wallet) {
      throw new AppError(
        "Wallet not found",
        404
      );
    }

    if (wallet.cashBalance < amount) {
      throw new AppError(
        "Insufficient cash balance",
        400
      );
    }

    return paymentRepository.create({
      userId: new Types.ObjectId(userId),
      paymentId: generateWalletId(),
      type: "WITHDRAW",
      method,
      amount,
      status: "PENDING",
    });
  }

  async myPayments(userId: string) {
    return paymentRepository.findByUser(
      userId
    );
  }

  async allPayments() {
    return paymentRepository.findAll();
  }

  async approvePayment(id: string) {
    const payment =
      await paymentRepository.findById(id);

    if (!payment) {
      throw new AppError(
        "Payment not found",
        404
      );
    }

    if (payment.status !== "PENDING") {
      throw new AppError(
        "Payment already processed",
        400
      );
    }

    if (payment.type === "DEPOSIT") {
      const wallet =
        await walletService.getWalletByUserObjectId(
          payment.userId.toString()
        );

      if (!wallet) {
        throw new AppError(
          "Wallet not found",
          404
        );
      }

      await walletService.adminAddCash(
        payment.userId.toString(),
        payment.amount
      );
    }

    const updated =
      await paymentRepository.update(id, {
        status: "SUCCESS",
      });

    await notificationService.createNotification(
      payment.userId.toString(),
      "✅ Payment Approved",
      `Your ${payment.type.toLowerCase()} request has been approved.`,
      "PAYMENT"
    );

    return updated;
  }
  async verifyPayment(
    paymentId: string,
    gatewayTransactionId: string
  ) {
    const payment =
      await paymentRepository.findByPaymentId(paymentId);

    if (!payment) {
      throw new AppError("Payment not found", 404);
    }

    if (payment.status === "SUCCESS") {
      return payment;
    }

    await walletService.adminAddCash(
      payment.userId.toString(),
      payment.amount
    );

    const updated =
      await paymentRepository.update(payment._id.toString(), {
        status: "SUCCESS",
        transactionId: gatewayTransactionId,
      });

    await notificationService.createNotification(
      payment.userId.toString(),
      "✅ Deposit Successful",
      `${payment.amount} cash has been added to your wallet.`,
      "PAYMENT"
    );

  return updated;
}

  async rejectPayment(
    id: string,
    note?: string
  ) {
    const payment =
      await paymentRepository.findById(id);

    if (!payment) {
      throw new AppError(
        "Payment not found",
        404
      );
    }

    const updated =
      await paymentRepository.update(id, {
        status: "REJECTED",
        note,
      });

    await notificationService.createNotification(
      payment.userId.toString(),
      "❌ Payment Rejected",
      `Your ${payment.type.toLowerCase()} request was rejected.`,
      "PAYMENT"
    );

    return updated;
  }
}

export default new PaymentService();