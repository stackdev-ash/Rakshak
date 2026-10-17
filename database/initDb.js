import connectDB, { closeDB } from "./connection.js";
import User from "./models/User.js";
import FoodDonation from "./models/FoodDonation.js";
import Disaster from "./models/Disaster.js";
import LiveMission from "./models/LiveMission.js";

export const initDb = async () => {
  console.log("[RAKSHAK Database Init]: Checking database status...");
  const conn = await connectDB();
  if (!conn) {
    console.error("[RAKSHAK Database Init]: Database connection unavailable.");
    return false;
  }

  const usersCount = await User.countDocuments();
  const donationsCount = await FoodDonation.countDocuments();
  const disastersCount = await Disaster.countDocuments();
  const missionsCount = await LiveMission.countDocuments();

  console.log(`[RAKSHAK Database Status]:
  - Users: ${usersCount}
  - Food Donations: ${donationsCount}
  - Disaster Relief Operations: ${disastersCount}
  - Active Live Tracking Missions: ${missionsCount}
  `);

  return true;
};

if (process.argv[1]?.endsWith("initDb.js")) {
  initDb().then(() => closeDB());
}

export default initDb;
