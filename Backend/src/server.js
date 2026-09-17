import express from "express";
import dns from "dns";
import dotenv from "dotenv";
import { ConnectDB } from "./config/DB.js";
import al_Routes from "./routes/al_Routes.js";
import cors from "cors";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/Anime-list", al_Routes);

ConnectDB();

export default app;