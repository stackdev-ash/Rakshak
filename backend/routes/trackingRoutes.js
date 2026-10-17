import express from "express";
import {
  getLiveMissions,
  getMissionById,
  updateMissionTelemetry,
  createLiveMission,
} from "../controllers/trackingController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all active missions for map radar
router.get("/missions", getLiveMissions);

// GET single mission details, waypoints, telemetry
router.get("/mission/:id", getMissionById);

// PATCH telemetry (real-time coordinates, speed, ETA)
router.patch("/mission/:id/telemetry", protect, authorize("volunteer", "admin", "ngo"), updateMissionTelemetry);

// POST dispatch new live mission
router.post("/mission", protect, authorize("admin", "ngo"), createLiveMission);

export default router;
