import { Types } from "mongoose";

import { Notification } from "./notification.model";
import { INotificationDocument } from "./notification.types";

export class NotificationRepository {
  async create(
    data: Partial<INotificationDocument>
  ) {
    return Notification.create(data);
  }

  async findByUser(userId: string) {
    return Notification.find({
      userId,
    }).sort({
      createdAt: -1,
    });
  }

  async findById(id: string) {
    return Notification.findById(id);
  }

  async markAsRead(id: string) {
    return Notification.findByIdAndUpdate(
      id,
      {
        isRead: true,
      },
      {
        new: true,
      }
    );
  }

  async markAllAsRead(userId: string) {
    return Notification.updateMany(
      {
        userId,
        isRead: false,
      },
      {
        isRead: true,
      }
    );
  }

  async delete(id: string) {
    return Notification.findByIdAndDelete(id);
  }

  async findAll() {
    return Notification.find()
      .populate(
        "userId",
        "fullName username email"
      )
      .sort({
        createdAt: -1,
      });
  }
}

export default new NotificationRepository();