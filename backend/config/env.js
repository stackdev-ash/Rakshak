import dotenv from "dotenv";

dotenv.config();

const required = ["JWT_SECRET", "MONGO_URI"];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`${key} is required in backend/.env`);
  }
}

export const ENV = {
  PORT: Number(process.env.PORT || 5000),
  NODE_ENV: process.env.NODE_ENV || "development",

  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

  // Stripe
  STRIPE_API_KEY: process.env.STRIPE_API_KEY || "",
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "",

  NEWS_WEBHOOK_URL: process.env.NEWS_WEBHOOK_URL || "",
};

export default ENV;