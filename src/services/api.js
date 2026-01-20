import axios from "axios";

const api = axios.create({
  baseURL: "https://frontend-latest-mdz1.onrender.com/", // Update this if your backend is on a different port
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
