import axios from "axios";
import { getToken, logoutUser } from "./authService";

// ✅ CRA utilise REACT_APP_
const API_URL =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

console.log("API_URL =", API_URL); // DEBUG

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =======================
// Request interceptor
// =======================
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =======================
// Response interceptor
// =======================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logoutUser();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
