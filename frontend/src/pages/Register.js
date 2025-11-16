import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    country: "",
    city: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Appel à ton backend étendu (on le mettra à jour juste après)
      await axios.post("http://127.0.0.1:8000/api/register/", formData);
      setMessage("✅ Compte créé avec succès !");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage("❌ Erreur : " + (error.response?.data?.error || "Inscription impossible"));
    }
  };

  return (
    <div className="page-center">
      <div className="auth-card" style={{ maxWidth: 620 }}>
        <h3 className="text-center mb-4 text-primary">🆕 Créer un compte SafeRoute</h3>
        <form onSubmit={handleRegister}>
          <div className="form-group mb-3">
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              className="form-control"
              placeholder="Choisissez un identifiant"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Mot de passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Pays</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Tunisie"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Ville</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Ariana"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-4">
            <label>Numéro de téléphone</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Ex: +216 50 123 456"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            S'inscrire
          </button>
        </form>
        {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
        <p className="mt-3 text-center">
          Déjà un compte ?{" "}
          <a href="/login" className="text-decoration-none">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
