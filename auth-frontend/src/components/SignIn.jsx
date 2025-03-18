import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/auth.css"; // ✅ Uses global styles

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8081/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error("Invalid credentials. Please try again.");

            const data = await response.json();

            if (data.token) {
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("role", data.redirectUrl === "/admin_dash" ? "ADMIN" : "USER");
                localStorage.setItem("isVerified", "true");

                toast.success("Login Successful! Redirecting...");

                setTimeout(() => navigate(data.redirectUrl), 1000);
            } else if (data.redirectUrl === "/verify-otp") {
                localStorage.setItem("email", email);
                localStorage.setItem("isVerified", "false");

                toast.info("OTP Sent! Redirecting to Verification...");

                setTimeout(() => navigate("/verify-otp"), 1000);
            } else {
                toast.error("Something went wrong. Please try again.");
                setLoading(false);
            }
        } catch (err) {
            toast.error(err.message);
            setLoading(false);
        }
    };

    // ✅ Redirect to OAuth providers
    const handleGoogleSignIn = () => {
        window.location.href = "http://localhost:8081/oauth2/authorization/google";
    };

    const handleGitHubSignIn = () => {
        window.location.href = "http://localhost:8081/oauth2/authorization/github";
    };

    const handleDiscordSignIn = () => {
        window.location.href = "http://localhost:8081/oauth2/authorization/discord";
    };

    return (
        <div className="auth-container">
            <ToastContainer />
            <h2>Sign In</h2>
            {loading ? <p>Redirecting...</p> : (
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" disabled={loading}>
                        {loading ? "Processing..." : "Sign In"}
                    </button>
                </form>
            )}

            {/* OR Separator */}
            <div className="or-separator">or sign in with</div>

            {/* Social Login Section */}
            <div className="social-login">
                <button className="social-icon google" onClick={handleGoogleSignIn}>
                    <i className="fab fa-google"></i>
                </button>
                <button className="social-icon discord" onClick={handleDiscordSignIn}>
                    <i className="fa-brands fa-discord"></i>
                </button>
                <button className="social-icon github" onClick={handleGitHubSignIn}>
                    <i className="fab fa-github"></i>
                </button>
            </div>

            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    );
};

export default SignIn;
