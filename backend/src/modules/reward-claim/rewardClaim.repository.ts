import { Types } from "mongoose";

import { RewardClaim } from "./rewardClaim.model";

export class RewardClaimRepository {
  async create(
    userId: Types.ObjectId,
    taskId: Types.ObjectId,
    reward: number
  ) {
    return RewardClaim.create({
      userId,
      taskId,
      reward,
    });
  }

  async findByUserAndTask(
    userId: string,
    taskId: string
  ) {
    return RewardClaim.findOne({
      userId,
      taskId,
    });
  }

  async findByUser(userId: string) {
    return RewardClaim.find({
      userId,
    }).populate("taskId");
  }

  async findAll() {
    return RewardClaim.find()
      .populate("userId", "fullName username email")
      .populate("taskId");
  }
}

export default new RewardClaimRepository();