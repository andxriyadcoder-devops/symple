import { Types } from "mongoose";

import notificationRepository from "./notification.repository";

import { AppError } from "@/shared/errors/AppError";

export class NotificationService {
  async createNotification(
    userId: string,
    title: string,
    message: string,
    type = "SYSTEM"
  ) {
    return notificationRepository.create({
      userId: new Types.ObjectId(userId),
      title,
      message,
      type,
      isRead: false,
    });
  }

  async myNotifications(userId: string) {
    return notificationRepository.findByUser(userId);
  }

  async markAsRead(id: string) {
    const notification =
      await notificationRepository.findById(id);

    if (!notification) {
      throw new AppError(
        "Notification not found",
        404
      );
    }

    return notificationRepository.markAsRead(id);
  }

  async markAllAsRead(userId: string) {
    return notificationRepository.markAllAsRead(
      userId
    );
  }

  async allNotifications() {
    return notificationRepository.findAll();
  }

  async deleteNotification(id: string) {
    const notification =
      await notificationRepository.findById(id);

    if (!notification) {
      throw new AppError(
        "Notification not found",
        404
      );
    }

    return notificationRepository.delete(id);
  }
  async sendNotification(
      userId: string,
      title: string,
      message: string,
      type = "SYSTEM"
    ) {
      return notificationRepository.create({
        userId: new Types.ObjectId(userId),
        title,
        message,
        type,
        isRead: false,
      });
    }
}

export default new NotificationService();