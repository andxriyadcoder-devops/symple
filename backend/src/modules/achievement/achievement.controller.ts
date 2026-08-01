import { Response } from "express";

import achievementService from "./achievement.service";

import { AuthRequest } from "@/middleware/auth";
import { sendResponse } from "@/shared/utils";

export class AchievementController {
  async myAchievements(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await achievementService.myAchievements(
        req.user!.id
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Achievements fetched successfully",
      data,
    });
  }

  async allAchievements(
    _req: AuthRequest,
    res: Response
  ) {
    const data =
      await achievementService.allAchievements();

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All achievements fetched successfully",
      data,
    });
  }

  async deleteAchievement(
    req: AuthRequest,
    res: Response
  ) {
    await achievementService.deleteAchievement(
      String(req.params.id)
    );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Achievement deleted successfully",
      data: null,
    });
  }
}

export default new AchievementController();