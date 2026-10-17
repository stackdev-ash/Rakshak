import express from "express";
import {
  createCheckoutSession,
  getCheckoutSessionStatus,
  getMyPayments,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-checkout-session", protect, createCheckoutSession);
router.get("/session/:sessionId", protect, getCheckoutSessionStatus);
router.get("/my-donations", protect, getMyPayments);

export default router;
