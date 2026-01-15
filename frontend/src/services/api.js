import axios from "axios";
import { getToken, logoutUser } from "./authService";

const API_URL =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
