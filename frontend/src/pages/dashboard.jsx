import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const menu = [
    { to: "/admin/users", label: "Users" },
    { to: "/admin/events", label: "Events" },
    { to: "/admin/tickets", label: "Tickets" },
    { to: "/admin/auth", label: "Authorization" },
    { to: "/admin/feedback", label: "Feedback" },
    { to: "/admin/settings", label: "Settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/admin/login");
  };

  const navClasses = ({ isActive }) =>
    `rounded-xl px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-slate-900 text-white shadow-[0_8px_22px_-14px_rgba(15,23,42,0.9)]"
        : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
    }`;

  return (
    <div className="min-h-screen p-3 md:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-screen-2xl gap-3 md:grid-cols-[260px_1fr] md:gap-6">
        <aside className="hidden rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_16px_40px_-26px_rgba(15,23,42,0.45)] backdrop-blur md:flex md:flex-col md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Control Center</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-slate-900">Admin Orbit</h2>

            <nav className="mt-8 grid gap-1.5">
              {menu.map((item) => (
                <NavLink key={item.to} to={item.to} className={navClasses}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            Logout
          </button>
        </aside>

        <main className="rounded-3xl border border-slate-200/80 bg-white/70 p-3 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)] backdrop-blur md:p-5">
          <header className="mb-4 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 md:px-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Administration</p>
                <p className="font-display text-xl font-bold text-slate-900">Operations Dashboard</p>
              </div>
              <div className="hidden flex-wrap gap-1 md:flex">
                {menu.map((item) => (
                  <NavLink key={item.to} to={item.to} className={navClasses}>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </header>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 md:p-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
