import { Types } from "mongoose";

import promoRepository from "./promo.repository";

import walletService from "@/modules/wallet/wallet.service";
import transactionService from "@/modules/transaction/transaction.service";

import { AppError } from "@/shared/errors/AppError";
import { TransactionType } from "@/shared/enums";
import notificationService from "@/modules/notification/notification.service";

export class PromoService {
  async createPromo(
    code: string,
    reward: number,
    maxUse: number,
    expiresAt: Date | null,
    createdBy: string
  ) {
    const exists = await promoRepository.findByCode(code);

    if (exists) {
      throw new AppError(
        "Promo code already exists",
        400
      );
    }

    return promoRepository.create({
      code: code.toUpperCase(),
      reward,
      maxUse,
      expiresAt,
      createdBy: new Types.ObjectId(createdBy),
    });
  }

  async getAllPromos() {
    return promoRepository.findAll();
  }

  async getActivePromos() {
    return promoRepository.findActive();
  }

  async claimPromo(
    userId: string,
    code: string
  ) {
    const promo =
      await promoRepository.findByCode(code);

    if (!promo) {
      throw new AppError(
        "Invalid promo code",
        404
      );
    }

    if (!promo.isActive) {
      throw new AppError(
        "Promo code is inactive",
        400
      );
    }

    if (
      promo.expiresAt &&
      promo.expiresAt < new Date()
    ) {
      throw new AppError(
        "Promo code expired",
        400
      );
    }

    if (promo.usedCount >= promo.maxUse) {
      throw new AppError(
        "Promo usage limit reached",
        400
      );
    }

    const wallet =
      await walletService.getWalletByUserObjectId(
        userId
      );

    if (!wallet) {
      throw new AppError(
        "Wallet not found",
        404
      );
    }

    await walletService.addCoin(
      wallet._id.toString(),
      promo.reward
    );

    await transactionService.createTransfer(
      wallet.userId,
      wallet._id,
      promo.reward,
      TransactionType.PROMO_REWARD,
      `Promo: ${promo.code}`
    );

    await promoRepository.increaseUsedCount(
      promo._id.toString()
    );
    await notificationService.createNotification(
      userId,
      "🎁 Promo Reward",
      `You successfully claimed promo code "${promo.code}" and earned ${promo.reward} coins.`,
      "PROMO"
    );
    return {
      code: promo.code,
      reward: promo.reward,
    };
  }

  async updatePromo(
    id: string,
    data: any
  ) {
    return promoRepository.update(id, data);
  }

  async deletePromo(id: string) {
    return promoRepository.delete(id);
  }
}

export default new PromoService();