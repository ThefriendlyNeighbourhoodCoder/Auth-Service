import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        fullName: "",
        phone: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:8081/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            setSuccess("User registered successfully! Redirecting...");
            setTimeout(() => navigate("/signin"), 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Full Name" value={user.fullName} onChange={(e) => setUser({...user, fullName: e.target.value})} required />
                <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} required />
                <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} required />
                <input type="text" placeholder="Phone Number" value={user.phone} onChange={(e) => setUser({...user, phone: e.target.value})} required />
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/signin">Sign In</a></p>
        </div>
    );
};

export default SignUp;
