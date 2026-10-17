import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../backend/.env"),
});

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing. Check backend/.env");
}

export const connectDB = async (uri = MONGO_URI) => {
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
    });

    console.log(
      `[RAKSHAK Database]: Connected to MongoDB at ${conn.connection.host}/${conn.connection.name}`
    );

    mongoose.connection.on("error", (err) => {
      console.error("[RAKSHAK Database Error]:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("[RAKSHAK Database]: Disconnected from MongoDB.");
    });

    return conn;
  } catch (error) {
    console.error(
      `[RAKSHAK Database]: Connection failed: ${error.message}`
    );
    throw error;
  }
};

export const closeDB = async () => {
  await mongoose.connection.close();
  console.log("[RAKSHAK Database]: Connection safely closed.");
};

export default connectDB;
