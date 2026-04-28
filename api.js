const API =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "http://192.168.1.10:5000"; // 👉 replace with your PC IP

export default API;