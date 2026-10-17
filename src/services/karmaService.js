import api from "./api";

// Get my karma details
export const getMyKarma = async () => {
  try {
    const response = await api.get("/karma/me");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to fetch karma points",
      }
    );
  }
};

// Get karma transaction/history
export const getKarmaHistory = async () => {
  try {
    const response = await api.get("/karma/history");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to fetch karma history",
      }
    );
  }
};

// Get leaderboard
export const getKarmaLeaderboard = async () => {
  try {
    const response = await api.get("/karma/leaderboard");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to fetch leaderboard",
      }
    );
  }
};