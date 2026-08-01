import { Response } from "express";

import taskService from "./task.service";
import { AuthRequest } from "@/middleware/auth";
import { sendResponse } from "@/shared/utils";

export class TaskController {
  async createTask(req: AuthRequest, res: Response) {
    const { title, description, reward } = req.body;

    const task = await taskService.createTask(
      title,
      description,
      reward,
      req.user!.id
    );

    return sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Task created successfully",
      data: task,
    });
  }

  async getAllTasks(_req: AuthRequest, res: Response) {
    const tasks = await taskService.getAllTasks();

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  }

  async getActiveTasks(_req: AuthRequest, res: Response) {
    const tasks = await taskService.getActiveTasks();

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Active tasks fetched successfully",
      data: tasks,
    });
  }

  async getTaskById(req: AuthRequest, res: Response) {
    const task = await taskService.getTaskById(
      String(req.params.id)
    );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Task fetched successfully",
      data: task,
    });
  }

  async updateTask(req: AuthRequest, res: Response) {
    const task = await taskService.updateTask(
      String(req.params.id),
      req.body
    );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Task updated successfully",
      data: task,
    });
  }

  async deleteTask(req: AuthRequest, res: Response) {
    await taskService.deleteTask(String(req.params.id));

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Task deleted successfully",
      data: null,
    });
  }
}

export default new TaskController();