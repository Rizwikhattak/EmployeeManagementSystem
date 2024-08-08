import React, { useState, useEffect, useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavigationBar from "../Navbar/NavigationBar";
import Sidebar from "./Sidebar";
import Home from "./Home";
import LeaveManagement from "../LeaveManagementModule/LeaveManagment";
import WorkManagement from "../WorkManagementModule/WorkManagement";

const Dasem = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [checkClicked, setCheckClicked] = useState("Home");
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  function handleCheckClicked(val) {
    setCheckClicked(val);
  }

  return (
    <div className="overflow-hidden overflow-x-hidden d-flex flex-column w-full">
      {/* Navbar */}
      <div className="row w-[100%]">
        <NavigationBar toggleSidebar={toggleSidebar} />
      </div>
      {/* Sidebar */}
      <div className="row mb-4">
        <div className="col-md-2">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            handleCheckClicked={handleCheckClicked}
          />
        </div>
        <div className="col-md-10">
          {/* Main content area */}
          {checkClicked === "Home" && <Home isSidebarOpen={isSidebarOpen} />}
          {checkClicked === "Leave" && <LeaveManagement />}
          {checkClicked === "Work" && <WorkManagement />}
        </div>
      </div>
    </div>
  );
};

export default Dasem;
