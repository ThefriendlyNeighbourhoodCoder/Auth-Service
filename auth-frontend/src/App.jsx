import { Routes, Route, useLocation } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Navbar from "./components/Navbar";

function App() {
    const location = useLocation();
    const hideNavbar = location.pathname === "/signin" || location.pathname === "/signup";

    return (
        <>
            {!hideNavbar && <Navbar />} {/* ✅ Only show Navbar after login */}
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin_dash" element={<AdminDashboard />} />
                <Route path="/user_dash" element={<UserDashboard />} />
                <Route path="*" element={<SignIn />} /> {/* ✅ Default Route */}
            </Routes>
        </>
    );
}

export default App;
