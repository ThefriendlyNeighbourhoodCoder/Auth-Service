import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css"; // ✅ Updated styles

const Dashboard = () => {
    const [role, setRole] = useState(null);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("role");

        if (!token) {
            navigate("/signin");
        } else {
            setRole(userRole);

            fetch("http://localhost:8081/user/data", {
                headers: { "Authorization": `Bearer ${token}` }
            })
            .then(res => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then(data => setUserData(data))
            .catch(() => navigate("/signin"));
        }
    }, [navigate]);

    if (!role) return <h2>Loading...</h2>;

    return (
        <div className="dashboard">
            <h1>Welcome to the {role === "ADMIN" ? "Admin" : "User"} Dashboard</h1>
            {userData ? (
                <div className="user-info">
                    <p><strong>Name:</strong> {userData.fullName}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Dashboard;
