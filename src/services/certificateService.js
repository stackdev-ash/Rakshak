import api from "./api";

// Get all certificates of logged-in user
export const getMyCertificates = async () => {
  try {
    const response = await api.get("/certificates/my-certificates");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to fetch certificates",
      }
    );
  }
};

// Get a single certificate
export const getCertificateById = async (certificateId) => {
  try {
    const response = await api.get(
      `/certificates/${certificateId}`
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to fetch certificate",
      }
    );
  }
};

// Generate certificate
export const generateCertificate = async (data) => {
  try {
    const response = await api.post(
      "/certificates/generate",
      data
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to generate certificate",
      }
    );
  }
};

// Download certificate PDF
export const downloadCertificate = async (certificateId) => {
  try {
    const response = await api.get(
      `/certificates/${certificateId}/download`,
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data], {
        type: "application/pdf",
      })
    );

    const link = document.createElement("a");

    link.href = url;
    link.download = `RAKSHAK-Certificate-${certificateId}.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to download certificate",
      }
    );
  }
};

// Verify certificate
export const verifyCertificate = async (certificateId) => {
  try {
    const response = await api.get(
      `/certificates/verify/${certificateId}`
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to verify certificate",
      }
    );
  }
};