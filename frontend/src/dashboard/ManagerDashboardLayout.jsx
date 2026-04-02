import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./dashboard.css";

const NAV_ITEMS = [
  { label: "Dashboard Overview",     path: "overview", icon: "📊" },
  { label: "Manage Advertisements",  path: "crud",     icon: "📝" },
  { label: "All Ad Details",         path: "details",  icon: "📋" },
  { label: "Active Advertisements",  path: "active",   icon: "✅" },
  { label: "Expired Advertisements", path: "expired",  icon: "⏰" },
];

export default function ManagerDashboardLayout() {
  const navigate = useNavigate();

  return (
    <div className="mgr-shell">
      {/* Top Header */}
      <header className="mgr-header">
        <div className="mgr-header-brand">
          <span className="mgr-header-icon">🎓</span>
          <span>CampusHub</span>
          <span className="mgr-header-subtitle">Advertisement Management</span>
        </div>
        <div className="mgr-header-actions">
          <button className="mgr-home-btn" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
          <div className="mgr-user-badge">Manager</div>
        </div>
      </header>

      <div className="mgr-body">
        {/* Sidebar */}
        <aside className="mgr-sidebar">
          <div className="mgr-sidebar-brand">
            <h2>Advertisement Panel</h2>
            <p>Club &amp; Event Management</p>
          </div>

          <div className="mgr-sidebar-section-label">Navigation</div>

          <nav className="mgr-sidebar-nav">
            {NAV_ITEMS.map(({ label, path, icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `mgr-nav-item${isActive ? " mgr-nav-item--active" : ""}`
                }
              >
                <span className="mgr-nav-icon">{icon}</span>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mgr-sidebar-footer">
          <Link to="/student" className="mgr-footer-link">
            👁 Student View
          </Link>
          </div>
        </aside>

        {/* Main content — each page renders here */}
        <main className="mgr-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

