import express from "express";
import runJava from "../utils/javaRunner.js";

const router = express.Router();

// 🔮 PREDICT
router.post("/predict", async (req, res) => {

  try {
    const input = JSON.stringify(req.body);

    const output = await runJava("predictSingle", input);

    const result = {};

    output.split("\n").forEach(line => {

      if (!line.includes("|")) return;

      const [model, value] = line.split("|");
      result[model.trim()] = parseFloat(value);
    });

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Prediction failed" });
  }
});

// 🧠 TRAIN
router.get("/train", async (req, res) => {

  try {
    await runJava("train");

    res.json({ message: "Training completed" });

  } catch (err) {
    res.status(500).json({ error: "Training failed" });
  }
});

export default router;