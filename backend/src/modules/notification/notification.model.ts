import { Schema, model } from "mongoose";

import { INotificationDocument } from "./notification.types";

const NotificationSchema =
  new Schema<INotificationDocument>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        default: "SYSTEM",
      },

      isRead: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

export const Notification =
  model<INotificationDocument>(
    "Notification",
    NotificationSchema
  );