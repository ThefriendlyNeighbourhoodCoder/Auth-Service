import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/auth.css"; // ✅ Uses global styles

const SignUp = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        fullName: "",
        phone: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8081/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Registration failed. Please try again.");
            }

            toast.success("Account Created! Redirecting to Sign-In...", { autoClose: 3000 });

            setTimeout(() => navigate("/signin"), 2000);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    //  Redirect to OAuth providers
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
            <h2>Sign Up</h2>

            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Full Name" value={user.fullName} onChange={(e) => setUser({...user, fullName: e.target.value})} required />
                <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} required />
                <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} required />
                <input type="text" placeholder="Phone Number" value={user.phone} onChange={(e) => setUser({...user, phone: e.target.value})} required />
                <button type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Sign Up"}
                </button>
            </form>

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

            <p>Already have an account? <a href="/signin">Sign In</a></p>
        </div>
    );
};

export default SignUp;
