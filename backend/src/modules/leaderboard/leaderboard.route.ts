import { Router } from "express";

import leaderboardController from "./leaderboard.controller";

import { auth } from "@/middleware/auth";
import { asyncHandler } from "@/shared/utils";

const router = Router();

// ======================================
// User Routes
// ======================================

// My Rank
router.get(
  "/me",
  auth(),
  asyncHandler((req, res) =>
    leaderboardController.myRank(req, res)
  )
);

// Global Leaderboard
router.get(
  "/global",
  auth(),
  asyncHandler((req, res) =>
    leaderboardController.globalLeaderboard(req, res)
  )
);

// Country Leaderboard
router.get(
  "/country",
  auth(),
  asyncHandler((req, res) =>
    leaderboardController.countryLeaderboard(req, res)
  )
);

export default router;