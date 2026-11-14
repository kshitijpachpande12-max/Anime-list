import express from "express";
import dns from "dns";
import dotenv from "dotenv";
import cors from "cors";
import sentinel from "sentinel-telemetry-agent"; // <-- UNCOMMENT THIS
import { ConnectDB } from "./config/DB.js";
import al_Routes from "./routes/al_Routes.js";

dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// 1. Initialize Sentinel (safely wrapped)
try {
  sentinel.init({
    serviceName: "Anime List",
    apiKey: process.env.SENTINEL_API_KEY || "01M7D5M2FQ3W6DSPJ3WECKV7DQ",
    projectId: process.env.SENTINEL_PROJECT_ID || "6af868f89a495aa408069b1b",
    serverUrl: "https://sentinel-rosy-three.vercel.app",
    serverless: true,
  });
} catch (err) {
  console.warn("Sentinel passive mode:", err.message);
}

const app = express();

// 2. CORS configuration
const corsOptions = {
  origin: ["https://anime-list-mkbr.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

// 3. Attach Sentinel middleware
app.use(sentinel.middleware());

// Connect DB per request (serverless friendly)
app.use(async (req, res, next) => {
  try {
    await ConnectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.use("/api/Anime-list", al_Routes);

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

export default app;