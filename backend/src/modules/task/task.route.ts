import { Router } from "express";

import taskController from "./task.controller";
import { auth } from "@/middleware/auth";
import { asyncHandler } from "@/shared/utils";
import { UserRole } from "@/shared/enums";

const router = Router();

// ======================================
// User Routes
// ======================================

// Get all active tasks
router.get(
  "/",
  auth(),
  asyncHandler((req, res) =>
    taskController.getActiveTasks(req, res)
  )
);

// Get single task
router.get(
  "/:id",
  auth(),
  asyncHandler((req, res) =>
    taskController.getTaskById(req, res)
  )
);

// ======================================
// Super Admin Routes
// ======================================

// Get all tasks
router.get(
  "/admin/all",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    taskController.getAllTasks(req, res)
  )
);

// Create task
router.post(
  "/admin",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    taskController.createTask(req, res)
  )
);

// Update task
router.patch(
  "/admin/:id",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    taskController.updateTask(req, res)
  )
);

// Delete task
router.delete(
  "/admin/:id",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    taskController.deleteTask(req, res)
  )
);

export default router;