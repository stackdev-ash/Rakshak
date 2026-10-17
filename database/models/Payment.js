import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      unique: true,
      default: () => "TXN-RK-" + Date.now(),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    donorName: {
      type: String,
      required: true,
      default: "Anonymous Supporter",
    },
    donorEmail: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    purpose: {
      type: String,
      enum: ["Disaster Relief Fund", "Emergency Food Kits", "Cold-Chain Logistics", "General Relief"],
      default: "Emergency Food Kits",
    },
    disasterId: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Success", "Pending", "Failed"],
      default: "Success",
    },
    paymentMethod: {
      type: String,
      default: "UPI / Net Banking",
    },
  },
  {
    timestamps: true,
  }
);

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
