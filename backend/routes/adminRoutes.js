import express from "express";
import { getUsers, verifyUser } from "../controllers/adminController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/users", protect, authorize("admin"), getUsers);
router.patch("/users/:id/verify", protect, authorize("admin"), verifyUser);
export default router;
