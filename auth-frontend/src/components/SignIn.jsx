import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/signin.css"; // Import styles

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/auth/login", formData, {
                headers: { "Content-Type": "application/json" },
            });

            localStorage.setItem("token", response.data); // Store JWT token
            setMessage("✅ Login successful!");
            
            setTimeout(() => navigate("/dashboard"), 1000); // Redirect to dashboard
        } catch (error) {
            setMessage("❌ Error: " + (error.response?.data || "Failed to log in"));
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            {message && <p className="message">{message}</p>}
            <p className="switch-auth">Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    );
};

export default SignIn;
