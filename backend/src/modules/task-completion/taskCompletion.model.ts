import { Schema, model } from "mongoose";
import { ITaskCompletionDocument } from "./taskCompletion.types";

const TaskCompletionSchema =
  new Schema<ITaskCompletionDocument>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      taskId: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true,
        index: true,
      },

      reward: {
        type: Number,
        required: true,
        default: 0,
      },

      completedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

TaskCompletionSchema.index(
  {
    userId: 1,
    taskId: 1,
  },
  {
    unique: true,
  }
);

export const TaskCompletion = model<ITaskCompletionDocument>(
  "TaskCompletion",
  TaskCompletionSchema
);