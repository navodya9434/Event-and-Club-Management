import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "../src/pages/login";
import AdminDashboard from "../src/pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}

export default App;
