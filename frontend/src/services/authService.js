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
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// Récupérer les informations du profil de l'utilisateur
export const getUserProfile = async () => {
  const response = await axios.get(API_URL + "profile/", authHeaders());
  return response.data;
};

// Mettre à jour le profil de l'utilisateur
export const updateUserProfile = async (userData) => {
  const response = await axios.put(API_URL + "profile/", userData, authHeaders());
  return response.data;
};