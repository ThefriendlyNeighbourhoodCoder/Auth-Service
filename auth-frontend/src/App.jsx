import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";

const App = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token"); // ✅ Remove JWT token
        navigate("/signin"); // ✅ Redirect user to Signin page
    };

    return (
        <div>
            <nav>
                {!token ? (
                    <>
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/signin">Sign In</Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </>
                )}
            </nav>

            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<SignIn />} />
            </Routes>
        </div>
    );
};

export default App;
