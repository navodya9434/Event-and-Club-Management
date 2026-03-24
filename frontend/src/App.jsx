import { Navigate, NavLink, Outlet, Route, Routes } from "react-router-dom";
import ManagerDashboard from "./components/ManagerDashboard";
import StudentHome from "./components/StudentHome";
import HomePage from "./pages/homePage";
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
      <Route path="/" element={<HomePage />} />
      <Route element={<AppLayout />}>
        <Route path="/student" element={<StudentHome />} />
        <Route path="/manager" element={<ManagerDashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

