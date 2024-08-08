import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext.js";

const Sidebar = ({ isSidebarOpen, handleCheckClicked }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`d-flex ${isSidebarOpen ? "d-block" : "d-none"}`}
        style={{
          width: "215px",
          minHeight: "100vh",
          marginTop: "70px", // Adjust to avoid overlap with the navbar
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "900",
          transition: "transform 0.3s ease",
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          backgroundColor: "#003135", // Set sidebar background color
        }}
      >
        <ul className="nav flex-column mt-4">
          <li className="nav-item" onClick={() => handleCheckClicked("Home")}>
            <Link className="nav-link text-light" to="/dasem">
              <i className="fas fa-tachometer-alt me-2 text-primary"></i>
              Dashboard
            </Link>
          </li>
          <li className="nav-item" onClick={() => handleCheckClicked("Work")}>
            <a className="nav-link text-light" href="#">
              <i className="fas fa-tasks me-2 text-success"></i>Work
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-light"
              onClick={() => handleCheckClicked("Leave")}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-calendar-alt me-2 text-warning"></i>Leave
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-light"
              onClick={() => navigate("/Chatt")}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-comments me-2 text-info"></i>Communication
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-light"
              onClick={logout}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-sign-out-alt me-2 text-danger"></i>Logout
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
