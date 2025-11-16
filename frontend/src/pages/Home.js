import React, { useState } from "react";
import MapView from "../components/MapView";
import "animate.css";

function Home() {
  const [showMap, setShowMap] = useState(true); // par défaut on affiche la carte

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f7faff 0%, #eef3ff 100%)",
        padding: "2rem",
      }}
    >
      {/* En-tête */}
      <div
        className="text-center mb-4 animate__animated animate__fadeInDown"
        style={{
          background: "#fff",
          padding: "1rem",
          borderRadius: "12px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
        }}
      >
        <h1 className="fw-bold text-primary">🚑 SafeRoute</h1>
        <p className="text-muted mb-0">
          Détectez les zones dangereuses autour de vous et recevez des alertes instantanées.
        </p>
      </div>

      {/* Corps principal */}
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "2rem",
          boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h3 className="mb-3 text-center text-secondary">
          🌍 Carte interactive — Zones de danger en Tunisie
        </h3>

        <div
          className="animate__animated animate__fadeInUp"
          style={{
            height: "70vh",
            width: "100%",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          }}
        >
          <MapView />
        </div>

        <div className="d-flex gap-3 mt-4">
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowMap((prev) => !prev)}
          >
            {showMap ? "🗺️ Masquer la carte" : "🌍 Afficher la carte"}
          </button>

          <a href="/dashboard" className="btn btn-primary">
            📊 Tableau de bord
          </a>
        </div>

        <p className="mt-3 text-muted text-center" style={{ maxWidth: "600px" }}>
          <small>
            Astuce : cliquez sur la carte pour signaler une nouvelle zone dangereuse.
            Autorisez la géolocalisation pour recevoir des alertes en temps réel 🔔.
          </small>
        </p>
      </div>
    </div>
  );
}

export default Home;
