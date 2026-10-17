import mongoose from "mongoose";

const foodDonationSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: [true, "Food name is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["cooked-food", "packaged", "raw-grains", "bakery", "dairy", "fruits-veg", "other"],
      default: "cooked-food",
    },
    quantity: {
      type: String,
      required: [true, "Quantity is required"],
    },
    unit: {
      type: String,
      default: "Meals",
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    donorName: {
      type: String,
      default: "",
    },
    donorPhone: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: [true, "Pickup location is required"],
    },
    city: {
      type: String,
      default: "",
    },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    expiryDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "In Transit", "Delivered", "Cancelled"],
      default: "Pending",
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    acceptedByName: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    missionId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const FoodDonation =
  mongoose.models.FoodDonation ||
  mongoose.model("FoodDonation", foodDonationSchema);

export default FoodDonation;
