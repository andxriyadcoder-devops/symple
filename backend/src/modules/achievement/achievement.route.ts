import { Router } from "express";

import achievementController from "./achievement.controller";

import { auth } from "@/middleware/auth";
import { asyncHandler } from "@/shared/utils";
import { UserRole } from "@/shared/enums";

const router = Router();

// =========================
// User
// =========================

router.get(
  "/me",
  auth(),
  asyncHandler((req, res) =>
    achievementController.myAchievements(
      req,
      res
    )
  )
);

// =========================
// Super Admin
// =========================

router.get(
  "/admin/all",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    achievementController.allAchievements(
      req,
      res
    )
  )
);

router.delete(
  "/admin/:id",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    achievementController.deleteAchievement(
      req,
      res
    )
  )
);

export default router;