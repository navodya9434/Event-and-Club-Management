import { Navigate, NavLink, Outlet, Route, Routes } from "react-router-dom";
import ManagerDashboardLayout from "./dashboard/ManagerDashboardLayout";
import DashboardOverviewPage from "./dashboard/pages/DashboardOverviewPage";
import AdCrudPage from "./dashboard/pages/AdCrudPage";
import AllAdsDetailsPage from "./dashboard/pages/AllAdsDetailsPage";
import ActiveAdsPage from "./dashboard/pages/ActiveAdsPage";
import ExpiredAdsPage from "./dashboard/pages/ExpiredAdsPage";
import StudentHome from "./components/StudentHome";
import HomePage from "./pages/homePage";
import AdDetailsPage from "./pages/AdDetailsPage";
import "./styles.css";

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-navbar">
        <div className="app-brand">Advertisement Management</div>
        <nav className="app-nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "app-nav-link app-active-link" : "app-nav-link"
            }
          >
            Home Page
          </NavLink>
          <NavLink
            to="/student"
            className={({ isActive }) =>
              isActive ? "app-nav-link app-active-link" : "app-nav-link"
            }
          >
            Student View
          </NavLink>
          <NavLink
            to="/manager"
            className={({ isActive }) =>
              isActive ? "app-nav-link app-active-link" : "app-nav-link"
            }
          >
            Manager Dashboard
          </NavLink>
        </nav>
      </header>

      <main className="app-main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public homepage — full custom layout, no app shell */}
      <Route path="/" element={<HomePage />} />

      {/* Student view — simple app shell with top navbar */}
      <Route element={<AppLayout />}>
        <Route path="/student" element={<StudentHome />} />
      </Route>

      {/* Manager dashboard — dedicated sidebar layout with nested pages */}
      <Route path="/manager" element={<ManagerDashboardLayout />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<DashboardOverviewPage />} />
        <Route path="crud"     element={<AdCrudPage />} />
        <Route path="details"  element={<AllAdsDetailsPage />} />
        <Route path="active"   element={<ActiveAdsPage />} />
        <Route path="expired"  element={<ExpiredAdsPage />} />
      </Route>

      {/* Public ad details page — no app shell, own header */}
      <Route path="/ads/:id" element={<AdDetailsPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

