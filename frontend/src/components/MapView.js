import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Swal from "sweetalert2";
import "animate.css";
import api from "../services/api";

// Icônes personnalisées
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [35, 35],
});

const dangerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
  iconSize: [35, 35],
});

// Composant interne pour gérer les clics sur la carte
function AddZoneOnClick({ onAdd }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      Swal.fire({
        title: "➕ Ajouter une nouvelle zone dangereuse",
        html: `
          <input id="title" class="swal2-input" placeholder="Titre de la zone" />
          <textarea id="desc" class="swal2-textarea" placeholder="Description"></textarea>
          <select id="type" class="swal2-select">
            <option value="accident">Accident</option>
            <option value="agression">Agression</option>
            <option value="route">Route non éclairée</option>
            <option value="autre">Autre</option>
          </select>
        `,
        confirmButtonText: "✅ Enregistrer",
        focusConfirm: false,
        preConfirm: () => {
          const title = document.getElementById("title").value;
          const description = document.getElementById("desc").value;
          const danger_type = document.getElementById("type").value;

          if (!title) {
            Swal.showValidationMessage("Le titre est requis");
            return false;
          }
          return { title, description, danger_type };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          onAdd(lat, lng, result.value);
        }
      });
    },
  });

  return null;
}

function MapView() {
  const [zones, setZones] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [alertZone, setAlertZone] = useState(null);
  const [soundAllowed, setSoundAllowed] = useState(false);

  const getZoneColor = (type) => {
    switch (type) {
      case "accident":
        return "red";
      case "agression":
        return "orange";
      case "route":
        return "purple";
      default:
        return "gray";
    }
  };

  // Charger les zones
  const fetchZones = async () => {
    try {
      const res = await api.get("/api/dangerzones/");
      setZones(res.data);
    } catch (error) {
      console.error("Erreur chargement zones :", error);
    }
  };

  useEffect(() => {
    fetchZones();

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserPosition({ lat: latitude, lng: longitude });
        },
        (err) => console.error("Erreur GPS :", err),
        { enableHighAccuracy: true }
      );
    } else {
      Swal.fire("Erreur", "La géolocalisation n’est pas supportée.", "error");
    }
  }, []);

  // Ajouter une zone
  const handleAddZone = async (lat, lng, { title, description, danger_type }) => {
    try {
      const res = await api.post("/api/dangerzones/", {
        title,
        description,
        danger_type,
        latitude: lat,
        longitude: lng,
      });

      Swal.fire({
        icon: "success",
        title: "✅ Zone ajoutée avec succès !",
        text: res.data.title,
        timer: 2500,
        showConfirmButton: false,
      });

      fetchZones();
    } catch (error) {
      console.error("Erreur création zone :", error);
      Swal.fire({
        icon: "error",
        title: "❌ Erreur lors de l’ajout",
        text: "Vérifie ta connexion ou ton authentification.",
      });
    }
  };

  // Calcul distance (Haversine)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Détection de proximité
  useEffect(() => {
    if (userPosition && zones.length > 0) {
      const nearZone = zones.find((z) => {
        const d = getDistance(
          userPosition.lat,
          userPosition.lng,
          z.latitude,
          z.longitude
        );
        return d <= 300;
      });

      if (nearZone && nearZone !== alertZone) {
        setAlertZone(nearZone);

        Swal.fire({
          icon: "warning",
          title: "⚠️ Zone dangereuse détectée",
          html: `
            <strong>${nearZone.title}</strong><br/>
            Type : ${nearZone.danger_type}<br/>
            <small>${nearZone.description || "Aucune description"}</small>
          `,
          background: "#fff7e6",
          confirmButtonColor: "#d33",
          timer: 6000,
          timerProgressBar: true,
        });

        if (soundAllowed) {
          const audio = new Audio("/alert.mp3");
          audio.play().catch(() => {});
        }

        if (navigator.vibrate) navigator.vibrate([300, 200, 300]);
      }
    }
  }, [userPosition, zones, alertZone, soundAllowed]);

  return (
    <div
      style={{
        height: "90vh",
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      <MapContainer
        center={[36.8065, 10.1815]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        whenReady={() => {
          document.addEventListener(
            "click",
            () => setSoundAllowed(true),
            { once: true }
          );
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <AddZoneOnClick onAdd={handleAddZone} />

        {/* Position utilisateur */}
        {userPosition && (
          <>
            <Marker position={userPosition} icon={userIcon}>
              <Popup>Vous êtes ici 🧍‍♂️</Popup>
            </Marker>
            <Circle
              center={userPosition}
              radius={300}
              color="blue"
              fillOpacity={0.1}
            />
          </>
        )}

        {/* Zones dangereuses */}
        {zones.map((zone) => (
          <React.Fragment key={zone.id}>
            <Marker
              position={[zone.latitude, zone.longitude]}
              icon={dangerIcon}
            >
              <Popup>
                <b>{zone.title}</b><br />
                {zone.description}<br />
                <i>Type : {zone.danger_type}</i>
              </Popup>
            </Marker>

            <Circle
              center={[zone.latitude, zone.longitude]}
              radius={150}
              color={getZoneColor(zone.danger_type)}
              fillOpacity={0.3}
            />
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
