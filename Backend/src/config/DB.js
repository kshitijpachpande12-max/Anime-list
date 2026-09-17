import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function ConnectDB() {
    try {
        await mongoose.connect(process.env.DB_url);
        console.log("Database connected successfully");   
    } catch (error) {
        console.error("Issue connecting to the database",error);
        process.exit(1);
    }
};