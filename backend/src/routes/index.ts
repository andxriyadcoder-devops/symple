import { Router } from "express";

import authRoutes from "@/modules/auth/auth.route";
import walletRoutes from "@/modules/wallet/wallet.route";
import transactionRoutes from "@/modules/transaction/transaction.route";
import adminRoutes from "@/modules/admin/admin.route";
import taskRoutes from "@/modules/task/task.route";
import taskCompletionRoutes from "@/modules/task-completion/taskCompletion.route";
import rewardClaimRoutes from "@/modules/reward-claim/rewardClaim.route";
import referralRoutes from "@/modules/referral/referral.route";
import promoRoutes from "@/modules/promo/promo.route";
import leaderboardRoutes from "@/modules/leaderboard/leaderboard.route";
import dailyCheckinRoutes from "@/modules/daily-checkin/dailyCheckin.route";
import achievementRoutes from "@/modules/achievement/achievement.route";
import notificationRoutes from "@/modules/notification/notification.route";
import paymentRoutes from "@/modules/payment/payment.route";
import { dashboardRoutes } from "@/modules/dashboard";

const router = Router();

router.use("/auth", authRoutes);
router.use("/wallet", walletRoutes);
router.use("/transactions", transactionRoutes);
router.use("/admin", adminRoutes);
router.use("/tasks", taskRoutes);
router.use("/task-completions", taskCompletionRoutes);
router.use("/reward-claims", rewardClaimRoutes);
router.use("/referrals", referralRoutes);
router.use("/promos", promoRoutes);
router.use("/leaderboard", leaderboardRoutes);
router.use("/daily-checkins", dailyCheckinRoutes);
router.use("/achievements", achievementRoutes);
router.use("/notifications", notificationRoutes);
router.use("/payments", paymentRoutes);
router.use("/dashboard", dashboardRoutes);


router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Symple API v1 Running",
  });
});

export default router;