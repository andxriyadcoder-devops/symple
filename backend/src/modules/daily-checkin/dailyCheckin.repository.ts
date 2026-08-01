import { Types } from "mongoose";

import { DailyCheckin } from "./dailyCheckin.model";
import { IDailyCheckinDocument } from "./dailyCheckin.types";

export class DailyCheckinRepository {
  async create(data: Partial<IDailyCheckinDocument>) {
    return DailyCheckin.create(data);
  }

  async findByUser(userId: string) {
    return DailyCheckin.findOne({
      userId,
    });
  }

  async upsert(
    userId: Types.ObjectId,
    data: Partial<IDailyCheckinDocument>
  ) {
    return DailyCheckin.findOneAndUpdate(
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

  async update(
    userId: string,
    data: Partial<IDailyCheckinDocument>
  ) {
    return DailyCheckin.findOneAndUpdate(
      {
        userId,
      },
      data,
      {
        returnDocument: "after",
      }
    );
  }

  async findAll() {
    return DailyCheckin.find()
      .populate(
        "userId",
        "fullName username email"
      )
      .sort({
        streak: -1,
        totalCheckins: -1,
      });
  }
}

export default new DailyCheckinRepository();