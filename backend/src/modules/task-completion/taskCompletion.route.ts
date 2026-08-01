import { Router } from "express";

import taskCompletionController from "./taskCompletion.controller";

import { auth } from "@/middleware/auth";
import { asyncHandler } from "@/shared/utils";
import { UserRole } from "@/shared/enums";

const router = Router();

// ===============================
// User
// ===============================

// Complete Task
router.post(
  "/:taskId/complete",
  auth(),
  asyncHandler((req, res) =>
    taskCompletionController.completeTask(req, res)
  )
);

// My Completed Tasks
router.get(
  "/me",
  auth(),
  asyncHandler((req, res) =>
    taskCompletionController.myCompletedTasks(req, res)
  )
);

// ===============================
// Admin
// ===============================

router.get(
  "/admin/all",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    taskCompletionController.allCompletedTasks(req, res)
  )
);

export default router;