import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";
import "../index.css";

function Dashboard() {
  const [zones, setZones] = useState([]);
  const [stats, setStats] = useState(null);
  const [userFilter, setUserFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = localStorage.getItem("access");

  const fetchZones = async () => {
    try {
      let url = "http://127.0.0.1:8000/api/dangerzones/";
      const params = [];
      if (userFilter) params.push(`user=${userFilter}`);
      if (startDate) params.push(`start=${startDate}`);
      if (endDate) params.push(`end=${endDate}`);
      if (params.length) url += `?${params.join("&")}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      setZones(data);

      const types = {};
      data.forEach((z) => {
        types[z.danger_type] = (types[z.danger_type] || 0) + 1;
      });

      const byDate = {};
      data.forEach((z) => {
        const date = new Date(z.created_at).toLocaleDateString();
        byDate[date] = (byDate[date] || 0) + 1;
      });

      const chartData = Object.keys(byDate).map((d) => ({
        date: d,
        count: byDate[d],
      }));

      const byCity = {
        Tunis: data.filter((z) => z.title.toLowerCase().includes("tunis")).length,
        Sfax: data.filter((z) => z.title.toLowerCase().includes("sfax")).length,
        Sousse: data.filter((z) => z.title.toLowerCase().includes("sousse")).length,
        Bizerte: data.filter((z) => z.title.toLowerCase().includes("bizerte")).length,
      };

      const cityData = Object.keys(byCity).map((c) => ({
        city: c,
        count: byCity[c],
      }));

      setStats({ totalZones: data.length, types, chartData, cityData });
    } catch (error) {
      console.error("Erreur lors du chargement des stats :", error);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  if (!stats) return <div className="text-center mt-5">Chargement du tableau de bord...</div>;

  const COLORS = ["#007bff", "#ff4c4c", "#ffc107", "#28a745"];
  const typeData = Object.keys(stats.types).map((key) => ({
    name: key,
    value: stats.types[key],
  }));

  return (
    <div
      className="dashboard-container"
      style={{
        background: "linear-gradient(135deg, #f5f8ff 0%, #e9f0ff 100%)",
        minHeight: "100vh",
        padding: "2rem 3rem",
      }}
    >
      <h2 className="text-center text-primary mb-5 fw-bold animate__animated animate__fadeInDown">
        📊 Tableau de bord — SafeRoute
      </h2>

      {/* Filtres */}
      <form className="filter-card mb-5 p-4 rounded shadow-sm bg-white">
        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <label>Utilisateur</label>
            <input
              type="text"
              className="form-control"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              placeholder="Nom d'utilisateur"
            />
          </div>
          <div className="col-md-3">
            <label>Date début</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label>Date fin</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <button
              type="button"
              onClick={fetchZones}
              className="btn btn-primary w-100"
            >
              🔍 Filtrer
            </button>
          </div>
        </div>
      </form>

      {/* Grille des graphiques */}
      <div className="row g-4">
        {/* Ligne 1 */}
        <div className="col-md-6">
          <div className="chart-card">
            <h5 className="text-center mb-3">📊 Répartition par type</h5>
            <PieChart width={450} height={280}>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={110}
                dataKey="value"
              >
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        <div className="col-md-6">
          <div className="chart-card">
            <h5 className="text-center mb-3">📈 Évolution des signalements</h5>
            <LineChart width={500} height={280} data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#007bff" strokeWidth={2} />
            </LineChart>
          </div>
        </div>

        {/* Ligne 2 */}
        <div className="col-md-6">
          <div className="chart-card d-flex flex-column align-items-center justify-content-center">
            <h5 className="mb-3 text-center">Total des zones signalées</h5>
            <h1 className="display-4 text-success fw-bold">{stats.totalZones}</h1>
          </div>
        </div>

        <div className="col-md-6">
          <div className="chart-card">
            <h5 className="text-center mb-3">🏙️ Répartition par région</h5>
            <BarChart width={500} height={280} data={stats.cityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#28a745" barSize={40} />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
