import { useNavigate } from "react-router-dom";
import "../Styles/navbar.css"; 

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("role");
        sessionStorage.clear();  // Clears all session storage
        document.cookie.split(";").forEach(cookie => { 
            document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        }); // Clears all cookies
    
        window.location.href = "/signin"; // 🔄 Force reload to clear everything
    };
    

    return (
        <nav className="navbar">
            <h2 className="logo">CertifyHub</h2>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
