# 🚀 CertifyHub - Authentication System

## 📌 Project Overview
CertifyHub is a **secure authentication system** built using:
- **Backend:** Spring Boot (Java), MySQL, JWT authentication.
- **Frontend:** React (Vite), React Router, Tailwind/CSS.

The project includes **user authentication, social logins, role-based access control (RBAC), and secure logout** with a clean and responsive UI.

---

## ✅ Features Implemented
### **1️⃣ Authentication System**
✔️ **User Signup & Login** with JWT authentication.  
✔️ **Password Encryption** using `BCryptPasswordEncoder`.  
✔️ **JWT Token-Based Authorization** for secure API access.  
✔️ **Google OAuth Integration** for seamless social login.  

### **2️⃣ Role-Based Access Control (RBAC)**
✔️ **Admin & User Roles** (`ADMIN`, `USER`).  
✔️ **Protected Routes** (`/admin_dash`, `/user_dash`).  
✔️ **Role-Based Redirection** (Admins → `/admin_dash`, Users → `/user_dash`).  

### **3️⃣ Secure Logout & Session Handling**
✔️ **Logout fully clears JWT token** and redirects to `/signin`.  
✔️ **Fix for previous user session persisting after logout**.  
✔️ **Full page refresh after OAuth login/logout**.  

### **4️⃣ UI & User Experience Enhancements**
✔️ **Improved SignIn & SignUp UI** with modern design.  
✔️ **Fully integrated Google OAuth login with proper branding**.  
✔️ **LinkedIn & GitHub login buttons added (awaiting backend implementation).**  
✔️ **Social login buttons now match professional web standards**.  
✔️ **Navbar appears only after login**, following real-world authentication flows.  

---

## 📌 Development Plan & Execution
### **✅ Backend Implementation**
1. **Implemented Password-Based Authentication**
   - Secure signup & login with `BCryptPasswordEncoder` and JWT.
   - Role-based authorization (`ADMIN`, `USER`).

2. **Added Google OAuth 2.0 Authentication**
   - Users can log in with Google.
   - First-time Google users are automatically created in the database.
   - Proper JWT token generation & storage.

3. **Fixed Logout & Session Management**
   - Ensured **full logout (clears JWT, localStorage, session)**.
   - Fixed issue where **previous user session persisted**.

---

## 🔮 Future Development Plans
### **🛠 Backend Enhancements**
- **🔄 Implement LinkedIn & GitHub OAuth 2.0** for social login.  
- **📩 Implement Email Verification** (send confirmation email after signup).  
- **🔄 Refresh Tokens** (JWT token expiration with auto-refresh).  

### **🎨 Frontend UI Enhancements**
- **Improve Dashboard UI** (Charts, Widgets, Graphs).  
- **Dark Mode Toggle** for better user experience.  
- **Enhance Mobile Responsiveness** for authentication pages.  

### **⚡ Security & Performance Optimization**
- **Multi-Factor Authentication (MFA)** via OTP.  
- **Account Locking After Multiple Failed Logins**.  
- **Implement Password Reset via Email**.  
- **Optimize API performance & caching mechanisms**.  

---

## 🚀 Future Features
- **🔐 Multi-Factor Authentication (MFA)**
- **🔄 Refresh Token Implementation**
- **📊 User Analytics & Activity Logs**
- **🔄 OAuth for LinkedIn & GitHub**
- **🛡️ Security Hardening (Rate Limiting, Brute Force Protection)**
- **🖼️ Profile Picture Uploads**
- **📱 Mobile-Friendly UI Enhancements**

---

## 🛑 Open Issues & Fixes Needed
1. **⚠️ LinkedIn & GitHub OAuth Not Implemented Yet**  
   - Social login buttons exist but backend OAuth processing is pending.  
   - Users clicking **LinkedIn/GitHub** are not redirected to an actual OAuth provider yet.  

2. **⚠️ Email Verification Not Yet Implemented**  
   - Users can log in immediately after signup.  
   - We need to send a **verification email** before allowing login.  

3. **⚠️ Password Reset Feature Pending**  
   - No password reset functionality exists yet.  
   - Need to implement **forgot password via email** flow.  

---

## 💡 How to Run the Project
### **🖥️ Backend (Spring Boot)**
1. **Navigate to the backend folder**  
   ```sh
   cd auth-service
Run the Spring Boot Application
sh
Copy
Edit
mvn clean spring-boot:run
🌐 Frontend (React + Vite)
Navigate to the frontend folder
sh
Copy
Edit
cd auth-frontend
Install dependencies
sh
Copy
Edit
npm install
Start the React App
sh
Copy
Edit
npm run dev
Open Browser Visit: http://localhost:5173

### **💬 Contributing & Issues**
If you encounter any bugs, feature requests, or UI issues, feel free to open an issue or submit a pull request. 🚀

### **🎯 Final Notes**
This project is an excellent starting point for secure, scalable authentication in React & Spring Boot. With upcoming enhancements like OAuth for LinkedIn & GitHub, MFA, and email verification, it will evolve into a fully production-ready authentication system. 💡🔥

### **👥 Authors**
- [Akash Patra](https://github.com/ThefriendlyNeighbourhoodCoder)
- [Nayan Adhikary](https://github.com/Nayan-Adhikari)

---

### 🔥 **What's Updated?**
✅ **Includes Google OAuth 2.0 Implementation**  
✅ **Acknowledges pending LinkedIn & GitHub OAuth work**  
✅ **Summarizes UI enhancements (social logins, full logout, responsive design)**  
✅ **Clearly defines next steps: Email Verification, MFA, and Security Upgrades**  

---
