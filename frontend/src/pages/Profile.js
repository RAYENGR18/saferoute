import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../services/authService";

function Profile() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    country: "",
    city: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Récupérer les infos du backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setFormData(data);
      } catch (error) {
        setMessage("Impossible de charger le profil.");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      await updateUserProfile(formData);
      setMessage("Profil mis à jour avec succès !");
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Impossible de mettre à jour le profil."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center px-4 py-12 mt-10">
      <div className="relative w-full max-w-2xl">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-xl mb-6 transform hover:scale-110 transition-transform duration-300">
              <span className="text-4xl">👤</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Mon Profil
            </h1>
            <p className="text-xl text-gray-600 mt-3">
              Modifier vos informations personnelles
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username (lecture seule) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                disabled
                className="w-full px-5 py-3.5 rounded-xl border border-gray-300 bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Prénom et Nom */}
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
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
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
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                />
              </div>
            </div>

            {/* Pays et Ville */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pays
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
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
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                placeholder="+216 12 345 678"
              />
            </div>

            {/* Bouton de sauvegarde */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 mt-8 rounded-xl font-bold text-white text-lg shadow-xl transition-all duration-300 transform hover:scale-105 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600"
              }`}
            >
              {isLoading ? "Mise à jour..." : "Mettre à jour le profil"}
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
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
