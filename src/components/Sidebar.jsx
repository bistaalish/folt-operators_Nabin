import React, { useState } from "react";
import { logout } from "../utils/auth";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-[#111] text-white transition-all duration-300 
      ${open ? "w-64" : "w-16"} flex flex-col`}
    >
      {/* Toggle button */}
      <div className="flex justify-end p-3">
        <button
          onClick={() => setOpen(!open)}
          className="bg-white/10 p-2 rounded hover:bg-white/20"
        >
          {open ? "◀" : "▶"}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-6">
        <Link to="/resellers">
          <div className="p-3 hover:bg-white/10 cursor-pointer">
            {open ? "Resellers" : "R"}
          </div>
        </Link>

        <Link to="/devices">
          <div className="p-3 hover:bg-white/10 cursor-pointer">
            {open ? "Devices" : "D"}
          </div>
        </Link>

        <Link to="/users">
          <div className="p-3 hover:bg-white/10 cursor-pointer">
            {open ? "Users" : "U"}
          </div>
        </Link>

        <Link to="/services">
          <div className="p-3 hover:bg-white/10 cursor-pointer">
            {open ? "Services" : "S"}
          </div>
        </Link>
        <Link to="/settings">
          <div className="p-3 hover:bg-white/10 cursor-pointer">
            {open ? "Settings" : "S"}
          </div>
        </Link>
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="p-3 bg-red-500 hover:bg-red-600 w-full text-left"
      >
        {open ? "Logout" : "L"}
      </button>
    </div>
  );
};

export default Sidebar;
