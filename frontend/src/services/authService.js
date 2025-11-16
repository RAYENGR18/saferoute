// src/services/authService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const loginUser = async (username, password) => {
  const response = await axios.post(API_URL + "token/", { username, password });
  if (response.data.access) {
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
  }
  return response.data;
};

export const registerUser = async (username, password) => {
  const response = await axios.post(API_URL + "register/", { username, password });
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const getToken = () => localStorage.getItem("access");
export const isAuthenticated = () => !!getToken();
