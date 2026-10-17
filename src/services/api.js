import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  try {
    const user = JSON.parse(localStorage.getItem("rakshak_user") || "null");
    if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  } catch { localStorage.removeItem("rakshak_user"); }
  return config;
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) localStorage.removeItem("rakshak_user");
  return Promise.reject(error);
});
export default api;
