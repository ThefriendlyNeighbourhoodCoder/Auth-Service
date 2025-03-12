import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("🚀 Checking authentication state...");
        setTimeout(() => {
            const token = localStorage.getItem("jwt");
            const role = localStorage.getItem("role");
    
            console.log("🔍 JWT from localStorage:", token);
            console.log("🔍 Role from localStorage:", role);
    
            if (!token || !role) {
                console.error("⚠️ No JWT or Role found. Redirecting to SignIn...");
                navigate("/signin");
                return;
            }
    
            navigate(role === "ADMIN" ? "/admin_dash" : "/user_dash");
        }, 500);
    }, [navigate]);
    
    

    return <p>Redirecting...</p>;
};

export default Dashboard;
