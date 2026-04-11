import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";

const app = express();

/* ✅ CORS */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

/* ✅ MIDDLEWARE */
app.use(express.json());
app.use(cookieParser());

/* ✅ SESSION */
app.use(session({
  secret: "secretKey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax"
  }
}));

/* ✅ STATIC FOLDER */
app.use("/uploads", express.static("uploads"));

/* ✅ ROUTES */
app.use("/api/users", userRoutes);
app.use("/api/gallery", galleryRoutes);

/* ✅ DB */
mongoose.connect("mongodb://127.0.0.1:27017/cpDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ✅ SERVER */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});