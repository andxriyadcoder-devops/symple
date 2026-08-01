import { Types } from "mongoose";

import achievementRepository from "./achievement.repository";

import walletService from "@/modules/wallet/wallet.service";
import leaderboardService from "@/modules/leaderboard/leaderboard.service";
import transactionService from "@/modules/transaction/transaction.service";

import { AppError } from "@/shared/errors/AppError";
import { TransactionType } from "@/shared/enums";
import notificationService from "@/modules/notification/notification.service";


export class AchievementService {
  async unlockAchievement(
    userId: string,
    badge: string,
    title: string,
    description: string,
    rewardCoin = 0,
    rewardXP = 0 ) 
    {
    const exists =
      await achievementRepository.findByBadge(
        userId,
        badge
      );

    if (exists) {
      return exists;
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

    if (rewardCoin > 0) {
      await walletService.addCoin(
        wallet._id.toString(),
        rewardCoin
      );

      await transactionService.createTransfer(
        wallet.userId,
        wallet._id,
        rewardCoin,
        TransactionType.ACHIEVEMENT_REWARD,
        `Achievement: ${title}`
      );
    }

    if (rewardXP > 0) {
      await leaderboardService.updateLeaderboard(
        userId,
        wallet.coinBalance + rewardCoin,
        rewardXP
      );
    }

  const achievement =
    await achievementRepository.create({
      userId: new Types.ObjectId(userId),
      badge,
      title,
      description,
      rewardCoin,
      rewardXP,
      achievedAt: new Date(),
    });

    await notificationService.createNotification(
      userId,
      "🏆 Achievement Unlocked",
      `You unlocked "${title}" and earned ${rewardCoin} coins + ${rewardXP} XP.`,
      "ACHIEVEMENT"
    );

    return achievement;
  }

  async myAchievements(userId: string) {
    return achievementRepository.findByUser(
      userId
    );
  }

  async allAchievements() {
    return achievementRepository.findAll();
  }

  async deleteAchievement(id: string) {
    return achievementRepository.delete(id);
  }
}

export default new AchievementService();