import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css"; // Import the new CSS file

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
        phone: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/auth/register", formData, {
                headers: { "Content-Type": "application/json" },
            });
            setMessage("✅ " + response.data);
            setTimeout(() => navigate("/signin"), 2000); // Redirect after success
        } catch (error) {
            setMessage("❌ Error: " + (error.response?.data || "Failed to register"));
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            {message && <p className="message">{message}</p>}
            <p className="switch-auth">Already have an account? <a href="/signin">Sign In</a></p>
        </div>
    );
};

export default SignUp;
