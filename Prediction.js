import { useState } from "react";
import { Bar } from "react-chartjs-2";
import API from "./api";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Prediction() {

  const nav = useNavigate();

  const [values, setValues] = useState({
    f1: "", f2: "", f3: "", f4: "", f5: ""
  });

  const [results, setResults] = useState([]);

  const runPrediction = async () => {

    if (Object.values(values).some(v => v === "")) {
      alert("Enter all values");
      return;
    }

    const res = await fetch(`${API}/api/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });


    const data = await res.json();
    setResults(data.predictions || []);
  };

  /* ===========================
     AVERAGE PREDICTION
  =========================== */
  const avg =
    results.length > 0
      ? results.reduce((sum, r) => sum + (r.value || 0), 0) / results.length
      : 0;

  /* ===========================
     TRAFFIC LOGIC
  =========================== */
  const getTraffic = (v) => {
    if (v < 0.3) return "LOW";
    if (v < 0.6) return "MEDIUM";
    return "HIGH";
  };

  return (
    <div className="prediction-page">

      {/* INPUT CARD */}
      <div className="glass-card input-container">
        <h2>TRAFFIC PREDICTION</h2>

        <div className="vertical-form">
          {Object.keys(values).map(k => (
            <input
              key={k}
              className="glass-input"
              placeholder={k}
              value={values[k]}
              onChange={(e) =>
                setValues({ ...values, [k]: e.target.value })
              }
            />
          ))}
        </div>

        <button className="predict-btn" onClick={runPrediction}>
          Predict
        </button>
      </div>

      {/* RESULTS */}
      <div className="results-container">

        {/* MODEL CARDS */}
        <div className="stats-grid">
          {results.map(r => (
            <div className="mini-card" key={r.model}>
              <span>{r.model || "Unknown"}</span>
              <strong>{(r.value || 0).toFixed(4)}</strong>
            </div>
          ))}
        </div>

        {/* AVERAGE */}
        {results.length > 0 && (
          <div className="avg-card">
            Average Prediction: {avg.toFixed(4)}
          </div>
        )}

        {/* TRAFFIC STATUS */}
        {results.length > 0 && (
          <div className={`status-card ${getTraffic(avg).toLowerCase()}`}>
            {getTraffic(avg)} TRAFFIC
          </div>
        )}

        {/* CHART */}
        {results.length > 0 && (
          <div className="chart-box">
            <Bar
              data={{
                labels: results.map(r => r.model || "Unknown"),
                datasets: [
                  {
                    label: "Prediction",
                    data: results.map(r => r.value || 0)
                  }
                ]
              }}
              options={{
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        )}

      </div>

      {/* BACK BUTTON */}
      <button className="back-btn-bottom" onClick={() => nav("/dashboard")}>
        BACK
      </button>

    </div>
  );
}