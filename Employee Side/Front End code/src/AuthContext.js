import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("session_token");
    const storedUserId = localStorage.getItem("user_id");

    if (token && storedUserId) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("userId:", userId);
    console.log("isAuthenticated:", isAuthenticated);
  }, [userId, isAuthenticated]);

  const login = (token, id) => {
    localStorage.setItem("session_token", token);
    localStorage.setItem("user_id", id);
    setIsAuthenticated(true);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("session_token");
    localStorage.removeItem("user_id");
    setIsAuthenticated(false);
    setUserId(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, userId, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
