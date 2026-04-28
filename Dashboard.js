import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { FaChartLine, FaLaptopCode, FaChartBar, FaBalanceScale, FaSignOutAlt, FaTimes } from "react-icons/fa";

export default function Dashboard() {
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clears user session
    nav("/"); // Redirects to login
  };
  const handleClose = () => {
    // If running in an Electron app or similar, this could close the window.
    // In a browser, it's best to redirect to a 'Goodbye' or 'Login' page.
    nav("/");
  };


  return (
    <div className="dashboard">
      {/* Topbar for Logout */}
      <div className="dashboard-topbar">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> LOGOUT
        </button>
        <button className="close-btn" onClick={handleClose}>
          <FaTimes /> CLOSE
        </button>
      </div>

      {/* Header */}
      <div className="header">
        <h1 className="neon-text-blue">🚦 Traffic Prediction App</h1>
        <p>Smart Hybrid Traffic Flow Prediction & Analysis System</p>
      </div>

      {/* Grid */}
      <div className="grid">
        <div className="card blue" onClick={() => nav("/prediction")}>
          <div className="left">
            <div className="icon"><FaChartLine /></div>
            <div>
              <h2>Prediction</h2>
              <p>Predict traffic levels using advanced machine learning models.</p>
            </div>
          </div>
          <div className="arrow">→</div>
        </div>

        <div className="card green" onClick={() => nav("/performance")}>
          <div className="left">
            <div className="icon"><FaLaptopCode /></div>
            <div>
              <h2>Performance</h2>
              <p>View model performance metrics and evaluation results.</p>
            </div>
          </div>
          <div className="arrow">→</div>
        </div>

        <div className="card purple" onClick={() => nav("/analytics")}>
          <div className="left">
            <div className="icon"><FaChartBar /></div>
            <div>
              <h2>Analytics</h2>
              <p>Explore traffic trends and patterns with interactive visualizations.</p>
            </div>
          </div>
          <div className="arrow">→</div>
        </div>

        <div className="card orange" onClick={() => nav("/comparison")}>
          <div className="left">
            <div className="icon"><FaBalanceScale /></div>
            <div>
              <h2>Comparison</h2>
              <p>Compare all models and find the best performing algorithm.</p>
            </div>
          </div>
          <div className="arrow">→</div>
        </div>
      </div>
    </div>
  );
}
