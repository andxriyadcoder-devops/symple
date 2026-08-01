import { Response } from "express";

import promoService from "./promo.service";

import { AuthRequest } from "@/middleware/auth";
import { sendResponse } from "@/shared/utils";

export class PromoController {
  async createPromo(
    req: AuthRequest,
    res: Response
  ) {
    const {
      code,
      reward,
      maxUse,
      expiresAt,
    } = req.body;

    const promo =
      await promoService.createPromo(
        code,
        reward,
        maxUse,
        expiresAt ?? null,
        req.user!.id
      );

    return sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Promo created successfully",
      data: promo,
    });
  }

  async getAllPromos(
    _req: AuthRequest,
    res: Response
  ) {
    const promos =
      await promoService.getAllPromos();

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Promos fetched successfully",
      data: promos,
    });
  }

  async getActivePromos(
    _req: AuthRequest,
    res: Response
  ) {
    const promos =
      await promoService.getActivePromos();

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Active promos fetched successfully",
      data: promos,
    });
  }

  async claimPromo(
    req: AuthRequest,
    res: Response
  ) {
    const { code } = req.body;

    const result =
      await promoService.claimPromo(
        req.user!.id,
        code
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Promo claimed successfully",
      data: result,
    });
  }

  async updatePromo(
    req: AuthRequest,
    res: Response
  ) {
    const promo =
      await promoService.updatePromo(
        String(req.params.id),
        req.body
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Promo updated successfully",
      data: promo,
    });
  }

  async deletePromo(
    req: AuthRequest,
    res: Response
  ) {
    await promoService.deletePromo(
      String(req.params.id)
    );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Promo deleted successfully",
      data: null,
    });
  }
}

export default new PromoController();