import { Types } from "mongoose";

import taskCompletionRepository from "./taskCompletion.repository";

import taskService from "@/modules/task/task.service";
import walletService from "@/modules/wallet/wallet.service";
import transactionService from "@/modules/transaction/transaction.service";

import { AppError } from "@/shared/errors/AppError";
import { TransactionType } from "@/shared/enums";
import achievementService from "@/modules/achievement/achievement.service";

export class TaskCompletionService {
  async completeTask(
    userId: string,
    taskId: string
  ) {
    const alreadyCompleted =
      await taskCompletionRepository.findByUserAndTask(
        userId,
        taskId
      );

    if (alreadyCompleted) {
      throw new AppError(
        "Task already completed",
        400
      );
    }

    const task = await taskService.getTaskById(taskId);

    if (!task) {
      throw new AppError(
        "Task not found",
        404
      );
    }

    if (!task.isActive) {
      throw new AppError(
        "Task is inactive",
        400
      );
    }

    const wallet =
      await walletService.getWalletByUserObjectId(userId);

    if (!wallet) {
      throw new AppError(
        "Wallet not found",
        404
      );
    }

    await walletService.addCoin(
      wallet._id.toString(),
      task.reward
    );

    await transactionService.createTransfer(
      wallet.userId,
      wallet._id,
      task.reward,
      TransactionType.TASK_REWARD,
      `Task Reward: ${task.title}`
    );

  const completedTasks =
    await taskCompletionRepository.findByUser(userId);

    if (completedTasks.length === 0) {
      await achievementService.unlockAchievement(
          userId,
          "FIRST_TASK",
          "First Task Completed",
          "Completed your first task.",
          30,
          20
        );
        }
        if (completedTasks.length + 1 >= 10) {
      await achievementService.unlockAchievement(
        userId,
        "TASK_MASTER",
        "Task Master",
        "Completed 10 tasks.",
        200,
        100
      );
    }
    return taskCompletionRepository.create(
      new Types.ObjectId(userId),
      new Types.ObjectId(taskId),
      task.reward
    );
  }

    async getMyCompletedTasks(userId: string) {
    return taskCompletionRepository.findByUser(userId);
  }

  async getAllCompletedTasks() {
    return taskCompletionRepository.findAll();
  }
}

export default new TaskCompletionService();