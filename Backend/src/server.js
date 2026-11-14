import express from "express";
import dns from "dns";
import dotenv from "dotenv";
import cors from "cors";
import sentinel from "sentinel-telemetry-agent";
import { ConnectDB } from "./config/DB.js";
import al_Routes from "./routes/al_Routes.js";

dotenv.config(); // load env first
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Telemetry must never be able to crash the API
try {
  sentinel.init({
    serviceName: "Anime List",
    apiKey: process.env.SENTINEL_API_KEY,
    projectId: process.env.SENTINEL_PROJECT_ID,
    serverUrl: "https://sentinel-rosy-three.vercel.app",
  });
} catch (err) {
  console.error("Sentinel init failed:", err.message);
}

const app = express();

// CORS first, so even error responses carry the headers
const corsOptions = {
  origin: ["https://anime-list-mkbr.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(sentinel.middleware());

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