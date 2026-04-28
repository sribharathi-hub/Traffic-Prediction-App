import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

export default function Performance() {
  const nav = useNavigate();
  const [data, setData] = useState([]);

  // Formatter to keep numbers clean
  const format = (v) => (v != null ? v.toFixed(4) : "0.0000");


  useEffect(() => {
    fetch(`${API}/api/performance`)
      .then(r => r.json())
      .then(d => {
        if (d.data) setData(d.data);
        else setData([]);
      })
      .catch(() => setData([]));
  }, []);

  return (
    <div className="prediction-page">
      <div className="main-content">
        <h2 className="neon-text-green">MODEL PERFORMANCE</h2>

        {/* The specific container for 4-per-row layout */}
        <div className="performance-grid">
          {data.map((d) => (
            <div className="glass-card mini-performance-card" key={d.model}>
              <div className="model-header">
                <span className="model-name">{d.model}</span>
              </div>
              <div className="metric-line">
                <span>RMSE:</span> <strong>{format(d.rmse)}</strong>
              </div>
              <div className="metric-line">
                <span>MAE:</span> <strong>{format(d.mae)}</strong>
              </div>
              <div className="metric-line highlight">
                <span>R² SCORE:</span> <strong>{(d.r2 * 100).toFixed(2)}%</strong>
              </div>
            </div>
          ))}
        </div>

        <button className="back-btn-bottom green-neon-btn" onClick={() => nav("/dashboard")}>
          ⬅ BACK TO DASHBOARD
        </button>
      </div>
    </div>

  );
}
