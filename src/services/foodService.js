import api from "./api";

// Create food donation
export const createFoodDonation = async (foodData) => {
  try {
    const response = await api.post("/food/donate", foodData);

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Food donation failed",
      }
    );
  }
};

// Get all food donations
export const getFoodDonations = async () => {
  try {
    const response = await api.get("/food");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to fetch food donations",
      }
    );
  }
};

// Get my food donations
export const getMyFoodDonations = async () => {
  try {
    const response = await api.get("/food/my-donations");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to fetch your donations",
      }
    );
  }
};

// Get single food donation
export const getFoodDonationById = async (id) => {
  try {
    const response = await api.get(`/food/${id}`);

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to fetch donation",
      }
    );
  }
};

// Update food donation
export const updateFoodDonation = async (id, foodData) => {
  try {
    const response = await api.patch(`/food/${id}/status`, foodData);

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to update donation",
      }
    );
  }
};

// Delete food donation
export const deleteFoodDonation = async (id) => {
  try {
    const response = await api.delete(`/food/${id}`);

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to delete donation",
      }
    );
  }
};