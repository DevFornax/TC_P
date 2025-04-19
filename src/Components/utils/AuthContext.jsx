// src/context/AuthContext.js
import { createContext, useEffect, useState } from "react";
// import { getAuthData, clearAuthData } from "../authStorage";

import { getAuthData , clearAuthData } from "./authStorage";

// Function to decode the JWT token manually without `jwt-decode`
const decodeJWT = (token) => {
  // Split the JWT into its three parts: Header, Payload, Signature
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid JWT token format");
  }

  // Handle base64Url padding (JWT uses a slightly different base64 encoding)
  const base64Url = parts[1]; // The payload (middle part of the JWT)
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Convert to regular base64

  // Decode the base64 string and parse it into JSON
  const jsonPayload = atob(base64); // Use native `atob` for base64 decoding
  return JSON.parse(jsonPayload);
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authData = getAuthData();
    if (authData?.token) {
      try {
        // Decode the JWT token manually
        const decoded = decodeJWT(authData.token);
        const now = Date.now();
        const isExpired = decoded.exp * 1000 < now; // Check if token is expired

        if (isExpired) {
          handleLogout();
        } else {
          setUser(authData.user);

          const timeLeft = decoded.exp * 1000 - now;
          const timeout = setTimeout(() => {
            handleLogout();
          }, timeLeft);

          return () => clearTimeout(timeout);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    clearAuthData();
    setUser(null);
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
