import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/homePage";

// Event Management
import EventsPage from "./pages/events/allEvents";
import AllClubs from "./pages/clubs/AllClubs"; 
import CreateClub from "./pages/clubs/CreateClub";
import CreateEvent from "./pages/events/CreateEvent";
import EventProfile from "./pages/events/EventProfile";
import BudgetPlanner from "./pages/events/BudgetPlanner";
import TicketingAnalytics from "./pages/events/TicketingAnalytics";
import Dashboard from "./pages/events/Dashboard";
import PastEvent from "./pages/events/PastEvent";

// Club Management
import ClubDashboard from "./pages/clubs/ClubDashboard";
import ClubProfile from "./pages/clubs/ClubProfile";
import MemberManagement from "./pages/clubs/MemberManagement";
import Staff from "./pages/clubs/Staff";
import Meetings from "./pages/clubs/Meetings";

import Login from "./pages/login/login";
import StudentDashboard from "./pages/user/StudentDashboard";






function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/events" element={<EventsPage />} />
      <Route path="/clubs" element={<AllClubs />} />  
      <Route path="/create-club" element={<CreateClub />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/event-profile" element={<EventProfile />} />
      <Route path="/budget-planner" element={<BudgetPlanner />} />
      <Route path="/e-dashboard" element={<Dashboard />} />
      <Route path="/ticket-analyze" element={<TicketingAnalytics />} />
      <Route path="/past-event" element={<PastEvent />} />

      <Route path="/club-dashboard" element={<ClubDashboard />} />
<Route path="/club-profile/:clubId" element={<ClubProfile />} />      <Route path="/member-management" element={<MemberManagement />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/meetings" element={<Meetings />} />

      <Route path="/login" element={<Login />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />


    </Routes>
  );
}

export default App;