import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.API_URL ||
    import.meta.env.VITE_APP_API_URL ||
    "http://localhost:3000",
});
