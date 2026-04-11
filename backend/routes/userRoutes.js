import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* ================= REGISTER ================= */

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "user",
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Register failed" });
  }
});

/* ================= LOGIN ================= */

router.post("/login", async (req, res) => {
  try {
    

    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields ❌" });
    }

    console.log("EMAIL:", email);

    const user = await User.findOne({ email });

    

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password ❌" });
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.json({
      message: "Login successful ✅",
      user: req.session.user,
    });
  } catch (err) {
    console.log("🔥 FULL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});
// ✅ GET CURRENT USER (SESSION CHECK)
router.get("/me", (req, res) => {
  try {
    if (req.session.user) {
      res.json({
        loggedIn: true,
        user: req.session.user,
      });
    } else {
      res.json({
        loggedIn: false,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

/* ================= LOGOUT ================= */

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful ✅" });
  });
});

/* ================= COUNT ================= */

router.get("/count", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ totalUsers: count });
  } catch (err) {
    res.status(500).json({ message: "Error counting users" });
  }
});

/* ================= GET ALL USERS ================= */

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/* ================= DELETE USER ================= */

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
