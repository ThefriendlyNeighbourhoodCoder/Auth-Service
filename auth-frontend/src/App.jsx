import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import VerifyOtp from "./components/VerifyOtp";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import AuthSuccess from "./components/AuthSuccess";
import Navbar from "./components/Navbar";

function App() {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [role, setRole] = useState(null);
    const [isVerified, setIsVerified] = useState(null);

    useEffect(() => {
        console.log("🔄 Fetching authentication state from localStorage...");
        const token = localStorage.getItem("jwt");
        const userRole = localStorage.getItem("role");
        const verifiedStatus = localStorage.getItem("isVerified") === "true"; // ✅ Ensures boolean value

        console.log("📌 JWT:", token);
        console.log("📌 Role:", userRole);
        console.log("📌 isVerified (from localStorage):", verifiedStatus);

        setIsAuthenticated(!!token);
        setRole(userRole);
        setIsVerified(verifiedStatus);

        // ✅ Fix for OAuth users (Ensure they are marked as verified)
        if (token && !verifiedStatus) {
            console.log("🟢 OAuth user detected! Marking as verified.");
            localStorage.setItem("isVerified", "true");
            setIsVerified(true);
        }
    }, [location.pathname]); // ✅ Only run when pathname changes

    useEffect(() => {
        // ✅ Check if an OAuth toast message exists in sessionStorage
        const oauthMessage = sessionStorage.getItem("oauthToast");
        if (oauthMessage) {
            toast.success(oauthMessage, { autoClose: 3000 });
            sessionStorage.removeItem("oauthToast"); // ✅ Remove after displaying
        }
    }, []);

    const hideNavbar = ["/signin", "/signup", "/verify-otp"].includes(location.pathname);

    // ✅ Prevent redirecting before state is fully initialized
    if (isAuthenticated === null || isVerified === null) {
        return <p>Loading...</p>; // ✅ Show loading until state initializes
    }

    // ✅ Correct Redirect Path
    let redirectPath = "/signin";
    if (isAuthenticated) {
        if (!isVerified) {
            console.warn("⚠️ User is NOT verified! Redirecting to Verify OTP...");
            redirectPath = "/verify-otp";
        } else {
            console.log("✅ User is verified! Redirecting to Dashboard...");
            redirectPath = role === "ADMIN" ? "/admin_dash" : "/user_dash";
        }
    }

    return (
        <>
            <ToastContainer /> {/* ✅ Ensure toast notifications are always available */}
            {isAuthenticated && isVerified && !hideNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Navigate to={redirectPath} />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin_dash" element={<AdminDashboard />} />
                <Route path="/user_dash" element={<UserDashboard />} />
                <Route path="/auth-success" element={<AuthSuccess />} />
                <Route path="*" element={<Navigate to="/signin" />} />
            </Routes>
        </>
    );
}

export default App;
