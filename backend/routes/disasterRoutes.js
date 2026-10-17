import express from "express";
import {
  createDisaster,
  getActiveDisasters,
  getDisasterById,
  joinDisaster,
  closeDisaster,
} from "../controllers/disasterController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getActiveDisasters);
router.post("/", protect, authorize("admin"), createDisaster);
router.get("/active", getActiveDisasters);
router.patch("/:id/close", protect, authorize("admin"), closeDisaster);
router.get("/:id", getDisasterById);
router.post("/:id/join", protect, authorize("volunteer"), joinDisaster);

export default router;
