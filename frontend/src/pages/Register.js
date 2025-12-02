import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name:"",
    last_name:"",
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
      await axios.post("http://127.0.0.1:8000/api/register/", formData);
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
      {/* Décorations floues animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-10 -right-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse delay-700"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Carte principale */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 md:p-12">
          {/* En-tête */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-xl mb-6 transform hover:scale-110 transition-transform duration-300">
              <span className="text-4xl">🚑</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              SafeRoute
            </h1>
            <p className="text-xl text-gray-600 mt-3">Créer votre compte sécurisé</p>
          </div>

          {/* Formulaire */}
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
      className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none placeholder-gray-400"
      placeholder="Ex: John"
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
      className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none placeholder-gray-400"
      placeholder="Ex: Doe"
    />
  </div>
  </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none placeholder-gray-400"
                  placeholder="docteur.smith"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none"
                  placeholder="Minimum 8 caractères"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pays
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none"
                  placeholder="Ex: Tunisie"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ville
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none"
                  placeholder="Ex: Tunis"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none"
                placeholder="+216 12 345 678"
              />
            </div>

            {/* Bouton principal */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 mt-8 rounded-xl font-bold text-white text-lg shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600"
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  <span>Création du compte...</span>
                </>
              ) : (
                <>
                  <span>S'inscrire gratuitement</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Message feedback */}
          {message && (
            <div
              className={`mt-8 text-center p-5 rounded-xl font-medium text-lg transition-all duration-500 shadow-md ${
                message.includes("succès")
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {message.includes("succès") ? "Success" : "Warning"} {message}
            </div>
          )}

          {/* Lien connexion */}
          <p className="text-center mt-10 text-gray-600 text-lg">
            Déjà un compte ?{" "}
            <a
              href="/login"
              className="font-bold text-emerald-600 hover:text-emerald-700 underline-offset-4 hover:underline transition-all"
            >
              Se connecter
            </a>
          </p>
        </div>

        {/* Footer discret */}
        <div className="text-center mt-8 text-sm text-gray-500">
          SafeRoute • Votre sécurité médicale, notre priorité
        </div>
      </div>
    </div>
  );
}

export default Register;