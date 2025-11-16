import React from "react";
import Sidebar from "../components/Topbar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-[#0d0d0d] text-white">
      {/* Left Sidebar */}

      {/* Right Side Content Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Top Navigation Bar */}
        <Topbar />

        {/* Main Content */}
        <div className="p-6 overflow-y-auto h-full">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;
