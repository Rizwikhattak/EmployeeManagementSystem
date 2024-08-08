import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/AuthenticationModule/login";
import Signup from "./Components/AuthenticationModule/signup";
import Dasem from "./Components/MainPage/dasem";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import LeaveManagment from "./Components/LeaveManagementModule/LeaveManagment";
import ChatApp from "./Components/ChattingModule/chatapp";
import Navbar from "./Components/AuthenticationModule/navbar";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<ProtectedRoute element={<Login />} />}
          />
          <Route
            path="/dasem"
            element={<ProtectedRoute element={<Dasem />} />}
          />
          <Route
            path="/leavemanagement"
            element={<ProtectedRoute element={<LeaveManagment />} />}
          />
          <Route
            path="/Chatt"
            element={<ProtectedRoute element={<ChatApp />} />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
