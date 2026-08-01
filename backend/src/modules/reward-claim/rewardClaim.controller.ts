import { Response } from "express";

import rewardClaimService from "./rewardClaim.service";

import { AuthRequest } from "@/middleware/auth";
import { sendResponse } from "@/shared/utils";

export class RewardClaimController {
  async claimReward(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await rewardClaimService.claimReward(
        req.user!.id,
        String(req.params.taskId)
      );

    return sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Reward claimed successfully",
      data,
    });
  }

  async myClaims(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await rewardClaimService.myClaims(
        req.user!.id
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Reward claims fetched successfully",
      data,
    });
  }

  async allClaims(
    _req: AuthRequest,
    res: Response
  ) {
    const data =
      await rewardClaimService.allClaims();

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All reward claims fetched successfully",
      data,
    });
  }
}

export default new RewardClaimController();