import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    if (user === "admin" && pass === "1234") {
      localStorage.setItem("auth", "true");
      nav("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Decorative background glow blobs */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      <div className="login-box">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p className="subtitle">Enter your credentials to continue</p>
        </div>

        <div className="form-content">
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="e.g. admin"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <button className="login-btn" onClick={login}>
            Sign In
          </button>

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
}
