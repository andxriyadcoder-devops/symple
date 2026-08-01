import { Response } from "express";

import notificationService from "./notification.service";

import { AuthRequest } from "@/middleware/auth";
import { sendResponse } from "@/shared/utils";

export class NotificationController {
  async myNotifications(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await notificationService.myNotifications(
        req.user!.id
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Notifications fetched successfully",
      data,
    });
  }

  async markAsRead(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await notificationService.markAsRead(
        String(req.params.id)
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Notification marked as read",
      data,
    });
  }

  async markAllAsRead(
    req: AuthRequest,
    res: Response
  ) {
    const data =
      await notificationService.markAllAsRead(
        req.user!.id
      );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All notifications marked as read",
      data,
    });
  }

  async allNotifications(
    _req: AuthRequest,
    res: Response
  ) {
    const data =
      await notificationService.allNotifications();

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All notifications fetched successfully",
      data,
    });
  }

  async deleteNotification(
    req: AuthRequest,
    res: Response
  ) {
    await notificationService.deleteNotification(
      String(req.params.id)
    );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Notification deleted successfully",
      data: null,
    });
  }
  async sendNotification(
    req: AuthRequest,
    res: Response){
    const { userId, title, message, type } =
      req.body;

    const data =
      await notificationService.sendNotification(
        userId,
        title,
        message,
        type
      );

    return sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Notification sent successfully",
      data,
    });
  }
}

export default new NotificationController();