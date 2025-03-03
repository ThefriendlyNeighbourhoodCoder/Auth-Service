import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        const role = localStorage.getItem("role");

        if (!token || !role) {
            console.error("⚠️ No JWT or Role found. Redirecting to SignIn...");
            navigate("/signin");
            return;
        }

        // ✅ Redirect based on role
        navigate(role === "ADMIN" ? "/admin_dash" : "/user_dash");
    }, [navigate]);

    return <p>Redirecting...</p>;
};

export default Dashboard;
