import api from "./api";

export const createDisaster = async (disasterData) => {
  try {
    const response = await api.post("/disasters", disasterData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Unable to create disaster" };
  }
};

export const getActiveDisasters = async () => {
  try {
    const response = await api.get("/disasters");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Unable to fetch active disasters" };
  }
};

export const getDisasterById = async (disasterId) => {
  try {
    const response = await api.get(`/disasters/${disasterId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Unable to fetch disaster" };
  }
};

export const joinDisaster = async (disasterId) => {
  try {
    const response = await api.post(`/disasters/${disasterId}/join`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Unable to join disaster mission" };
  }
};

export const closeDisaster = async (disasterId) => {
  try {
    const response = await api.patch(`/disasters/${disasterId}/close`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Unable to close disaster" };
  }
};
