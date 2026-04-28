import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();
  return (
    <div className="navbar">
      <button onClick={() => { localStorage.removeItem("auth"); nav("/"); }}>Logout</button>
    </div>
  );
}