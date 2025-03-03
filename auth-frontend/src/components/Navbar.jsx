import { useNavigate } from "react-router-dom";
import "../Styles/navbar.css"; 

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/signin";
    };

    return (
        <nav className="navbar">
            <h2 className="logo">CertifyHub</h2>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
