import { Router } from "express";

import dailyCheckinController from "./dailyCheckin.controller";

import { auth } from "@/middleware/auth";
import { asyncHandler } from "@/shared/utils";
import { UserRole } from "@/shared/enums";

const router = Router();

// User Check-in
router.post(
  "/",
  auth(),
  asyncHandler((req, res) =>
    dailyCheckinController.checkin(req, res)
  )
);

// My Check-in Status
router.get(
  "/me",
  auth(),
  asyncHandler((req, res) =>
    dailyCheckinController.myCheckin(req, res)
  )
);

// Admin - All Check-ins
router.get(
  "/admin/all",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    dailyCheckinController.allCheckins(req, res)
  )
);

export default router;