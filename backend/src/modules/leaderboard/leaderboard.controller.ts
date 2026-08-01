import { Response } from "express";

import leaderboardService from "./leaderboard.service";

import { AuthRequest } from "@/middleware/auth";
import { sendResponse } from "@/shared/utils";

export class LeaderboardController {
  async myRank(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await leaderboardService.getMyRank(
        req.user!.id
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Leaderboard data fetched successfully",
      data,
    });
  }

  async globalLeaderboard(
    req: AuthRequest,
    res: Response
  ) {
    const limit = Number(req.query.limit) || 50;

    const data =
      await leaderboardService.getGlobalLeaderboard(
        limit
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Global leaderboard fetched successfully",
      data,
    });
  }

  async countryLeaderboard(
    req: AuthRequest,
    res: Response
  ) {
    const country =
      String(req.query.country || "Bangladesh");

    const limit = Number(req.query.limit) || 50;

    const data =
      await leaderboardService.getCountryLeaderboard(
        country,
        limit
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Country leaderboard fetched successfully",
      data,
    });
  }
}

export default new LeaderboardController();