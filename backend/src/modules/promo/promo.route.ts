import { Router } from "express";

import promoController from "./promo.controller";

import { auth } from "@/middleware/auth";
import { asyncHandler } from "@/shared/utils";
import { UserRole } from "@/shared/enums";

const router = Router();

// ======================================
// User Routes
// ======================================

// Get active promos
router.get(
  "/",
  auth(),
  asyncHandler((req, res) =>
    promoController.getActivePromos(req, res)
  )
);

// Claim promo
router.post(
  "/claim",
  auth(),
  asyncHandler((req, res) =>
    promoController.claimPromo(req, res)
  )
);

// ======================================
// Super Admin Routes
// ======================================

// Get all promos
router.get(
  "/admin/all",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    promoController.getAllPromos(req, res)
  )
);

// Create promo
router.post(
  "/admin",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    promoController.createPromo(req, res)
  )
);

// Update promo
router.patch(
  "/admin/:id",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    promoController.updatePromo(req, res)
  )
);

// Delete promo
router.delete(
  "/admin/:id",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    promoController.deletePromo(req, res)
  )
);

export default router;