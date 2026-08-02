import { Response } from "express";

import transactionService from "./transaction.service";
import { AuthRequest } from "@/middleware/auth";
import { sendResponse } from "@/shared/utils";

export class TransactionController {
  async myTransactions(req: AuthRequest, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const type = req.query.type as string | undefined;
    const search = req.query.search as string | undefined;

    const transactions =
      await transactionService.getMyTransactions(
        req.user!.id,
        page,
        limit,
        type,
        search,
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Transactions fetched successfully",
      data: transactions,
    });
  }

  async getAllWithdrawRequests(
    _req: AuthRequest,
    res: Response
  ) {
    const data =
      await transactionService.getAllWithdrawRequests();

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Withdraw requests fetched successfully",
      data,
    });
  }

  async approveWithdraw(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await transactionService.approveWithdraw(
        String(req.params.id)
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Withdraw request approved successfully",
      data,
    });
  }

  async rejectWithdraw(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await transactionService.rejectWithdraw(
        String(req.params.id)
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Withdraw request rejected successfully",
      data,
    });
  }
}

export default new TransactionController();