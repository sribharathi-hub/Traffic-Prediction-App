import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend
} from "chart.js";
import API from "./api";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Analytics() {
  const nav = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/performance`)
      .then(r => r.json())
      .then(d => setData(d.data || []));
  }, []);

  return (
    <div className="page-container">
      <div className="main-content">
        <div className="glass-card comparison-container">
          <h2 className="neon-orange">MODEL COMPARISON ANALYSIS</h2>

          {/* NEON BAR CHART */}
          <div className="chart-box-large">
            <Bar
              data={{
                labels: data.map(d => d.model),
                datasets: [{
                  label: "Accuracy Score (R²)",
                  data: data.map(d => d.r2),
                  backgroundColor: "rgba(120, 241, 165, 0.4)",
                  borderColor: "#79eed3",
                  borderWidth: 2,
                  hoverBackgroundColor: "#38c2e4"
                }]
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    ticks: { color: "#33f6af" },
                    grid: { color: "rgba(255, 255, 255, 0.05)" },
                    min: 0, max: 1
                  },
                  x: { ticks: { color: "#fff" } }
                },
                plugins: {
                  legend: { labels: { color: "#fff" } }
                }
              }}
            />
          </div>

          {/* NEON METRICS TABLE */}
          <div className="metrics-table-wrapper">
            <table className="neon-table">
              <thead>
                <tr>
                  <th>MODEL</th>
                  <th>RMSE</th>
                  <th>MAE</th>
                  <th>R² ACCURACY</th>
                </tr>
              </thead>
              <tbody>
                {data.map(d => (
                  <tr key={d.model}>
                    <td className="model-name-cell">{d.model}</td>
                    <td>{d.rmse.toFixed(4)}</td>
                    <td>{d.mae.toFixed(4)}</td>
                    <td className="highlight-r2">{(d.r2 * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="back-btn-bottom orange-neon-btn" onClick={() => nav("/dashboard")}>
            ⬅ BACK TO DASHBOARD
          </button>
        </div>
      </div>
    </div>
  );
}
