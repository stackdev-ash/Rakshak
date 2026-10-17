import api from "./api";

export const createPaymentOrder = async (paymentData) => {
  try {
    const response = await api.post(
      "/payments/create-checkout-session",
      paymentData
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to create Stripe checkout session",
      }
    );
  }
};

export const getCheckoutSessionStatus = async (sessionId) => {
  try {
    const response = await api.get(
      `/payments/session/${sessionId}`
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to get payment status",
      }
    );
  }
};

export const getPaymentHistory = async () => {
  try {
    const response = await api.get(
      "/payments/my-donations"
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to fetch payment history",
      }
    );
  }
};