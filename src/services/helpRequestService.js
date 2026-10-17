import api from "./api";

export const createHelpRequest = async (data) => {
  try {
    const response = await api.post("/help-requests", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Unable to send help request" };
  }
};

export const getPendingHelpRequests = async () => {
  try {
    const response = await api.get("/help-requests/pending");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Unable to fetch help requests" };
  }
};

export const getAllHelpRequests = async () => {
  try {
    const response = await api.get("/help-requests");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Unable to fetch help requests" };
  }
};

export const acceptHelpRequest = async (id) => {
  try {
    const response = await api.post(`/help-requests/${id}/accept`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Unable to accept help request" };
  }
};

export const completeHelpRequest = async (id) => {
  try {
    const response = await api.patch(`/help-requests/${id}/complete`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Unable to complete help request" };
  }
};
