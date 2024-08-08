import React, { useState } from "react";

const NavigationBar = ({ toggleSidebar }) => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light shadow-sm px-5 w-full"
        style={{
          position: "fixed",
          width: "100%",
          top: "0",
          zIndex: "900",
          padding: "0.8rem 0.3rem", // Adjust padding to increase height
          fontSize: "1.2rem",
          backgroundColor: "#003135", // Set navbar background color
        }}
      >
        <button
          className="btn btn-outline-secondary me-2"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars"></i>
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <h3 style={{ marginLeft: "11rem", color: "#ffffff" }}>
          Employee Management
        </h3>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item position-relative">
              <a className="nav-link" href="#">
                <i className="fas fa-bell" style={{ color: "#ffffff" }}></i>
                <span
                  className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle"
                  style={{
                    fontSize: "0.75rem",
                    width: "1.5rem",
                    height: "1.5rem",
                    lineHeight: "1rem",
                    zIndex: 1200, // Ensures it's above other elements
                    color: "#ffffff", // Set badge text color to white
                  }}
                >
                  2
                </span>
              </a>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary ms-3">Start</button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
