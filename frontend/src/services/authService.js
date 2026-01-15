// src/services/authService.js
import api from "./api";

// ==========================
// AUTHENTIFICATION
// ==========================

export const loginUser = async (username, password) => {
  const response = await api.post("/api/token/", {
    username,
    password,
  });

  // Sauvegarde des tokens
  if (response.data.access && response.data.refresh) {
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
  }

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/api/register/", userData);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  // Optionnel : redirection centralisée
  window.location.href = "/login";
};

// ==========================
// UTILITAIRES
// ==========================

export const getToken = () => localStorage.getItem("access");

export const isAuthenticated = () => Boolean(getToken());

// ==========================
// PROFIL UTILISATEUR
// ==========================

export const getUserProfile = async () => {
  const response = await api.get("/api/profile/");
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await api.put("/api/profile/", userData);
  return response.data;
};
