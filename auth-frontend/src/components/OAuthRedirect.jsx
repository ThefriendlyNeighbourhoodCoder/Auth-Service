import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("🌍 Full URL:", window.location.href);
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            console.log("✅ OAuth Token Captured:", token);

            // ✅ Store token before navigating
            localStorage.setItem("jwt", token);

            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                console.log("🔑 Decoded JWT:", payload);

                const role = payload.role;
                localStorage.setItem("role", role);

                // ✅ Ensure token is stored before navigating
                setTimeout(() => {
                    navigate(role === "ADMIN" ? "/admin_dash" : "/user_dash");
                }, 100); // Small delay to ensure token is stored
            } catch (error) {
                console.error("⚠️ Error decoding JWT:", error);
                navigate("/signin");
            }
        } else {
            console.error("⚠️ No token found in URL");
            navigate("/signin");
        }
    }, [navigate]);

    return <p>Redirecting...</p>;
};

export default OAuthRedirect;
