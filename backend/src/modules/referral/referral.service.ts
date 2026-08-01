import { Types } from "mongoose";

import referralRepository from "./referral.repository";

import walletService from "@/modules/wallet/wallet.service";
import transactionService from "@/modules/transaction/transaction.service";

import { AppError } from "@/shared/errors/AppError";
import { TransactionType } from "@/shared/enums";
import achievementService from "@/modules/achievement/achievement.service";
import notificationService from "@/modules/notification/notification.service";

export class ReferralService {
  async rewardReferral(
    referrerId: string,
    referredUserId: string
  ) {
    const exists = await referralRepository.findByReferredUser(
      referredUserId
    );

    if (exists) {
      throw new AppError(
        "Referral already claimed",
        400
      );
    }

    const reward = 100;

    const wallet =
      await walletService.getWalletByUserObjectId(
        referrerId
      );

    if (!wallet) {
      throw new AppError(
        "Referrer wallet not found",
        404
      );
    }

    await walletService.addCoin(
      wallet._id.toString(),
      reward
    );

    await transactionService.createTransfer(
      wallet.userId,
      wallet._id,
      reward,
      TransactionType.REFERRAL_REWARD,
      "Referral Reward"
    );
  const referrals =
      await referralRepository.findByReferrer(
        referrerId
      );
      if (referrals.length === 0) {
            await achievementService.unlockAchievement(
              referrerId,
              "FIRST_REFERRAL",
              "First Referral",
              "Successfully referred your first user.",50,30
            );
          }
      if (referrals.length + 1 >= 10) {
          await achievementService.unlockAchievement(
            referrerId,
            "REFERRAL_PRO",
            "Referral Pro",
            "Successfully referred 10 users.",
            300,
            150
          );
        }
        const referral = await referralRepository.create(
      new Types.ObjectId(referrerId),
      new Types.ObjectId(referredUserId),
      reward
    );

    await notificationService.createNotification(
      referrerId,
      "🎉 Referral Reward",
      `You earned ${reward} coins for referring a new user.`,
      "REFERRAL"
    );

    return referral;

  }

  async getMyReferrals(userId: string) {
    return referralRepository.findByReferrer(userId);
  }

  async getReferralStats(userId: string) {
    const referrals =
      await referralRepository.findByReferrer(userId);

    const totalReward =
      await referralRepository.getTotalReward(userId);

    return {
      totalReferrals: referrals.length,
      totalReward,
    };
  }

  async getAllReferrals() {
    return referralRepository.findAll();
  }
}

export default new ReferralService();