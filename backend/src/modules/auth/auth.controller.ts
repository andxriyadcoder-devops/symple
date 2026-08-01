import { Request, Response } from "express";

import { AuthService } from "./auth.service";
import { AuthRequest } from "@/middleware/auth";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import { sendResponse } from "@/shared/utils";

const authService = new AuthService();

export class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);

  return sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Registration successful",
    data: result,
  });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Login successful",
    data: result,
  });
  });

    me = asyncHandler(async (req: AuthRequest, res: Response) => {
      const user = await authService.me(req.user!.id);

      return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Profile fetched successfully",
        data: user,
      });
    });

    refresh = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    const result = await authService.refresh(refreshToken);

    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Token refreshed successfully",
        data: result,
      });
    });

    logout = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    const result = await authService.logout(
      refreshToken
    );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Logout successful",
      data: result,
    });
  });
}

export default new AuthController();