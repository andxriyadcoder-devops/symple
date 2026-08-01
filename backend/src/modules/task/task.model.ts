import { Schema, model } from "mongoose";
import { ITaskDocument } from "./task.types";

const TaskSchema = new Schema<ITaskDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    reward: {
      type: Number,
      required: true,
      min: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

TaskSchema.index({ isActive: 1 });
TaskSchema.index({ createdAt: -1 });

export const Task = model<ITaskDocument>(
  "Task",
  TaskSchema
);