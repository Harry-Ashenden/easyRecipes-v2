import axios from "axios";

// Create a custom Axios instance
const axiosInstance = axios.create({
  baseURL:import.meta.env.VITE_AXIOS_BASE_URL,
  timeout: 10000, // Set a timeout of 10 seconds for requests
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("supabaseToken") || sessionStorage.getItem("supabaseToken");
    token = token.replace(/"/g, "");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
