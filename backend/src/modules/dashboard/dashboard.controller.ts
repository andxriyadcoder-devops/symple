import { Response } from "express";

import { AuthRequest } from "@/middleware/auth";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import { sendResponse } from "@/shared/utils";

import dashboardService from "./dashboard.service";

export class DashboardController {
  getDashboard = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      const result = await dashboardService.getDashboard(
        req.user!.id
      );

      return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Dashboard data fetched successfully",
        data: result,
      });
    }
  );
}

export default new DashboardController();