import axios from "axios"

const Base_url = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const api = axios.create({
    baseURL: Base_url,
});

export default api;