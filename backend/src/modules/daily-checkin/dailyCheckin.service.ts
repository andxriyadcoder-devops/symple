import { Types } from "mongoose";

import dailyCheckinRepository from "./dailyCheckin.repository";

import walletService from "@/modules/wallet/wallet.service";
import transactionService from "@/modules/transaction/transaction.service";
import leaderboardService from "@/modules/leaderboard/leaderboard.service";

import { TransactionType } from "@/shared/enums";
import { AppError } from "@/shared/errors/AppError";
import achievementService from "@/modules/achievement/achievement.service";
import notificationService from "@/modules/notification/notification.service";

export class DailyCheckinService {
  async checkin(userId: string) {
    const now = new Date();

    const existing =
      await dailyCheckinRepository.findByUser(userId);

    let streak = 1;
    let totalCheckins = 1;

    if (existing) {
      const last = existing.lastCheckinAt;

      if (last) {
        const diff =
          Math.floor(
            (now.getTime() - last.getTime()) /
              (1000 * 60 * 60 * 24)
          );

        if (diff === 0) {
          throw new AppError(
            "You have already checked in today.",
            400
          );
        }

        if (diff === 1) {
          streak = existing.streak + 1;
        }

        if (diff > 1) {
          streak = 1;
        }
      }

      totalCheckins =
        existing.totalCheckins + 1;
    }

    let reward = 20;
    let xp = 10;

    if (streak % 7 === 0) {
      reward += 50;
      xp += 50;
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
      reward
    );

    await transactionService.createTransfer(
      wallet.userId,
      wallet._id,
      reward,
      TransactionType.DAILY_LOGIN,
      `Daily Check-in Reward`
    );

    await leaderboardService.updateLeaderboard(
      userId,
      wallet.coinBalance + reward,
      xp
    );

    await achievementService.unlockAchievement(
        userId,
        "FIRST_CHECKIN",
        "First Daily Check-in",
        "Completed your first daily check-in.",20,10
      );
    if (streak >= 7) {
      await achievementService.unlockAchievement(
        userId,
        "WEEKLY_WARRIOR",
        "Weekly Warrior",
        "Maintained a 7-day daily check-in streak.",
        100,
        50
      );
    }
    await notificationService.createNotification(
      userId,
      "📅 Daily Check-in",
      `You received ${reward} coins for today's daily check-in.`,
      "DAILY_CHECKIN"
    );

    return dailyCheckinRepository.upsert(
      new Types.ObjectId(userId),
      {
        streak,
        totalCheckins,
        lastCheckinAt: now,
      }
    );
  }

  async myCheckin(userId: string) {
    return dailyCheckinRepository.findByUser(userId);
  }

  async allCheckins() {
    return dailyCheckinRepository.findAll();
  }
}

export default new DailyCheckinService();