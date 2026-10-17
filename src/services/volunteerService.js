import api from "./api";

// Get volunteer profile
export const getVolunteerProfile = async () => {
  try {
    const response = await api.get("/volunteers/profile");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to fetch volunteer profile",
      }
    );
  }
};

// Update volunteer profile
export const updateVolunteerProfile = async (volunteerData) => {
  try {
    const response = await api.put(
      "/volunteers/profile",
      volunteerData
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to update volunteer profile",
      }
    );
  }
};

// Get nearby missions
export const getNearbyMissions = async (location) => {
  try {
    const response = await api.get("/volunteers/nearby-missions", {
      params: location,
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to fetch nearby missions",
      }
    );
  }
};

// Get all available missions
export const getAvailableMissions = async () => {
  try {
    const response = await api.get("/volunteers/missions");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to fetch missions",
      }
    );
  }
};

// Join a mission
export const joinMission = async (missionId) => {
  try {
    const response = await api.post(
      `/volunteers/missions/${missionId}/join`
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to join mission",
      }
    );
  }
};

// Leave a mission
export const leaveMission = async (missionId) => {
  try {
    const response = await api.post(
      `/volunteers/missions/${missionId}/leave`
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to leave mission",
      }
    );
  }
};

// Get volunteer's missions
export const getMyMissions = async () => {
  try {
    const response = await api.get("/volunteers/my-missions");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to fetch your missions",
      }
    );
  }
};

// Mark mission as completed
export const completeMission = async (missionId) => {
  try {
    const response = await api.post(
      `/volunteers/missions/${missionId}/complete`
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to complete mission",
      }
    );
  }
};