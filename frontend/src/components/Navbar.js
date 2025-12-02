import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200 shadow-sm mb-56">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo avec effet de glow subtil */}
          <Link
            to="/"
            className="flex items-center space-x-3 group transition-all duration-300"
          >
            <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
              🚑
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Safe Route
            </span>
          </Link>

          {/* Menu principal */}
          <div className="hidden md:flex items-center space-x-10">
            <Link
              to="/"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 relative group"
            >
              Carte
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 relative group"
            >
              Tableau de bord
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Boutons Auth */}
         <div className="flex items-center space-x-4">
  {!isAuthenticated() ? (
    <>
      <Link to="/login" className="px-5 py-2 text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50">
        Connexion
      </Link>
      <Link to="/register" className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg">
        Inscription
      </Link>
    </>
  ) : (
    <>
      <Link
        to="/profile"
        className="px-5 py-2 text-gray-700 hover:text-emerald-600 font-medium rounded-lg transition-all duration-200"
      >
        Profil
      </Link>
      <button onClick={handleLogout} className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
        Déconnexion
      </button>
    </>
  )}
</div>

        </div>
      </div>

      {/* Version mobile (optionnel, tu peux ajouter un menu burger plus tard) */}
      <div className="md:hidden flex justify-between items-center px-4 h-16 border-t border-gray-200 bg-white/90">
        <Link to="/" className="text-xl font-bold text-emerald-600">
          SafeRoute 🚑
        </Link>
        <div className="text-sm text-gray-600">
          {!isAuthenticated() ? "Invité" : "Connecté"}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;