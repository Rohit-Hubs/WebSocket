import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ ADD THIS

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="197646807484-25cqldbcpkevgfatc0v7muvc1r0qfca0.apps.googleusercontent.com">
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);