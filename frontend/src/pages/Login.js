import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      setMessage("✅ Connexion réussie !");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setMessage("❌ Identifiants invalides");
    }
  };

  return (
    <div className="page-center">
      <div className="auth-card" style={{ maxWidth: 620 }}>
        <h3 className="text-center mb-4">🔐 Connexion</h3>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              className="form-control"
              placeholder="Votre identifiant"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Mot de passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Se connecter
          </button>
        </form>
        {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
        <p className="mt-3 text-center">
          Pas encore de compte ?{" "}
          <a href="/register" className="text-decoration-none">
            Inscrivez-vous
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
