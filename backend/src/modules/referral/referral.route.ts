import { Router } from "express";

import referralController from "./referral.controller";

import { auth } from "@/middleware/auth";
import { asyncHandler } from "@/shared/utils";
import { UserRole } from "@/shared/enums";

const router = Router();

// ======================================
// User Routes
// ======================================

// My Referrals
router.get(
  "/me",
  auth(),
  asyncHandler((req, res) =>
    referralController.myReferrals(req, res)
  )
);

// Referral Stats
router.get(
  "/stats",
  auth(),
  asyncHandler((req, res) =>
    referralController.referralStats(req, res)
  )
);

// ======================================
// Super Admin Routes
// ======================================

// All Referrals
router.get(
  "/admin/all",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    referralController.allReferrals(req, res)
  )
);

export default router;