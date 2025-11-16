import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import { getToken } from "../services/authService";

function AddZoneForm({ onZoneAdded, selectedCoords }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    danger_type: "accident",
    latitude: "",
    longitude: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (selectedCoords) {
      setFormData({
        ...formData,
        latitude: selectedCoords.latitude,
        longitude: selectedCoords.longitude,
      });
    }
  }, [selectedCoords]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = getToken();
    if (!token) {
      setError("Veuillez vous connecter avant d’ajouter une zone.");
      return;
    }

    try {
      const response = await axiosInstance.post("dangerzones/", formData);
      setSuccess("Zone ajoutée avec succès ✅");
      setFormData({
        title: "",
        description: "",
        danger_type: "accident",
        latitude: "",
        longitude: "",
      });
      if (onZoneAdded) onZoneAdded(response.data);
    } catch (err) {
      console.error("Erreur backend :", err.response?.data || err.message);
      setError("Erreur lors de l’ajout de la zone ❌");
    }
  };

  return (
    <div className="card p-3 shadow-sm mt-3">
      <h5>➕ Ajouter une nouvelle zone dangereuse</h5>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {success && <div className="alert alert-success mt-2">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Titre</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Type de danger</label>
          <select
            name="danger_type"
            value={formData.danger_type}
            onChange={handleChange}
            className="form-select"
          >
            <option value="accident">Accident</option>
            <option value="agression">Agression</option>
            <option value="route">Route non éclairée</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div className="row">
          <div className="col">
            <label className="form-label">Latitude</label>
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              step="0.000001"
              className="form-control"
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Longitude</label>
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              step="0.000001"
              className="form-control"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-3 w-100">
          Ajouter la zone
        </button>
      </form>
    </div>
  );
}

export default AddZoneForm;
