import { Response } from "express";

import referralService from "./referral.service";

import { AuthRequest } from "@/middleware/auth";
import { sendResponse } from "@/shared/utils";

export class ReferralController {
  async myReferrals(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await referralService.getMyReferrals(
        req.user!.id
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Referral list fetched successfully",
      data,
    });
  }

  async referralStats(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await referralService.getReferralStats(
        req.user!.id
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Referral statistics fetched successfully",
      data,
    });
  }

  async allReferrals(
    _req: AuthRequest,
    res: Response
  ) {
    const data =
      await referralService.getAllReferrals();

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All referrals fetched successfully",
      data,
    });
  }
}

export default new ReferralController();