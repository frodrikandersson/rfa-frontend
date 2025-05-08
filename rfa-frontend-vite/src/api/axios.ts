import axios from "axios";

const URL = "https://happy-shop-api.vercel.app/api"; //replace with url provided by Vercel(as an example)

const api = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;