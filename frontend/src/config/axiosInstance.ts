import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://newsapi.org/v2/everything",
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": import.meta.env.VITE_NEWS_API_KEY,
  },
});
