import React from "react";

function Models({ data }) {
  return (
    <div className="page">
      <h1 className="title">🧠 Models</h1>

      <div className="grid">
        {data.map((item, i) => (
          <div className="card" key={i}>
            {item.modelName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Models;