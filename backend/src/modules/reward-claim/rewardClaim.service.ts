import { Types } from "mongoose";

import rewardClaimRepository from "./rewardClaim.repository";

import taskService from "@/modules/task/task.service";
import taskCompletionService from "@/modules/task-completion/taskCompletion.service";

import { AppError } from "@/shared/errors/AppError";

export class RewardClaimService {
  async claimReward(
    userId: string,
    taskId: string
  ) {
    // Task exists?
    const task = await taskService.getTaskById(taskId);

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    // User completed task?
    const completed =
      await taskCompletionService.getMyCompletedTasks(
        userId
      );

    const isCompleted = completed.some(
      (item: any) =>
        item.taskId &&
        item.taskId._id.toString() === taskId
    );

    if (!isCompleted) {
      throw new AppError(
        "Complete task first",
        400
      );
    }

    // Already claimed?
    const alreadyClaimed =
      await rewardClaimRepository.findByUserAndTask(
        userId,
        taskId
      );

    if (alreadyClaimed) {
      throw new AppError(
        "Reward already claimed",
        400
      );
    }

    return rewardClaimRepository.create(
      new Types.ObjectId(userId),
      new Types.ObjectId(taskId),
      task.reward
    );
  }

  async myClaims(userId: string) {
  return rewardClaimRepository.findByUser(userId);
  }

  async allClaims() {
    return rewardClaimRepository.findAll();
  }
}

export default new RewardClaimService();