import { Router } from "express";

import paymentController from "./payment.controller";

import { auth } from "@/middleware/auth";
import { asyncHandler } from "@/shared/utils";
import { UserRole } from "@/shared/enums";
import { AuthRequest } from "@/middleware/auth";

const router = Router();

// =====================
// User
// =====================

router.post(
  "/deposit",
  auth(),
  asyncHandler((req, res) =>
    paymentController.createDeposit(req, res)
  )
);

router.post(
  "/withdraw",
  auth(),
  asyncHandler((req, res) =>
    paymentController.createWithdraw(req, res)
  )
);

router.get(
  "/me",
  auth(),
  asyncHandler((req, res) =>
    paymentController.myPayments(req, res)
  )
);

// =====================
// Super Admin
// =====================

router.get(
  "/admin/all",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    paymentController.allPayments(req, res)
  )
);

router.patch(
  "/admin/:id/approve",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    paymentController.approvePayment(req, res)
  )
);

router.patch(
  "/admin/:id/reject",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    paymentController.rejectPayment(req, res)
  )
);


router.get(
  "/success",
  asyncHandler((req, res) =>
    paymentController.paymentSuccess(req as any, res)
  )
);

router.get(
  "/fail",
  asyncHandler((req, res) =>
    paymentController.paymentFail(req as any, res)
  )
);

router.get(
  "/cancel",
  asyncHandler((req, res) =>
    paymentController.paymentCancel(req as any, res)
  )
);

export default router;