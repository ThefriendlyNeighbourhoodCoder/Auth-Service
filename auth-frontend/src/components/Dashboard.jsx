import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("🚀 Checking authentication state...");

        const token = localStorage.getItem("jwt");
        const role = localStorage.getItem("role");
        const isVerified = localStorage.getItem("isVerified") === "true"; // ✅ Convert to boolean

        console.log("🔍 JWT from localStorage:", token);
        console.log("🔍 Role from localStorage:", role);
        console.log("🔍 isVerified from localStorage:", isVerified);

        if (!token || !role) {
            console.error("⚠️ No JWT or Role found. Redirecting to SignIn...");
            navigate("/signin");
            return;
        }

        if (!isVerified) {
            console.warn("⚠️ User is not verified! Redirecting to Verify OTP...");
            navigate("/verify-otp"); // ✅ Redirect unverified users
            return;
        }

        navigate(role === "ADMIN" ? "/admin_dash" : "/user_dash"); // ✅ Redirect verified users
    }, [navigate]);

    return <p>Redirecting...</p>;
};

export default Dashboard;
