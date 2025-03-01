import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8081",
});

// Attach token automatically to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ✅ Handle Unauthorized (401) Responses - Auto Logout on Expired Token
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token"); // ✅ Remove invalid token
            window.location.href = "/signin"; // ✅ Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default API;
