import express from "express";
import cors from "cors";
import { exec } from "child_process";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const JAVA_CMD = `"C:\\Program Files\\Java\\jdk-26\\bin\\java.exe" -jar TrafficFlow.jar`;

/* ===========================
   PREDICTION API
=========================== */
app.post("/api/predict", (req, res) => {

  const json = JSON.stringify(req.body);

  const safeJson = json.replace(/"/g, '\\"');

  exec(`${JAVA_CMD} predictSingle "${safeJson}"`, (err, stdout, stderr) => {

    if (err) {
      console.error("Java Error:", stderr);
      return res.json({ error: "Java execution failed" });
    }

    const lines = stdout.trim().split("\n");

    const predictions = lines.map(l => {
      const [model, val] = l.split("|");

      return {
        model: model?.trim(),
        value: parseFloat(val) || 0
      };
    });

    res.json({ predictions });

  });
});
/* ===========================
   PERFORMANCE API (CSV FIXED)
=========================== */
app.get("/api/performance", (req, res) => {
  try {

    const text = fs.readFileSync("metrics.txt", "utf-8");

    const lines = text
      .split("\n")
      .slice(1)
      .filter(l => l.trim());

    const data = lines.map(line => {
      const [model, rmse, mae, r2] = line.split(",");

      return {
        model: model.trim(),
        rmse: parseFloat(rmse),
        mae: parseFloat(mae),
        r2: parseFloat(r2)
      };
    });

    res.json({ data });

  } catch {
    res.json({ data: [] });
  }
});

app.listen(5000, () => console.log("Server running on 5000"));