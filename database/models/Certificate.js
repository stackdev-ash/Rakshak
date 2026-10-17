import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      unique: true,
      default: () => "RK-CERT-" + Math.floor(100000 + Math.random() * 900000),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "RAKSHAK Exemplary Humanitarian Service",
    },
    type: {
      type: String,
      enum: ["Volunteering", "Food Rescue", "Disaster Relief", "Special Recognition"],
      default: "Food Rescue",
    },
    issuedDate: {
      type: String,
      default: () => new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    },
    issuedBy: {
      type: String,
      default: "RAKSHAK Humanitarian Foundation",
    },
    hoursContributed: {
      type: Number,
      default: 25,
    },
    mealsSaved: {
      type: Number,
      default: 150,
    },
    verificationCode: {
      type: String,
      default: () => "V-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
    },
  },
  {
    timestamps: true,
  }
);

const Certificate =
  mongoose.models.Certificate ||
  mongoose.model("Certificate", certificateSchema);

export default Certificate;
