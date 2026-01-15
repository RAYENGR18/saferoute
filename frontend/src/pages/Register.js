import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    country: "",
    city: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      await api.post("/api/register/", formData);

      setMessage("Compte créé avec succès ! Redirection vers la connexion...");
      setTimeout(() => navigate("/login"), 1800);
    } catch (error) {
      const errMsg =
        error.response?.data?.error ||
        error.response?.data?.username?.[0] ||
        error.response?.data?.password?.[0] ||
        "Inscription impossible. Vérifiez vos données.";

      setMessage("Erreur : " + errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center px-4 py-12 mt-10">
      {/* Décorations floues */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-10 -right-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse delay-700"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-xl mb-6">
              <span className="text-4xl">🚑</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              SafeRoute
            </h1>
            <p className="text-xl text-gray-600 mt-3">
              Créer votre compte sécurisé
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-300"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nom d'utilisateur"
                required
                className="w-full px-5 py-3.5 rounded-xl border border-gray-300"
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                required
                className="w-full px-5 py-3.5 rounded-xl border border-gray-300"
              />

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Pays"
                required
                className="w-full px-5 py-3.5 rounded-xl border border-gray-300"
              />

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Ville"
                required
                className="w-full px-5 py-3.5 rounded-xl border border-gray-300"
              />
            </div>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Téléphone"
              className="w-full px-5 py-3.5 rounded-xl border border-gray-300"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-6 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500"
            >
              {isLoading ? "Création..." : "S'inscrire gratuitement"}
            </button>
          </form>

          {message && (
            <div className="mt-6 text-center font-medium">
              {message}
            </div>
          )}

          <p className="text-center mt-8 text-gray-600">
            Déjà un compte ?{" "}
            <a href="/login" className="font-bold text-emerald-600">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
