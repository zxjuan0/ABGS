import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (import.meta.env.DEV) {
      console.error("API Error:", err.message);
    }
    return Promise.reject(err);
  }
);

export default api;

export const getPrediction = (payload) =>
  api.post("/predict", payload).then((r) => r.data);

export const getGoals = () =>
  api.get("/goals").then((r) => r.data);

export const logCheckIn = (goalId) =>
  api.post(`/checkin/${goalId}`).then((r) => r.data);