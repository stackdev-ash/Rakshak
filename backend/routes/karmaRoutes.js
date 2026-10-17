import express from "express";
import {
  getMyKarma,
  getKarmaHistory,
  getKarmaLeaderboard,
} from "../controllers/karmaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMyKarma);
router.get("/history", protect, getKarmaHistory);
router.get("/leaderboard", getKarmaLeaderboard);

export default router;
