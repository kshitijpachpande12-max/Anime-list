import express from "express";
import dns from "dns";
import dotenv from "dotenv";
import { ConnectDB } from "./config/DB.js";
import al_Routes from "./routes/al_Routes.js";
import cors from "cors";

dns.setServers(['8.8.8.8','1.1.1.1']);

dotenv.config()

const PORT = process.env.PORT;
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(express.json());
app.use("/api/Anime-list",al_Routes);

ConnectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log("Server successfully running on port",PORT);
});
});

