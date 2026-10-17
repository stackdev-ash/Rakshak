import api from "./api";

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Registration failed",
      }
    );
  }
};

// Login user
export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/auth/login", loginData);

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Login failed",
      }
    );
  }
};

// Get current logged-in user
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to fetch user",
      }
    );
  }
};

// Update profile fields (including media/press consent preferences)
export const updateProfile = async (profileData) => {
  try {
    const response = await api.put("/auth/profile", profileData);

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to update profile",
      }
    );
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Logout failed",
      }
    );
  }
};