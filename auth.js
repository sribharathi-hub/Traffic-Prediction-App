import express from "express";

const router = express.Router();

// 🔐 simple hardcoded user (for now)
const USER = {
  username: "admin",
  password: "1234"
};

router.post("/login", (req, res) => {

  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    return res.json({ success: true });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
});

export default router;