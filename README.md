# 🚀 CertifyHub - Authentication System

## 📌 Project Overview
CertifyHub is a **secure authentication system** built using:
- **Backend:** Spring Boot (Java), MySQL, JWT authentication.
- **Frontend:** React (Vite), React Router, Tailwind/CSS.

The project includes **user authentication, role-based access control (RBAC), and secure logout** with a clean and responsive UI.

---

## ✅ Features Implemented
### **1️⃣ Authentication System**
✔️ **User Signup & Login** with JWT authentication.  
✔️ **Password Encryption** using `BCryptPasswordEncoder`.  
✔️ **JWT Token-Based Authorization** for secure API access.  

### **2️⃣ Role-Based Access Control (RBAC)**
✔️ **Admin & User Roles** (`ADMIN`, `USER`).  
✔️ **Protected Routes** (`/admin_dash`, `/user_dash`).  
✔️ **Role-Based Redirection** (Admins → `/admin_dash`, Users → `/user_dash`).  

### **3️⃣ Secure Logout**
✔️ **Logout clears JWT token** and redirects to `/signin`.  
✔️ **Blacklisted JWT tokens to prevent reuse**.  

### **4️⃣ Responsive & Clean UI**
✔️ Improved **SignIn & SignUp UI** with better styling.  
✔️ **Navbar appears only after login**, following real-world authentication flows.  
✔️ **Consistent & minimal global styles** (`index.css`, `app.css`).  

---

## 📌 Development Plan & Execution
1. **Backend Implementation:**
   - Implemented **Signup, Login, JWT authentication**.
   - Added **RBAC with `User` & `Admin` roles**.
   - Protected API routes in `SecurityConfig.java`.

2. **Frontend Development:**
   - Created **React UI with role-based routing**.
   - Implemented **SignIn, SignUp, Dashboard, and AdminPanel**.
   - Ensured **JWT token handling & logout**.

3. **UI Enhancements & Fixes:**
   - Cleaned up **styles, responsiveness, and structure**.
   - Fixed **Navbar visibility (only after login)**.

---

## 🔮 Future Development Plans
### **🛠 Backend Enhancements**
- **✅ Implement Email Verification** (send confirmation email after signup).  
- **✅ Refresh Tokens** (JWT token expiration with auto-refresh).  
- **✅ Social Login Integration** (Google & LinkedIn OAuth).  

### **🎨 Frontend UI Enhancements**
- **Better Dashboard UI** (Graphical Data, Charts, and Widgets).  
- **Dark Mode Toggle** for better user experience.  

### **⚡ Performance Optimization**
- Improve **API response times** using caching techniques.  
- Optimize **database queries** for faster role-based access.  

---

## 🚀 Future Features
- **📩 Multi-Factor Authentication (MFA)**
- **🛡️ Account Locking After Multiple Failed Logins**
- **📊 User Analytics & Activity Logs**
- **🔄 Password Reset via Email**
- **🖼️ Profile Picture Uploads**
- **📱 Mobile-Friendly UI Enhancements**

---

## 🛑 Open Issues & Fixes Needed
1. **⚠️ JWT Token Visibility Issue**  
   - We originally planned to display the JWT token on the dashboard, but we later **dropped this feature** as it was unnecessary.

2. **⚠️ UI Overlap Issues**  
   - We experienced **style overlapping** due to global CSS (`index.css` & `app.css`).  
   - We **fixed this by keeping global styles minimal** and moving styles into individual components.

3. **⚠️ White Screen Issue**  
   - We **fixed duplicate `<Router>` errors** by wrapping the app inside a single `<Router>` in `main.jsx`.

4. **⚠️ Navbar Visibility Issue**  
   - The **Navbar was always visible**, even before login.  
   - We **fixed this by hiding it on `/signin` and `/signup` pages**.

---

## 💡 How to Run the Project
### **🖥️ Backend (Spring Boot)**
1. **Navigate to the backend folder**  
   ```sh
   cd auth-service
2. **Run the Spring Boot Application**
    ```sh
    mvn clean spring-boot:run

### **🌐 Frontend (React + Vite)**
1. **Navigate to the frontend folder**
    ```sh
    cd auth-frontend
2. **Install dependencies**
    ```sh
    npm install
3. **Start the React App**
    ```sh
    npm run dev
4. **Open Browser**
  Visit: http://localhost:5173

### **💬 Contributing & Issues**
If you encounter any bugs, feature requests, or UI issues, feel free to open an issue or submit a pull request. 🚀



### **🎯 Final Notes**
This project is an excellent starting point for role-based authentication in React & Spring Boot. With future enhancements like OAuth, MFA, and user analytics, it will evolve into a fully scalable authentication system. 💡🔥

##### *Made with ❤️ by the CertiHub Team*
## Authors

- [Akash Patra](https://github.com/ThefriendlyNeighbourhoodCoder)
- [Nayan Adhikary](https://github.com/Nayan-Adhikari)

