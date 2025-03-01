import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css"; // ✅ Global styles

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <App /> {/* ✅ Wrap the app inside BrowserRouter */}
        </Router>
    </React.StrictMode>
);
