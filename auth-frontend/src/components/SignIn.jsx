import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8081/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error("Invalid credentials");

            const data = await response.json();
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("role", data.redirectUrl === "/admin_dash" ? "ADMIN" : "USER");

            navigate(data.redirectUrl);
        } catch (err) {
            setError(err.message);
        }
    };

    // ✅ Redirect to OAuth providers
    const handleGoogleSignIn = () => {
        window.location.href = "http://localhost:8081/oauth2/authorization/google";
    };

    const handleLinkedInSignIn = () => {
        window.location.href = "http://localhost:8081/oauth2/authorization/linkedin";
    };

    const handleGitHubSignIn = () => {
        window.location.href = "http://localhost:8081/oauth2/authorization/github";
    };

    return (
        <div className="auth-container">
            <h2>Sign In</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Sign In</button>
            </form>

            {/* ✅ OR Separator */}
            <div className="or-separator">or sign in with</div>

            {/* ✅ Social Login Section */}
            <div className="social-login">
                <button className="social-icon google" onClick={handleGoogleSignIn}>
                    <i className="fab fa-google"></i>
                </button>
                <button className="social-icon linkedin" onClick={handleLinkedInSignIn}>
                    <i className="fab fa-linkedin-in"></i>
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
