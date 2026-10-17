import mongoose from "mongoose";

const helpRequestSchema = new mongoose.Schema(
  {
    disaster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Disaster",
      required: true,
    },
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requesterName: { type: String, required: true, trim: true },
    phone: { type: String, default: "", trim: true },
    location: { type: String, required: true, trim: true },
    helpType: {
      type: [String],
      enum: ["Food", "Medicine", "Rescue", "Shelter", "Other"],
      default: ["Food"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    peopleCount: {
      type: Number,
      min: 1,
      default: 1,
    },
    status: {
      type: String,
      enum: ["Pending", "Assigned", "Completed", "Cancelled"],
      default: "Pending",
    },
    assignedVolunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    assignedAt: {
      type: Date,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const HelpRequest =
  mongoose.models.HelpRequest ||
  mongoose.model("HelpRequest", helpRequestSchema);

export default HelpRequest;
