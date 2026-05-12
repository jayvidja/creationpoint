import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";

dotenv.config();
const app = express();
app.set("trust proxy", 1);

/* ✅ CORS */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

/* ✅ MIDDLEWARE */
app.use(express.json());
app.use(cookieParser());

/* ✅ SESSION */
app.use(session({
  secret: process.env.SESSION_SECRET || "secretKey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    domain: process.env.NODE_ENV === "production" ? undefined : "localhost"
  }
}));

/* ✅ STATIC FOLDER */
app.use("/uploads", express.static("uploads"));

/* ✅ ROUTES */
app.use("/api/users", userRoutes);
app.use("/api/gallery", galleryRoutes);

/* ✅ DB */
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cpDB";

mongoose.connect(mongoUri)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ✅ SERVER */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});