import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "../database/connection.js";
import ENV from "./config/env.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import disasterRoutes from "./routes/disasterRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import karmaRoutes from "./routes/karmaRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import helpRequestRoutes from "./routes/helpRequestRoutes.js";

// Middlewares
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Connect to RAKSHAK Database
const app = express();

// Middlewares
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

if (ENV.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API Health Check
app.get("/", (req, res) => {
  res.json({
    platform: "RAKSHAK REST API",
    tagline: "Disaster Relief, Food Rescue & Real-Time Tracking Network",
    version: "2.0.0",
    status: "Active & Healthy",
    docs: "/api/health",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    platform: "RAKSHAK",
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    services: {
      auth: "active",
      foodDonations: "active",
      disasters: "active",
      realTimeTracking: "active",
      volunteers: "active",
      karma: "active",
      certificates: "active",
      payments: "active",
    },
  });
});

// Register API Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/disasters", disasterRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/karma", karmaRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/help-requests", helpRequestRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = ENV.PORT;

const start = async () => {
  await connectDB(ENV.MONGO_URI);
  const server = app.listen(PORT, () => {
    console.log(`RAKSHAK API listening on http://localhost:${PORT}`);
  });
  return server;
};

if (process.env.NODE_ENV !== "test") start().catch((error) => {
  console.error("Unable to start RAKSHAK API:", error);
  process.exit(1);
});

export default app;
