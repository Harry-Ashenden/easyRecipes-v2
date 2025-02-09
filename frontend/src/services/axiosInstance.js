import axios from "axios";
import { supabase } from "../hooks/useAuth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  timeout: 10000,
});

// Attach token 
axiosInstance.interceptors.request.use(async (config) => {
  
    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;
