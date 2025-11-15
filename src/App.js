import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Resellers from "./pages/Resellers";
import Devices from "./pages/Devices";
import Users from "./pages/Users";
import Services from "./pages/Services";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Login */}
        <Route path="/" element={<Login />} />

        {/* Authenticated Area */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resellers" element={<Resellers />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/users" element={<Users />} />
          <Route path="/services" element={<Services />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
