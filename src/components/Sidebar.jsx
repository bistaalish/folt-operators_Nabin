import React, { useState } from "react";
import { logout } from "../utils/auth";
import { Link } from "react-router-dom";

// Lucide Icons
import {
  Users,
  Database,
  Monitor,
  Settings,
  LogOut,
  Store,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-[#0d0d0d] text-white transition-all duration-300 
      ${open ? "w-64" : "w-20"} flex flex-col border-r border-white/10`}
    >

      {/* Logo Section */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <img
          src="/logo.png"
          alt="Logo"
          className={`transition-all duration-300 ${open ? "w-10" : "w-8"}`}
        />
        {open && <h1 className="text-xl font-semibold">FOLT Admin</h1>}
      </div>

      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setOpen(!open)}
          className="bg-white/10 p-2 rounded hover:bg-white/20"
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4 space-y-1">
        <SidebarItem to="/resellers" open={open} label="Resellers" icon={<Store size={20} />} />
        <SidebarItem to="/devices" open={open} label="Devices" icon={<Monitor size={20} />} />
        
        <SidebarItem to="/users" open={open} label="Users" icon={<Users size={20} />} />
        
        <SidebarItem to="/services" open={open} label="Services" icon={<Database size={20} />} />
        
        <SidebarItem to="/settings" open={open} label="Settings" icon={<Settings size={20} />} />
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-3 p-3 bg-red-600 hover:bg-red-700 w-full text-left"
      >
        <LogOut size={20} />
        {open && "Logout"}
      </button>
    </div>
  );
};

const SidebarItem = ({ to, label, icon, open }) => (
  <Link to={to}>
    <div className="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer rounded-md transition-all">
      <span>{icon}</span>
      {open && <span>{label}</span>}
    </div>
  </Link>
);

export default Sidebar;
