import fs from "fs";
import express from "express";

const router = express.Router();

router.get("/performance", (req, res) => {
  try {
    const text = fs.readFileSync("metrics.txt", "utf-8");

    const lines = text
      .split("\n")
      .slice(1)
      .filter(l => l.trim() !== "");

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

  } catch (e) {
    res.json({ error: "No metrics" });
  }
});

export default router;