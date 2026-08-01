import { Types } from "mongoose";

import { Referral } from "./referral.model";

export class ReferralRepository {
  async create(
    referrerId: Types.ObjectId,
    referredUserId: Types.ObjectId,
    reward: number
  ) {
    return Referral.create({
      referrerId,
      referredUserId,
      reward,
    });
  }

  async findByReferrer(referrerId: string) {
    return Referral.find({
      referrerId,
    }).populate(
      "referredUserId",
      "fullName username email"
    );
  }

  async findByReferredUser(
    referredUserId: string
  ) {
    return Referral.findOne({
      referredUserId,
    });
  }

  async getTotalReward(referrerId: string) {
    const result = await Referral.aggregate([
      {
        $match: {
          referrerId: new Types.ObjectId(referrerId),
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$reward",
          },
        },
      },
    ]);

    return result.length > 0 ? result[0].total : 0;
  }

  async findAll() {
    return Referral.find()
      .populate(
        "referrerId",
        "fullName username email"
      )
      .populate(
        "referredUserId",
        "fullName username email"
      )
      .sort({
        createdAt: -1,
      });
  }
}

export default new ReferralRepository();