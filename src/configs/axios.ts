import axios from "axios";

console.log("API_URL_INSTANCE", import.meta?.env);
export const axiosInstance = axios.create({
  baseURL: import.meta?.env?.VITE_API_URL || "http://localhost:3000",
});
