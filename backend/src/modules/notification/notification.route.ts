import { Router } from "express";

import notificationController from "./notification.controller";

import { auth } from "@/middleware/auth";
import { asyncHandler } from "@/shared/utils";
import { UserRole } from "@/shared/enums";

const router = Router();

// ======================
// User
// ======================

router.get(
  "/me",
  auth(),
  asyncHandler((req, res) =>
    notificationController.myNotifications(
      req,
      res
    )
  )
);

router.patch(
  "/:id/read",
  auth(),
  asyncHandler((req, res) =>
    notificationController.markAsRead(
      req,
      res
    )
  )
);

router.patch(
  "/read-all",
  auth(),
  asyncHandler((req, res) =>
    notificationController.markAllAsRead(
      req,
      res
    )
  )
);

// ======================
// Super Admin
router.post(
  "/admin/send",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    notificationController.sendNotification(
      req,
      res
    )
  )
);
// ======================

router.get(
  "/admin/all",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    notificationController.allNotifications(
      req,
      res
    )
  )
);

router.delete(
  "/admin/:id",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    notificationController.deleteNotification(
      req,
      res
    )
  )
);

export default router;