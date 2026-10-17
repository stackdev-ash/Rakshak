import mongoose from "mongoose";

const karmaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Karma title is required"],
    },
    description: {
      type: String,
      default: "Contribution to RAKSHAK community relief mission.",
    },
    points: {
      type: Number,
      required: true,
      default: 50,
    },
    type: {
      type: String,
      enum: ["Donation", "Volunteer", "Disaster", "Bonus", "Redemption"],
      default: "Donation",
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    },
  },
  {
    timestamps: true,
  }
);

const Karma = mongoose.models.Karma || mongoose.model("Karma", karmaSchema);
export default Karma;
