import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDB } from "./config/DB.js";
import al_Routes from "./routes/al_Routes.js";

dotenv.config();

// Note: Removed dns.setServers(...) as Vercel serverless restricts custom DNS sockets

const app = express();

// 1. CORS MUST BE FIRST
const corsOptions = {
  origin: ["https://anime-list-mkbr.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

// 2. Load Sentinel Safely (Non-blocking & Zero-Crash Guarantee)
let sentinelMiddleware = (req, res, next) => next();
try {
  const { default: sentinel } = await import("sentinel-telemetry-agent");
  sentinel.init({
    serviceName: "Anime List",
    apiKey: "01M7D7Y9D9ZDD4XQC4Z640MQPX",
    projectId: "6af8727837ed5204d0ead20a",
    serverUrl: "https://sentinel-rosy-three.vercel.app",
    serverless: true,
  });
  sentinelMiddleware = sentinel.middleware();
} catch (err) {
  console.warn("[Sentinel] Running in passive fallback mode:", err.message);
}

// 3. Attach telemetry middleware
app.use((req, res, next) => sentinelMiddleware(req, res, next));

// 4. Connect to database per request
app.use(async (req, res, next) => {
  try {
    await ConnectDB();
    next();
  } catch (err) {
    console.error("DB connection error:", err.message);
    next(err);
  }
});

app.use("/api/Anime-list", al_Routes);

// 5. Global Error Handler with CORS safety
app.use((err, req, res, next) => {
  console.error("API Error:", err);
  res.status(500).json({ message: err.message || "Server error" });
});

export default app;