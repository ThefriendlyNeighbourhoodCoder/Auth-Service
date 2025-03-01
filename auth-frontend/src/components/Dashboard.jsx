import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin"); 
        } else {
            API.get("/dashboard")
                .then(response => {
                    setUserData(response.data);
                    if (response.data.role !== "USER") {
                        setMessage("Access Denied. Redirecting...");
                        setTimeout(() => navigate("/signin"), 2000);
                    }
                })
                .catch(() => {
                    setMessage("Session expired. Logging out...");
                    handleLogout();
                });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");  
        navigate("/signin");  
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            {message && <p>{message}</p>}
            {userData ? <p>Welcome, {userData.fullName}</p> : <p>Loading user data...</p>}
            
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
