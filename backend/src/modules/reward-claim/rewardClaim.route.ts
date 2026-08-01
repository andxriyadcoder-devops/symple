import { Router } from "express";

import rewardClaimController from "./rewardClaim.controller";

import { auth } from "@/middleware/auth";
import { asyncHandler } from "@/shared/utils";
import { UserRole } from "@/shared/enums";

const router = Router();

// ======================================
// User Routes
// ======================================

// Claim reward
router.post(
  "/:taskId",
  auth(),
  asyncHandler((req, res) =>
    rewardClaimController.claimReward(req, res)
  )
);

// My reward claims
router.get(
  "/me",
  auth(),
  asyncHandler((req, res) =>
    rewardClaimController.myClaims(req, res)
  )
);

// ======================================
// Super Admin Routes
// ======================================

// All reward claims
router.get(
  "/admin/all",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    rewardClaimController.allClaims(req, res)
  )
);

export default router;