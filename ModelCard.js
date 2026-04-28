function ModelCard({ item, best }) {

  const isBest = best && item.modelName === best.modelName;

  return (
    <div
      style={{
        padding: "15px",
        borderRadius: "15px",
        background: isBest
          ? "linear-gradient(135deg,#00c9ff,#92fe9d)"
          : "linear-gradient(135deg,#ffecd2,#fcb69f)",
        boxShadow: isBest
          ? "0px 0px 20px gold"
          : "0px 5px 15px rgba(0,0,0,0.2)",
        transform: "scale(1)",
        transition: "0.3s",
        cursor: "pointer"
      }}

      // 🖱️ HOVER EFFECT
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.08)";
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >

      {/* BEST BADGE */}
      {isBest && (
        <div style={{
          background: "gold",
          color: "black",
          padding: "5px",
          borderRadius: "10px",
          marginBottom: "10px",
          fontWeight: "bold"
        }}>
          🏆 BEST MODEL
        </div>
      )}

      <h3>{item.modelName}</h3>

      <p><b>RMSE:</b> {item.rmse}</p>
      <p><b>MAE:</b> {item.mae}</p>

    </div>
  );
}

export default ModelCard;