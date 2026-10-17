import mongoose from "mongoose";

const mediaReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, required: true, trim: true, maxlength: 3000 },
  location: { type: String, required: true, trim: true, maxlength: 300 },
  media: {
    dataUrl: { type: String, required: true },
    mimeType: { type: String, required: true, enum: ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm"] },
    originalName: { type: String, default: "" },
  },
  shareToNews: { type: Boolean, default: false },
  displayNamePreference: { type: String, enum: ["fullName", "firstNameOnly", "anonymous"], default: "anonymous" },
  status: { type: String, enum: ["pending", "approved", "rejected", "delivery_failed", "sent"], default: "pending" },
  rejectionReason: { type: String, default: "" },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviewedAt: Date,
  deliveredAt: Date,
  deliveryError: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.models.MediaReport || mongoose.model("MediaReport", mediaReportSchema);
