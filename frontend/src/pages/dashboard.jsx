import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    // redirect to login
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

          <nav className="space-y-4">
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? "bg-blue-500" : "hover:bg-gray-700"
                }`
              }
            >
              User Management
            </NavLink>

            <NavLink
              to="/admin/events"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`
              }
            >
              Events
            </NavLink>

            <NavLink
              to="/admin/tickets"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`
              }
            >
              Tickets
            </NavLink>

            <NavLink
              to="/admin/auth"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`
              }
            >
              Authorization
            </NavLink>

            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`
              }
            >
              Settings
            </NavLink>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 p-2 rounded mt-6"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
