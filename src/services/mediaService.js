import api from "./api";
export const createMediaReport = async (payload) => (await api.post("/media/reports", payload)).data;
export const getMyMediaReports = async () => (await api.get("/media/my-reports")).data;
export const getPendingMediaReports = async () => (await api.get("/media/pending")).data;
export const reviewMediaReport = async (id, status, rejectionReason = "") => (await api.patch(`/media/${id}/review`, { status, rejectionReason })).data;
