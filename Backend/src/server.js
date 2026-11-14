import express from "express";
import dns from "dns";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDB } from "./config/DB.js";
import al_Routes from "./routes/al_Routes.js";

dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(
  cors({
    origin: ["https://anime-list-mkbr.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Connect lazily per request (serverless-friendly)
app.use(async (req, res, next) => {
  try {
    await ConnectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.use("/api/Anime-list", al_Routes);

// Errors come back as JSON, with CORS headers already attached
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

export default app;