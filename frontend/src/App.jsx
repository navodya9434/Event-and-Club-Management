import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "./pages/login";
import AdminDashboard from "./pages/dashboard";

// child pages
import UserManagement from "./pages/UserManagement";
import Events from "./pages/Events";
import Tickets from "./pages/Tickets";
import Authorization from "./pages/Authorization";
import Feedback from "./pages/Feedback";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      {/* redirect root */}
      <Route path="/" element={<Navigate to="/admin/login" replace />} />

      {/* login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* dashboard layout with sidebar */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<Navigate to="users" replace />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="events" element={<Events />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="auth" element={<Authorization />} />
          <Route path="feedback" element={<Feedback />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}

export default App;
