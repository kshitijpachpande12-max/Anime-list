import express from "express";
import dns from "dns";
import dotenv from "dotenv";
import { ConnectDB } from "./config/DB.js";
import al_Routes from "./routes/al_Routes.js";
import cors from "cors";
import sentinel from "sentinel-telemetry-agent";

sentinel.init({
  serviceName: 'Anime LIst',                   // Whatever name you want shown on the dashboard
  apiKey: '01M7D7Y9D9ZDD4XQC4Z640MQPX',                  // Copied from Sentinel project card
  projectId: '6af8727837ed5204d0ead20a',                    // Copied from /dashboard/<PROJECT_ID> URL
  serverUrl: 'https://sentinel-rosy-three.vercel.app', // Or http://localhost:5000 if running locally
});

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const app = express();
app.use(sentinel.middleware());
app.use(cors());
app.use(express.json());

app.use("/api/Anime-list", al_Routes);

ConnectDB();

export default app;