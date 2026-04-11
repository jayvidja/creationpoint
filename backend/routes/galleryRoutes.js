import express from "express";
import upload from "../middleware/upload.js";
import Gallery from "../models/Gallery.js";
import mongoose from "mongoose";

const router = express.Router();

console.log("✅ Gallery Routes Loaded");
// 🔥 1. UPLOAD ROUTE (ADD THIS)
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;

    const newImage = await Gallery.create({
      image: imageUrl,
      name,
      description,
    });

    res.json({
      message: "Upload success",
      data: newImage,
    });

  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
});


// 🔥 2. COUNT
router.get("/count", async (req, res) => {
  try {
    const totalImages = await Gallery.countDocuments();
    res.json({ totalImages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔥 3. GET ALL
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔥 4. GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const tile = await Gallery.findById(id);

    if (!tile) {
      return res.status(404).json({ message: "Tile not found" });
    }

    res.json(tile);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;