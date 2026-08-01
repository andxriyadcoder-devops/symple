import { Router } from "express";

import dashboardController from "./dashboard.controller";
import { auth } from "@/middleware/auth";

const router = Router();

router.get(
  "/",
  auth(),
  dashboardController.getDashboard
);

export default router;