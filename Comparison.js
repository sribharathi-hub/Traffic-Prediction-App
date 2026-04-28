import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Line, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Tooltip, Legend, Filler
} from "chart.js";
import API from "./api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler);

export default function Comparison() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0); // Tracks current model to compare
  const [chartType, setChartType] = useState("bar"); // bar, line, scatter, violin

  useEffect(() => {
    fetch(`${API}/api/performance`)
      .then(r => r.json())
      .then(d => {
        // Filter out ASE so we only compare others against it
        const filtered = (d.data || []).filter(m => m.model !== "ASE");
        setData(filtered);
      });
  }, []);

  const ASE = { model: "ASE", rmse: 0.0317, mae: 0.0138, r2: 0.7859 };
  const currentModel = data[index] || { model: "Loading...", rmse: 0, mae: 0, r2: 0 };

  // Cycle to next model on graph tap
  const nextModel = () => setIndex((prev) => (prev + 1) % data.length);

  const chartData = {
    labels: ["RMSE", "MAE", "R² Score"],
    datasets: [
      {
        label: "ASE (Benchmark)",
        data: [ASE.rmse, ASE.mae, ASE.r2],
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "#ffffff",
        borderWidth: 2,
        pointBackgroundColor: "#fff",
      },
      {
        label: currentModel.model,
        data: [currentModel.rmse, currentModel.mae, currentModel.r2],
        backgroundColor: "rgba(255, 234, 0, 0.4)",
        borderColor: "#ffea00",
        borderWidth: 3,
        pointBackgroundColor: "#ffea00",
      }
    ]
  };

  const scatterData = {
    datasets: [
      { label: "ASE", data: [{ x: ASE.rmse, y: ASE.r2 }], backgroundColor: "#fff", pointRadius: 10 },
      { label: currentModel.model, data: [{ x: currentModel.rmse, y: currentModel.r2 }], backgroundColor: "#ffea00", pointRadius: 15 }
    ]
  };

  return (
    <div className="page-container">
      <div className="main-content">
        <div className="glass-card comparison-container">
          <h2 className="neon-orange">ASE vs {currentModel.model}</h2>
          <p className="tap-hint">Tap graph to switch model ({index + 1}/{data.length})</p>

          {/* CHART SWITCHER BUTTONS */}
          <div className="button-group">
            {["bar", "line", "scatter"].map(type => (
              <button
                key={type}
                className={`tab-btn ${chartType === type ? 'active' : ''}`}
                onClick={() => setChartType(type)}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>

          {/* MAIN GRAPH AREA */}
          <div className="chart-box-large" onClick={nextModel} style={{ cursor: 'pointer' }}>
            {chartType === "bar" && <Bar data={chartData} />}
            {chartType === "line" && <Line data={chartData} />}
            {chartType === "scatter" && (
              <Scatter data={scatterData} options={{ scales: { x: { title: { display: true, text: 'RMSE', color: '#fff' } }, y: { title: { display: true, text: 'R2', color: '#fff' } } } }} />
            )}
            {chartType === "violin" && (
              <div className="violin-mock">
                <div className="v-line" style={{ height: `${ASE.r2 * 100}%`, background: '#fff' }}><span>ASE</span></div>
                <div className="v-line" style={{ height: `${currentModel.r2 * 100}%`, background: '#ffea00', boxShadow: '0 0 15px #ffea00' }}><span>{currentModel.model}</span></div>
              </div>
            )}
          </div>

          {/* COMPARISON DATA TABLE BELOW */}
          <div className="metrics-table-wrapper">
            <table className="neon-table">
              <thead>
                <tr>
                  <th>METRIC</th>
                  <th>ASE (Ref)</th>
                  <th>{currentModel.model}</th>
                  <th>DIFF</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>RMSE</td>
                  <td>{ASE.rmse}</td>
                  <td>{currentModel.rmse}</td>
                  <td style={{ color: currentModel.rmse < ASE.rmse ? '#39ff14' : '#ff3131' }}>
                    {(currentModel.rmse - ASE.rmse).toFixed(4)}
                  </td>
                </tr>
                <tr>
                  <td>R² SCORE</td>
                  <td>{ASE.r2}</td>
                  <td>{currentModel.r2}</td>
                  <td style={{ color: currentModel.r2 > ASE.r2 ? '#39ff14' : '#ff3131' }}>
                    {((currentModel.r2 - ASE.r2) * 100).toFixed(2)}%
                  </td>
                </tr>
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
