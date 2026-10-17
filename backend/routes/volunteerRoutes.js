import express from "express";
import {
  getVolunteerProfile,
  updateVolunteerProfile,
  getNearbyMissions,
  applyVolunteer,
} from "../controllers/volunteerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getVolunteerProfile);
router.put("/profile", protect, updateVolunteerProfile);
router.get("/nearby-missions", getNearbyMissions);
router.post("/apply", applyVolunteer);

export default router;
