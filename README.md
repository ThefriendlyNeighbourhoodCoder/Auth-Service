# CertifyHub - Authentication Service (Auth-Service)

🚀 **CertifyHub** is a full-featured authentication system built with **Spring Boot** (backend) and **React + Vite** (frontend). It supports **JWT-based authentication, OAuth login (Google, GitHub, Discord), and role-based access control (RBAC).**

## 🔹 Features Implemented

### ✅ Backend (Spring Boot)
- **JWT Authentication** – Secure login and token-based authentication.
- **OAuth Authentication** – Google, GitHub, and Discord login.
- **RBAC (Role-Based Access Control)** – Separate User/Admin access.
- **Sessionless Security** – Stateless API with Spring Security.
- **Password Encryption** – Secure hashing with BCrypt.
- **User Management** – Store user details in MySQL.
- **Token Blacklisting** – Prevents JWT reuse after logout.

### ✅ Frontend (React + Vite)
- **Modern UI** – Fully responsive with `auth.css`.
- **Role-Based Navigation** – Redirects users/admins correctly.
- **Secure LocalStorage Handling** – Stores JWT & role safely.
- **OAuth Redirection Handling** – Ensures smooth Google/GitHub login experience.
- **Dashboard System** – User/Admin dashboards with session validation.
- **Protected Routes** – Prevents unauthorized access.

## 🚀 Tech Stack

### 🔹 Backend
- **Spring Boot 3.4.3**
- **Spring Security 6.x**
- **OAuth2 Client**
- **JWT (Json Web Token)**
- **Hibernate + JPA (MySQL)**
- **Maven**
- **Lombok**

### 🔹 Frontend
- **React 18 + Vite**
- **React Router DOM**
- **Tailwind CSS / Custom CSS**
- **FontAwesome (Icons)**
- **LocalStorage (Token Storage)**

## 📌 Installation Guide

### 🔹 Backend Setup

Clone the repository:
```bash
git clone https://github.com/yourusername/certifyhub-auth-service.git
cd certifyhub-auth-service/auth-backend
```

Configure database in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/certifyhub
spring.datasource.username=root
spring.datasource.password=yourpassword
```

Run the backend using Maven:
```bash
mvn spring-boot:run
```

Backend should be running at [http://localhost:8081/](http://localhost:8081/).

### 🔹 Frontend Setup

Navigate to the frontend folder:
```bash
cd ../auth-frontend
```

Install dependencies:
```bash
npm install
```

Start the frontend:
```bash
npm run dev
```

Frontend should be running at [http://localhost:5173/](http://localhost:5173/).

## 🛠️ API Endpoints

### 🔹 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login` | Login user, returns JWT |
| POST   | `/auth/logout` | Logs out user, blacklists JWT |
| GET    | `/oauth2/authorization/google` | Redirects to Google OAuth |
| GET    | `/oauth2/authorization/github` | Redirects to GitHub OAuth |
| GET    | `/oauth2/authorization/discord` | Redirects to Discord OAuth |

### 🔹 User API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/user/data` | Fetch logged-in user data |

## 📌 Project Folder Structure

```bash
CertifyHub/
│── auth-service/        # Spring Boot backend
│   ├── src/main/java/com/certihub/auth/
│   │   ├── controller/  # API Controllers
│   │   ├── service/     # Business Logic
│   │   ├── model/       # Entities (User, Role)
│   │   ├── repository/  # Database Access
│   │   ├── security/    # JWT & OAuth Config
│── auth-frontend/       # React + Vite frontend
│   ├── src/
│   │   ├── components/  # UI Components
│   │   ├── pages/       # Dashboard, SignIn, SignUp
│   │   ├── styles/      # CSS Styles
```

## 🔍 Next Steps & Enhancements

🔜 **LinkedIn OAuth Integration**  
🔜 **Email Verification after Signup**  
🔜 **Multi-Factor Authentication (MFA)**  
🔜 **Refresh Token Implementation**  
🔜 **Admin Panel for User Management**  
🔜 **Role & Permission Management UI**  

## 📌 Contributors
👤 **Akash Patra**  
🔗 [GitHub](https://github.com/ThefriendlyNeighbourhoodCoder) | [LinkedIn](https://www.linkedin.com/in/akash-patra04/)  

## 🚀 Ready to Contribute?

We welcome contributions!  
Feel free to **fork the repo and submit pull requests**. 🎯  


⚡ **Star ⭐ the Repository If You Like It!**
