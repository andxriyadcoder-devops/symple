import { Types } from "mongoose";

import { Achievement } from "./achievement.model";
import { IAchievementDocument } from "./achievement.types";

export class AchievementRepository {
  async create(
    data: Partial<IAchievementDocument>
  ) {
    return Achievement.create(data);
  }

  async findByUser(userId: string) {
    return Achievement.find({
      userId,
    }).sort({
      achievedAt: -1,
    });
  }

  async findByBadge(
    userId: string,
    badge: string
  ) {
    return Achievement.findOne({
      userId,
      badge,
    });
  }

  async findAll() {
    return Achievement.find()
      .populate(
        "userId",
        "fullName username email"
      )
      .sort({
        achievedAt: -1,
      });
  }

  async delete(id: string) {
    return Achievement.findByIdAndDelete(id);
  }
}

export default new AchievementRepository();