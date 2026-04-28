import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Analytics from "./pages/Analytics";
import Comparison from "./pages/Comparison";
import Performance from "./pages/Performance";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/prediction" element={<ProtectedRoute><Prediction /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/comparison" element={<ProtectedRoute><Comparison /></ProtectedRoute>} />
        <Route path="/performance" element={<ProtectedRoute><Performance /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}