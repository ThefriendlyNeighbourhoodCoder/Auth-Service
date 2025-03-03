import axios from "axios";

// ✅ Create an Axios instance with default settings
const axiosInstance = axios.create({
    baseURL: "http://localhost:8081", // ✅ Replace with your backend URL
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Interceptor to attach JWT token to requests automatically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
