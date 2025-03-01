import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");

        if (role !== "ADMIN") {
            navigate("/signin"); // Redirect non-admins
        }
    }, [navigate]);

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin! You have full access to CertifyHub.</p>
        </div>
    );
};

export default AdminDashboard;
