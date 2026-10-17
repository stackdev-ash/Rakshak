import Karma from "../../database/models/Karma.js";
import User from "../../database/models/User.js";

const calculateTier = (points) => {
  if (points >= 2500) return { name: "RAKSHAK Apex Guardian", icon: "👑", nextThreshold: null };
  if (points >= 1500) return { name: "Platinum Saviour", icon: "💎", nextThreshold: 2500 };
  if (points >= 800) return { name: "Gold Benefactor", icon: "🥇", nextThreshold: 1500 };
  if (points >= 300) return { name: "Silver Champion", icon: "🥈", nextThreshold: 800 };
  return { name: "Bronze Contributor", icon: "🥉", nextThreshold: 300 };
};

// @desc    Get current user karma details
// @route   GET /api/karma/me
// @access  Private
export const getMyKarma = async (req, res) => {
  try {
    const points = req.user?.karmaPoints || 0;
    const tier = calculateTier(points);

    res.json({
      success: true,
      karmaPoints: points,
      tier: tier.name,
      tierIcon: tier.icon,
      nextThreshold: tier.nextThreshold,
      pointsNeeded: tier.nextThreshold ? Math.max(0, tier.nextThreshold - points) : 0,
      totalDonations: req.user?.donationsCount || 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch karma points",
    });
  }
};

// @desc    Get karma transaction history
// @route   GET /api/karma/history
// @access  Private
export const getKarmaHistory = async (req, res) => {
  try {
    const userId = req.user?._id;

    let history = await Karma.find({ user: userId }).sort({ createdAt: -1 });


    res.json({
      success: true,
      count: history.length,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch karma history",
    });
  }
};

// @desc    Get karma leaderboard
// @route   GET /api/karma/leaderboard
// @access  Public
export const getKarmaLeaderboard = async (req, res) => {
  try {
    const { role = "volunteers" } = req.query;
    const filterRole = role === "donors" ? "donor" : role === "ngos" ? "ngo" : "volunteer";

    let users = await User.find({ role: filterRole })
      .sort({ karmaPoints: -1 })
      .limit(10)
      .select("name role karmaPoints donationsCount missionsCompleted city");

    let formatted = users.map((u, i) => ({
      rank: i + 1,
      name: u.name,
      points: u.karmaPoints,
      missions: u.missionsCompleted || u.donationsCount || 0,
      city: u.city,
    }));

    res.json({
      success: true,
      leaderboard: formatted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch leaderboard",
    });
  }
};
