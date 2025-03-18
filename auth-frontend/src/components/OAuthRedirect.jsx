import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            localStorage.setItem("isVerified", "true");

            // ✅ Store OAuth success message in sessionStorage (clears on reload)
            sessionStorage.setItem("oauthToast", "✅ OAuth Login Successful!");

            // ✅ Redirect to the correct dashboard
            setTimeout(() => {
                window.location.href = role === "ADMIN" ? "/admin_dash" : "/user_dash";
            }, 1000);
        } else {
            console.error("⚠️ OAuthRedirect: Missing Token or Role!");
            toast.error("⚠️ OAuth Login Failed! Redirecting to Sign-In...", { autoClose: 3000 });

            setTimeout(() => navigate("/signin"), 2000);
        }
    }, [location, navigate]);

    return (
        <div className="auth-container">
            <ToastContainer />
            <p>Processing OAuth login...</p>
        </div>
    );
};

export default OAuthRedirect;
