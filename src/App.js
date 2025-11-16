import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import DevicePage from "./pages/DevicePage";
import Dashboard from "./pages/Dashboard";


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
          <Route path="/device/:id" element={<DevicePage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
