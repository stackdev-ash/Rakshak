import mongoose from "mongoose";

const disasterSchema = new mongoose.Schema(
  {
    disasterId: {
      type: String,
      unique: true,
      default: () => `DIS-${Date.now().toString().slice(-8)}`,
    },
    title: {
      type: String,
      required: [true, "Disaster title is required"],
      trim: true,
    },
    type: {
      type: String,
      default: "Emergency Relief",
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    city: {
      type: String,
      default: "",
      trim: true,
    },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    urgency: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "High",
    },
    peopleAffected: {
      type: String,
      default: "0",
      trim: true,
    },
    volunteersNeeded: {
      type: Number,
      min: 1,
      default: 10,
    },
    volunteersJoined: {
      type: Number,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Resolved", "Paused"],
      default: "Active",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    requirements: {
      type: [String],
      default: [],
    },
    contact: {
      type: String,
      default: "",
      trim: true,
    },
    assignedVolunteers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Disaster =
  mongoose.models.Disaster || mongoose.model("Disaster", disasterSchema);

export default Disaster;
