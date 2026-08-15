import mongoose from "mongoose";
import dotenv from "dotenv";

export async function ConnectDB() {
    try {
        mongoose.connect(process.env.DB_url);
        console.log("Database connected successfully");   
    } catch (error) {
        console.error("Issue connecting to the database",error);
        process.exit(1);
    }
};