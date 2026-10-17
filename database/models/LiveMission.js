import mongoose from "mongoose";

const checkpointSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: {
    type: String,
    enum: ["completed", "in-progress", "pending"],
    default: "pending",
  },
  timestamp: { type: String, default: "" },
  location: { type: String, default: "" },
});

const liveMissionSchema = new mongoose.Schema(
  {
    missionId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["food-rescue", "disaster-relief", "emergency-ration", "medical-aid"],
      default: "food-rescue",
    },
    status: {
      type: String,
      enum: ["Assigned", "En Route to Pickup", "Picked Up", "In Transit", "Delivered"],
      default: "In Transit",
    },
    urgency: {
      type: String,
      enum: ["Critical", "High", "Moderate", "Standard"],
      default: "High",
    },
    driver: {
      name: { type: String, default: "Vikram Rathore" },
      phone: { type: String, default: "+91 98110 54321" },
      vehicleType: { type: String, default: "Rescue Van (Temperature Controlled)" },
      vehicleNumber: { type: String, default: "DL 01 RK 2026" },
      currentSpeed: { type: Number, default: 42 }, // km/h
    },
    origin: {
      name: { type: String, required: true },
      address: { type: String, default: "" },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    destination: {
      name: { type: String, required: true },
      address: { type: String, default: "" },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    currentLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      heading: { type: Number, default: 45 },
      lastUpdated: { type: Date, default: Date.now },
    },
    routeWaypoints: [
      {
        type: [Number], // [lat, lng]
      },
    ],
    checkpoints: [checkpointSchema],
    telemetry: {
      etaMinutes: { type: Number, default: 12 },
      distanceRemainingKm: { type: Number, default: 3.4 },
      temperatureCelsius: { type: Number, default: 4.5 },
      hygieneVerified: { type: Boolean, default: true },
      batteryFuelLevel: { type: Number, default: 82 },
    },
    itemsSummary: {
      itemName: { type: String, default: "Surplus Cooked Meals" },
      quantity: { type: Number, default: 350 },
      unit: { type: String, default: "Meals" },
      donorName: { type: String, default: "Grand Palace Banquets" },
      recipientOrg: { type: String, default: "Yamuna Flood Relief Camp #3" },
    },
  },
  {
    timestamps: true,
  }
);

const LiveMission =
  mongoose.models.LiveMission ||
  mongoose.model("LiveMission", liveMissionSchema);

export default LiveMission;
