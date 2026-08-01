import { Types } from "mongoose";

import { Leaderboard } from "./leaderboard.model";
import { ILeaderboardDocument } from "./leaderboard.types";

export class LeaderboardRepository {
  async create(data: Partial<ILeaderboardDocument>) {
    return Leaderboard.create(data);
  }

  async findByUser(userId: string) {
    return Leaderboard.findOne({
      userId,
    });
  }

  async update(
    userId: string,
    data: Partial<ILeaderboardDocument>
  ) {
    return Leaderboard.findOneAndUpdate(
      {
        userId,
      },
      data,
      {
        returnDocument: "after",
      }
    );
  }

  async upsert(
    userId: Types.ObjectId,
    data: Partial<ILeaderboardDocument>
  ) {
    return Leaderboard.findOneAndUpdate(
      {
        userId,
      },
      data,
      {
        upsert: true,
        new: true,
      }
    );
  }

  async getGlobalLeaderboard(limit = 50) {
    return Leaderboard.find()
      .populate(
        "userId",
        "fullName username email"
      )
      .sort({
        totalCoin: -1,
        totalXP: -1,
      })
      .limit(limit);
  }

  async getCountryLeaderboard(
    country: string,
    limit = 50
  ) {
    return Leaderboard.find({
      country,
    })
      .populate(
        "userId",
        "fullName username email"
      )
      .sort({
        totalCoin: -1,
        totalXP: -1,
      })
      .limit(limit);
  }
}

export default new LeaderboardRepository();