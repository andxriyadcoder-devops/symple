import { Types } from "mongoose";

import { TaskCompletion } from "./taskCompletion.model";

export class TaskCompletionRepository {
  async create(
    userId: Types.ObjectId,
    taskId: Types.ObjectId,
    reward: number
  ) {
    return TaskCompletion.create({
      userId,
      taskId,
      reward,
    });
  }

  async findByUserAndTask(
    userId: string,
    taskId: string
  ) {
    return TaskCompletion.findOne({
      userId,
      taskId,
    });
  }

  async findByUser(userId: string) {
    return TaskCompletion.find({
      userId,
    }).populate("taskId");
  }

  async findAll() {
    return TaskCompletion.find()
      .populate("userId", "fullName username email")
      .populate("taskId")
      .sort({
        createdAt: -1,
      });
  }
}

export default new TaskCompletionRepository();