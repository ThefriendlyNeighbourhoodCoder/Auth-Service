import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(true); // Prevent double execution

    useEffect(() => {
        if (!processing) return;
        
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");
        const role = queryParams.get("role");

        console.log("🔍 Extracted Token:", token);
        console.log("🔍 Extracted Role:", role);

        if (token && role) {
            localStorage.setItem("jwt", token);
            localStorage.setItem("role", role);
            console.log("✅ JWT and Role stored in localStorage.");
            
            setTimeout(() => {
                navigate(role === "ADMIN" ? "/admin_dash" : "/user_dash");
            }, 500); // Add delay before redirecting
        } else {
            console.error("⚠️ Missing token or role. Redirecting to SignIn...");
            navigate("/signin");
        }

        setProcessing(false); // Prevent effect from running twice
    }, [navigate, processing]);

    return <p>Processing authentication...</p>;
};

export default AuthSuccess;
