import express from "express";
import {
  createHelpRequest,
  getPendingHelpRequests,
  getAllHelpRequests,
  acceptHelpRequest,
  completeHelpRequest,
} from "../controllers/helpRequestController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("donor", "volunteer", "ngo", "admin"),
  createHelpRequest
);

router.get(
  "/pending",
  protect,
  authorize("volunteer", "admin"),
  getPendingHelpRequests
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllHelpRequests
);

router.post(
  "/:id/accept",
  protect,
  authorize("volunteer"),
  acceptHelpRequest
);

router.patch(
  "/:id/complete",
  protect,
  authorize("volunteer", "admin"),
  completeHelpRequest
);

export default router;
