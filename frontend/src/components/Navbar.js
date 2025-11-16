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
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm">
      <Link className="navbar-brand fw-bold text-primary" to="/">
        SafeRoute 🚑
      </Link>
      <div className="navbar-nav ms-auto">
        <Link className="nav-item nav-link" to="/">
          Carte
        </Link>
        <Link className="nav-item nav-link" to="/dashboard">Tableau de bord</Link>
        {!isAuthenticated() ? (
          <>
            <Link className="nav-item nav-link" to="/login">
              Connexion
            </Link>
            <Link className="nav-item nav-link" to="/register">
              Inscription
            </Link>
          </>
        ) : (
          <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
            Se déconnecter
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
