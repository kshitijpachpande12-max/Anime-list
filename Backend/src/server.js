import express from "express";
import dns from "dns";
import dotenv from "dotenv";
import { ConnectDB } from "./config/DB.js";
import al_Routes from "./routes/al_Routes.js";
import cors from "cors";
import path from "path";

dns.setServers(['8.8.8.8','1.1.1.1']);

dotenv.config()

const PORT = process.env.PORT;
const app = express();
const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}

app.use(express.json());
app.use("/api/Anime-list",al_Routes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")));

    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../Frontend/dist","index.html"));
    });
}

ConnectDB().then(()=>{
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

