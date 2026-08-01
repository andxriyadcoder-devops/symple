import { Types } from "mongoose";

import taskRepository from "./task.repository";

export class TaskService {
  async createTask(
    title: string,
    description: string,
    reward: number,
    createdBy: string
  ) {
    return taskRepository.create({
      title,
      description,
      reward,
      createdBy: new Types.ObjectId(createdBy),
    });
  }

  async getAllTasks() {
    return taskRepository.findAll();
  }

  async getActiveTasks() {
    return taskRepository.findActive();
  }

  async getTaskById(id: string) {
    return taskRepository.findById(id);
  }

  async updateTask(
    id: string,
    data: {
      title?: string;
      description?: string;
      reward?: number;
      isActive?: boolean;
    }
  ) {
    return taskRepository.update(id, data);
  }

  async deleteTask(id: string) {
    return taskRepository.delete(id);
  }
}

export default new TaskService();