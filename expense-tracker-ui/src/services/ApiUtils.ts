import axios from "axios";

const BASE_API_URL: string = "http://localhost:8082/api/v1";

const api = axios.create({
  baseURL: BASE_API_URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
