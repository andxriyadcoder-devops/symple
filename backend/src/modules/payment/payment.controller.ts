import { Response } from "express";

import paymentService from "./payment.service";

import { AuthRequest } from "@/middleware/auth";
import { sendResponse } from "@/shared/utils";

export class PaymentController {
  async createDeposit(
    req: AuthRequest,
    res: Response
  ) {
    const { method, amount } = req.body;

    const data =
      await paymentService.createDeposit(
        req.user!.id,
        method,
        Number(amount)
      );

    return sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Deposit request created successfully",
      data,
    });
  }

  async createWithdraw(
    req: AuthRequest,
    res: Response
  ) {
    const { method, amount } = req.body;

    const data =
      await paymentService.createWithdraw(
        req.user!.id,
        method,
        Number(amount)
      );

    return sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Withdraw request created successfully",
      data,
    });
  }

  async myPayments(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await paymentService.myPayments(
        req.user!.id
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Payment history fetched successfully",
      data,
    });
  }

  async allPayments(
    _req: AuthRequest,
    res: Response
  ) {
    const data =
      await paymentService.allPayments();

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All payments fetched successfully",
      data,
    });
  }

  async approvePayment(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await paymentService.approvePayment(
        String(req.params.id)
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Payment approved successfully",
      data,
    });
  }

  async rejectPayment(
    req: AuthRequest,
    res: Response
  ) {
    const { note } = req.body;

    const data =
      await paymentService.rejectPayment(
        String(req.params.id),
        note
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Payment rejected successfully",
      data,
    });
  }
  async paymentSuccess(
    req: AuthRequest,
    res: Response
  ) {
    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Payment success callback received",
      data: req.query,
    });
  }
  async paymentFail(
    req: AuthRequest,
    res: Response
  ) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "Payment failed",
      data: req.query,
    });
  }
  async paymentCancel(
    req: AuthRequest,
    res: Response
  ) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "Payment cancelled",
      data: req.query,
    });
  }
}

export default new PaymentController();