import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      await loginUser(username, password);
      setMessage("Connexion réussie ! Redirection...");
      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      setMessage("Identifiants incorrects");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center px-4">
      {/* Fond décoratif subtil */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Carte principale avec glassmorphism */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
          {/* Logo + Titre */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-lg mb-4 transform hover:scale-110 transition-transform duration-300">
              <span className="text-4xl">🚑</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              SafeRoute
            </h1>
            <p className="text-gray-600 mt-2">Connexion sécurisée</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                placeholder="ex: docteur.dupont"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none text-gray-800 placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600"
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <span>Se connecter</span>
              )}
            </button>
          </form>

          {/* Message de feedback */}
          {message && (
            <div
              className={`mt-6 text-center p-4 rounded-xl font-medium transition-all duration-500 ${
                message.includes("réussie")
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {message.includes("réussie") ? "Success" : "Warning"} {message}
            </div>
          )}

          {/* Lien inscription */}
          <p className="text-center mt-8 text-gray-600">
            Pas encore de compte ?{" "}
            <a
              href="/register"
              className="font-bold text-emerald-600 hover:text-emerald-700 underline-offset-4 hover:underline transition-all"
            >
              S'inscrire gratuitement
            </a>
          </p>
        </div>

        {/* Petit badge version (optionnel) */}
        <div className="text-center mt-6 text-xs text-gray-500">
          SafeRoute v1.0 • Sécurité médicale prioritaire
        </div>
      </div>
    </div>
  );
}

export default Login;