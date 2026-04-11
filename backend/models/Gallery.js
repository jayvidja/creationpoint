import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String
}, { timestamps: true });

export default mongoose.model("Gallery", gallerySchema);