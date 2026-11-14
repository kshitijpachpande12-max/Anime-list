import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDB } from "./config/DB.js";
import al_Routes from "./routes/al_Routes.js";

dotenv.config();

const app = express();

// 1. CORS MUST BE FIRST
const allowedOrigins = [
  "https://anime-list-mkbr.vercel.app",
  "http://localhost:5173",
  process.env.CLIENT_URL, // optional extra frontend URL
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// 2. Health check (before Sentinel and DB so platform probes stay cheap
//    and don't pollute your telemetry)
app.get("/health", (req, res) => res.json({ status: "ok" }));

// 3. Load Sentinel safely (never crashes the app)
let sentinelMiddleware = (req, res, next) => next();
try {
  if (process.env.SENTINEL_API_KEY && process.env.SENTINEL_PROJECT_ID) {
    const { default: sentinel } = await import("sentinel-telemetry-agent");
    sentinel.init({
      serviceName: "Anime List",
      apiKey: process.env.SENTINEL_API_KEY,
      projectId: process.env.SENTINEL_PROJECT_ID,
      serverUrl:
        process.env.SENTINEL_SERVER_URL ||
        "https://sentinel-rosy-three.vercel.app",
      // serverless mode only on Vercel; containers keep normal heartbeats
      serverless: !!process.env.VERCEL,
    });
    sentinelMiddleware = sentinel.middleware();
  } else {
    console.warn("[Sentinel] Credentials not set, telemetry disabled");
  }
} catch (err) {
  console.warn("[Sentinel] Running in passive fallback mode:", err.message);
}

app.use((req, res, next) => sentinelMiddleware(req, res, next));

// 4. Connect to database (ConnectDB should cache the connection)
app.use(async (req, res, next) => {
  try {
    await ConnectDB();
    next();
  } catch (err) {
    console.error("DB connection error:", err.message);
    next(err);
  }
});

// 5. Routes
app.use("/api/Anime-list", al_Routes);

// 6. Global error handler
app.use((err, req, res, next) => {
  console.error("API Error:", err);
  res.status(500).json({ message: err.message || "Server error" });
});

// 7. Start the server everywhere except Vercel (which imports `app` itself)
const PORT = process.env.PORT || 3000;
if (process.env.VERCEL !== "1") {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;