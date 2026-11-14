import axios from "axios";

const Base_url =
    import.meta.env.MODE === "development"
        ? "http://localhost:5001/api"
        : "https://anime-list-68517.containers.snapdeploy.app/api";

const api = axios.create({
    baseURL: Base_url,
});

export default api;
