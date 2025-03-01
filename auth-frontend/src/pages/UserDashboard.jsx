import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/signin");

        fetch("http://localhost:8081/user/data", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setUserData(data))
        .catch(() => navigate("/signin"));
    }, [navigate]);

    return (
        <div className="user-dashboard">
            <h1>User Dashboard</h1>
            {userData ? <p>Welcome, {userData.fullName}!</p> : <p>Loading...</p>}
        </div>
    );
};

export default UserDashboard;
