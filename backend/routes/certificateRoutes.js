import express from "express";
import {
  getMyCertificates,
  getCertificateById,
  downloadCertificatePDF,
} from "../controllers/certificateController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my-certificates", protect, getMyCertificates);
router.get("/:id", protect, getCertificateById);
router.get("/:id/download", protect, downloadCertificatePDF);

export default router;
