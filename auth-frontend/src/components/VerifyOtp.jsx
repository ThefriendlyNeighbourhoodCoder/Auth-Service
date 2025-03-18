import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpInput from "react-otp-input";
import "../styles/auth.css"; // ✅ Ensures styling is correctly applied

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(30);
    const [resendDisabled, setResendDisabled] = useState(true);
    const navigate = useNavigate();
    const email = localStorage.getItem("email");

    useEffect(() => {
        if (!email) {
            toast.error("⚠️ No email found. Redirecting to Sign-In...");
            setTimeout(() => navigate("/signin"), 2000);
            return;
        }

        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(countdown);
    }, []);

    useEffect(() => {
        setResendDisabled(timer > 0);
    }, [timer]);

    const handleVerify = async () => {
        try {
            const response = await fetch(`http://localhost:8081/auth/verify-otp?email=${email}&otp=${otp}`, { method: "POST" });
            const data = await response.json();

            if (data.token) {
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("role", "USER");
                localStorage.setItem("isVerified", "true");

                toast.success("Email Verified! Redirecting...", { autoClose: 2000 });

                setTimeout(() => navigate("/user_dash"), 2000);
            } else {
                toast.error("Invalid OTP. Try again.");
            }
        } catch (err) {
            toast.error("Error verifying OTP. Please try again.");
        }
    };

    const handleResendOtp = async () => {
        try {
            const response = await fetch(`http://localhost:8081/auth/resend-otp?email=${email}`, { method: "POST" });
            const data = await response.text();
            toast.info(data);
            setTimer(30);
            setResendDisabled(true);
        } catch (err) {
            toast.error("Error resending OTP. Please try again.");
        }
    };

    return (
        <div className="auth-container otp-container"> 
            <ToastContainer />
            <h2>Verify Your Email</h2>
            <p>Enter the OTP sent to <b>{email}</b></p>

            {/* ✅ Fixed OTP Input for React 19 compatibility */}
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                shouldAutoFocus
                renderInput={(props, index) => <input {...props} key={index} />}
                containerStyle="otp-input-container"
                inputStyle={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.5rem",
                    fontSize: "1.5rem",
                    textAlign: "center",
                    borderRadius: "5px",
                    border: "1px solid #377fb2",
                    backgroundColor: "#1a1a2e",
                    color: "#ffffff",
                    outline: "none",
                }}
            />

            <button onClick={handleVerify} className="auth-btn">Verify</button>

            {timer > 0 ? (
                <p className="resend-text">Resend OTP in {timer}s</p>
            ) : (
                <button onClick={handleResendOtp} disabled={resendDisabled} className="resend-btn">Resend OTP</button>
            )}
        </div>
    );
};

export default VerifyOtp;
