import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuthRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log("🔄 OAuthRedirect: Processing Query Params...");

        // ✅ Extract token & role from URL
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const role = params.get("role");

        if (token && role) {
            console.log("✅ OAuth Success! Storing JWT:", token);
            
            // ✅ Store in localStorage
            localStorage.setItem("jwt", token);
            localStorage.setItem("role", role);

            // ✅ Force reload so App.jsx detects changes
            window.location.href = role === "ADMIN" ? "/admin_dash" : "/user_dash";
        } else {
            console.error("⚠️ OAuthRedirect: Missing Token or Role!");
            navigate("/signin");
        }
    }, [location, navigate]);

    return <p>Processing OAuth login...</p>;
};

export default OAuthRedirect;
