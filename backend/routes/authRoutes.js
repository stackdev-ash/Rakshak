import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  promoteToAdmin,
} from "../controllers/authController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);
router.put("/promote/:userId", protect, authorize("admin"), promoteToAdmin);

export default router;
