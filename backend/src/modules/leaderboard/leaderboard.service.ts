import { Types } from "mongoose";

import leaderboardRepository from "./leaderboard.repository";

export class LeaderboardService {
  async updateLeaderboard(
    userId: string,
    totalCoin: number,
    totalXP: number,
    country = "Bangladesh"
  ) {
    const level = Math.max(
      1,
      Math.floor(totalXP / 1000) + 1
    );

    return leaderboardRepository.upsert(
      new Types.ObjectId(userId),
      {
        totalCoin,
        totalXP,
        level,
        country,
      }
    );
  }

  async getMyRank(userId: string) {
    return leaderboardRepository.findByUser(userId);
  }

  async getGlobalLeaderboard(limit = 50) {
    return leaderboardRepository.getGlobalLeaderboard(
      limit
    );
  }

  async getCountryLeaderboard(
    country: string,
    limit = 50
  ) {
    return leaderboardRepository.getCountryLeaderboard(
      country,
      limit
    );
  }
}

export default new LeaderboardService();