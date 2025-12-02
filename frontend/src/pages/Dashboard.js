import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, LineChart, Line,ResponsiveContainer
} from "recharts";

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

       const allCities = [...new Set(data.map((z) => z.city).filter(Boolean))];
    const cityData = allCities.map((city) => ({
      city,
      count: data.filter((z) => z.city === city).length,
    }));

      setStats({ totalZones: data.length, types, chartData, cityData });

    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

if (!token) {
  return (
    <div className="text-center py-10 text-xl mt-12">
      Vous devez être connecté pour voir le dashboard.
    </div>
  );
}

if (!stats) {
  return (
    <div className="text-center py-10 text-xl mt-12">
      Chargement...
    </div>
  );
}


  const COLORS = ["#3b82f6", "#ef4444", "#facc15", "#22c55e"];
  const typeData = Object.keys(stats.types).map((key) => ({
    name: key,
    value: stats.types[key],
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8 mt-12">
      
      <h2 className="text-center text-3xl font-bold text-blue-600 mb-10">
        📊 Tableau de bord — SafeRoute
      </h2>

      {/* Filtres 
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium">Utilisateur</label>
            <input
              type="text"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              placeholder="Nom d'utilisateur"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date début</label>
            <input
              type="date"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date fin</label>
            <input
              type="date"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 mt-6"
            onClick={fetchZones}
          >
            🔍 Filtrer
          </button>
        </div>
      </div>*/}

      {/* Grille des graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Pie chart */}
   <div className="bg-white rounded-xl shadow p-6 w-full">
  <h5 className="text-center font-semibold mb-4">📊 Répartition par type</h5>

  <div className="w-full h-[280px]">
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={typeData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          dataKey="value"
        >
          {typeData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>





        {/* Line chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h5 className="text-center font-semibold mb-4">📈 Évolution des signalements</h5>
          <LineChart width={450} height={280} data={stats.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </div>

        {/* Total zones */}
       {/* Total zones */}
<div className="bg-white rounded-xl w-full shadow p-6 text-center flex flex-col justify-center col-span-2">
  <h5 className="text-lg font-semibold">Total des zones signalées</h5>
  <h1 className="text-5xl font-extrabold text-green-600 mt-4">
    {stats.totalZones}
  </h1>
</div>


        {/* Bar chart 
        <div className="bg-white rounded-xl shadow p-6">
          <h5 className="text-center font-semibold mb-4">🏙️ Répartition par région</h5>
          <BarChart width={450} height={280} data={stats.cityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#22c55e" barSize={40} />
          </BarChart>
        </div>
        */}
      </div>
    </div>
  );
}

export default Dashboard;
