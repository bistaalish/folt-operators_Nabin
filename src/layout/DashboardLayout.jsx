import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex bg-[#1a1a1a] min-h-screen text-white">
      
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Content Area */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
