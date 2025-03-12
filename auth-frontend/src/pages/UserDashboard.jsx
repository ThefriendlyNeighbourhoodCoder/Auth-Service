import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        if (!token) {
            console.error("⚠️ No JWT found. Redirecting to SignIn...");
            navigate("/signin");
            return;
        }

        fetch("http://localhost:8081/user/data", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            if (res.status === 401) {
                console.error("⚠️ Unauthorized! Redirecting to SignIn...");
                navigate("/signin");
                return null;
            }
            return res.json();
        })
        .then((data) => {
            if (data) setUser(data);
        })
        .catch((err) => {
            console.error("⚠️ Error fetching user data:", err);
            navigate("/signin");
        });
    }, [navigate]);

    return (
        <div>
            <h1>User Dashboard</h1>
            {user ? (
                <p>👋 Hello, {user.fullName} ({user.email})</p>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default UserDashboard;
