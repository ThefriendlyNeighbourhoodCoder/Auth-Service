
# Authentication System – README.md

## 📌 Overview
This project is a full-fledged authentication system built with **React (frontend)** and **Spring Boot (backend)**. It supports **password-based authentication, OAuth login, OTP-based email verification**, and includes **role-based access control (RBAC)** for Admin and User dashboards.

## ✅ Features Implemented

### 🔹 1. Password-Based Authentication
✔ **User Registration** – Sign up with email, password, full name, and phone number.  
✔ **JWT-Based Authentication** – Secure login with token storage in `localStorage`.  
✔ **Role-Based Access Control (RBAC)** – Separate User & Admin dashboards.  

### 🔹 2. OTP-Based Email Verification
✔ **Unverified users are redirected to** `/verify-otp`.  
✔ **OTP is sent to registered email** for verification.  
✔ **Resend OTP option** with security measures.  
✔ **Users cannot log in without verification.**  

### 🔹 3. OAuth-Based Authentication
✔ **Google, GitHub, and Discord login support.**  
✔ **OAuth users are automatically marked as verified.**  
✔ **JWT token is issued after successful OAuth login.**  

### 🔹 4. Logout & Security
✔ **Clicking logout clears JWT and redirects to** `/signin`.  
✔ **Protected routes** (users cannot access dashboards without login).  
✔ **Unauthorized access redirects to** `/signin`.  

### 🔹 5. UI & UX Enhancements
✔ **Global toast notifications** for better user feedback.  
✔ **Optimized state management** for smooth navigation.  
✔ **Navbar appears only for logged-in users.**  
✔ **Modern and responsive UI design.**  

## 🔹 6. API Endpoints (Backend)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/register` | POST | Register a new user |
| `/auth/login` | POST | Login with email & password |
| `/auth/verify-otp` | POST | Verify OTP for email confirmation |
| `/auth/resend-otp` | POST | Resend OTP to email |
| `/oauth2/authorization/{provider}` | GET | Redirect to OAuth provider (Google, GitHub, Discord) |
| `/auth/logout` | POST | Logout user and clear session |

## 📌 Tech Stack

### Frontend (React)
✔ **React Router DOM** for navigation  
✔ **React Toastify** for notifications  
✔ **JWT Handling with `localStorage`**  
✔ **Styled components** for UI consistency  

### Backend (Spring Boot)
✔ **Spring Security + JWT** for authentication  
✔ **MySQL/PostgreSQL database integration**  
✔ **OAuth2 login via Google, GitHub, Discord**  
✔ **Email OTP service for verification**  

## 📌 How to Run Locally

### 🔹 Backend Setup

1️⃣ Clone the repository:
```sh
git clone https://github.com/your-repo/auth-service.git
```
2️⃣ Navigate to the backend folder:
```sh
cd auth-service
```
3️⃣ Install dependencies and run the Spring Boot app:
```sh
mvn clean install
mvn spring-boot:run
```

### 🔹 Frontend Setup

1️⃣ Clone the frontend repository:
```sh
git clone https://github.com/your-repo/auth-frontend.git
```
2️⃣ Navigate to the frontend folder:
```sh
cd auth-frontend
```
3️⃣ Install dependencies and start the frontend:
```sh
npm install
npm run dev
```

## 📌 Future Developments

🚀 **Upcoming Features:**  
-  **Forgot Password & Account Recovery**  
-  **User Profile & Dashboard Enhancements**  
-  **Admin Panel (User Management, Logs)**  
-  **Multi-Factor Authentication (MFA)**  
-  **Rate Limiting & Security Enhancements**  
-  **Preparing for Microservice Architecture**  




---


✨ **Feel free to contribute!** Fork the repo and submit pull requests. **Star ⭐ the repository if you like it!** 
