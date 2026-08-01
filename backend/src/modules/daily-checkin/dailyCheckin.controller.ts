import { Response } from "express";

import dailyCheckinService from "./dailyCheckin.service";

import { AuthRequest } from "@/middleware/auth";
import { sendResponse } from "@/shared/utils";

export class DailyCheckinController {
  async checkin(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await dailyCheckinService.checkin(
        req.user!.id
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Daily check-in successful",
      data,
    });
  }

  async myCheckin(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await dailyCheckinService.myCheckin(
        req.user!.id
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Daily check-in data fetched successfully",
      data,
    });
  }

  async allCheckins(
    _req: AuthRequest,
    res: Response
  ) {
    const data =
      await dailyCheckinService.allCheckins();

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All daily check-ins fetched successfully",
      data,
    });
  }
}

export default new DailyCheckinController();