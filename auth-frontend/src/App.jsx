import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import AuthSuccess from "./components/AuthSuccess";
import Navbar from "./components/Navbar";

function App() {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        const userRole = localStorage.getItem("role");

        if (token) {
            setIsAuthenticated(true);
            setRole(userRole);
        } else {
            setIsAuthenticated(false);
            setRole(null);
        }
    }, [location]); // ✅ Runs when the route changes to update auth status.

    const hideNavbar = location.pathname === "/signin" || location.pathname === "/signup";

    return (
        <>
            {isAuthenticated && !hideNavbar && <Navbar />} {/* ✅ Navbar only for authenticated users */}
            <Routes>
                {/* ✅ Redirect unauthenticated users visiting `/` to `/signin` */}
                <Route path="/" element={isAuthenticated ? <Navigate to={role === "ADMIN" ? "/admin_dash" : "/user_dash"} /> : <Navigate to="/signin" />} />

                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin_dash" element={<AdminDashboard />} />
                <Route path="/user_dash" element={<UserDashboard />} />
                <Route path="/auth-success" element={<AuthSuccess />} />

                {/* ✅ Default route: Redirect unknown routes to `/signin` */}
                <Route path="*" element={<Navigate to="/signin" />} />
            </Routes>
        </>
    );
}

export default App;
