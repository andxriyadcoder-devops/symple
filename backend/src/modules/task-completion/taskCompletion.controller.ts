import { Response } from "express";

import taskCompletionService from "./taskCompletion.service";

import { AuthRequest } from "@/middleware/auth";
import { sendResponse } from "@/shared/utils";

export class TaskCompletionController {
  async completeTask(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await taskCompletionService.completeTask(
        req.user!.id,
        String(req.params.taskId)
      );

    return sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Task completed successfully",
      data,
    });
  }

  async myCompletedTasks(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await taskCompletionService.getMyCompletedTasks(
        req.user!.id
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Completed tasks fetched successfully",
      data,
    });
  }

    async allCompletedTasks(
    _req: AuthRequest,
    res: Response
  ) {
    const data =
      await taskCompletionService.getAllCompletedTasks();

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All completed tasks fetched successfully",
      data,
    });
  }
}

export default new TaskCompletionController();