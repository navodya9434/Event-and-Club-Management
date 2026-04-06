import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import CreateEvent from "./CreateEvent";

const Dashboard = () => {
  const navigate = useNavigate();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ For search

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!token) return;

        const res = await fetch("http://localhost:8080/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch events");
          return;
        }

        const data = await res.json();
        setEvents(data);

      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, [token]);

  // Filter events by status
  const now = new Date();
  const pendingEvents = events.filter(e => e.status === "FRESH");
  const approvedEvents = events.filter(e => e.status === "APPROVED");

  // Split upcoming & past events dynamically
  const upcomingEvents = approvedEvents.filter(e => {
    const eventDateTime = new Date(`${e.date}T${e.time}`);
    return eventDateTime > now;
  });

  const pastEventsDynamic = approvedEvents.filter(e => {
    const eventDateTime = new Date(`${e.date}T${e.time}`);
    return eventDateTime <= now;
  });

  // Add mock values for past events if missing
  const pastEvents = pastEventsDynamic.map(e => ({
    ...e,
    revenue: e.revenue || "$50,000",
    attendees: e.attendees || "120 attendees",
    rating: e.rating || "4.5★"
  }));

  // ✅ Filter events based on search query (case-insensitive)
  const filterEvents = (eventsList) => {
    if (!searchQuery) return eventsList;
    const q = searchQuery.toLowerCase();
    return eventsList.filter(
      e =>
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        (e.category && e.category.toLowerCase().includes(q))
    );
  };

  return (
    <div className="dp-dashboard">

      {/* Sidebar */}
      <aside className="dp-sidebar">
        <h2 className="dp-logo">EventPro</h2>
        <ul className="dp-menu">
          <li className="dp-active">Dashboard</li>
          <li onClick={() => navigate("/events")}>Events</li>
          <li onClick={() => navigate("/budget-planner")}>Budget</li>
          <li onClick={() => navigate("/")}>Home</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="dp-main">

        {/* Topbar */}
        <div className="dp-topbar">
          <input
            className="dp-search"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // ✅ Update query
          />
          <button className="dp-create-btn" onClick={openCreateModal}>
            + Create New Event
          </button>
        </div>

        {/* Overview */}
        <h1 className="dp-title">Event Overview</h1>
        <p className="dp-subtitle">
          Manage and monitor your created events.
        </p>

        {/* Stats */}
        <div className="dp-stats">
          <div className="dp-card">
            <h4>Total Events</h4>
            <h2>{pendingEvents.length + approvedEvents.length}</h2>
          </div>

          <div className="dp-card">
            <h4>Approved Events</h4>
            <h2>{approvedEvents.length}</h2>
          </div>

          <div className="dp-card">
            <h4>Pending Events</h4>
            <h2>{pendingEvents.length}</h2>
          </div>
        </div>

        {/* Upcoming Events */}
        <h2 className="dp-section-title">My Upcoming Events</h2>
        <div className="dp-events">
          {filterEvents(upcomingEvents).length === 0 && <p>No upcoming events.</p>}

          {filterEvents(upcomingEvents).map(event => (
            <div
              key={event.event_id}
              className="dp-event-card"
              onClick={() => navigate("/event-profile", { state: event })}
            >
              {event.imagePath ? (
                <img
                  src={`http://localhost:8080/${event.imagePath.replace(/\\/g, "/")}`}
                  alt={event.title}
                  className="dp-event-img"
                />
              ) : (
                <div className="dp-event-placeholder">🎫</div>
              )}

              <div>
                <h3>{event.title}</h3>
                <p>{event.location}</p>
                <span>{event.date} | {event.time}</span>
                <p>Capacity: {event.capacity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pending Approval */}
        <h2 className="dp-section-title">Pending Approval</h2>
        <div className="dp-pending">
          {filterEvents(pendingEvents).length === 0 && <p>No pending events.</p>}

          {filterEvents(pendingEvents).map(event => (
            <div key={event.event_id} className="dp-pending-card">
              <h4>{event.title}</h4>
              <p>{event.location}</p>
              <span>Status: {event.status}</span>

              {event.imagePath ? (
                <img
                  src={`http://localhost:8080/${event.imagePath.replace(/\\/g, "/")}`}
                  alt={event.title}
                  className="dp-pending-img"
                  style={{ width: "100px", marginTop: "5px" }}
                />
              ) : (
                <div className="dp-pending-placeholder">🎫</div>
              )}
            </div>
          ))}
        </div>

        {/* Past Events */}
        <h2 className="dp-section-title">Past Events Performance</h2>
        <div className="dp-past">
          {filterEvents(pastEvents).length === 0 && <p>No past events yet.</p>}

          {filterEvents(pastEvents).map((event, index) => (
            <div
              key={event.event_id || index}
              className="dp-past-item dp-clickable"
              onClick={() => navigate("/past-event", { state: { ...event } })}
            >
              {event.imagePath ? (
                <img
                  src={`http://localhost:8080/${event.imagePath.replace(/\\/g, "/")}`}
                  alt={event.title}
                  className="dp-past-img"
                />
              ) : (
                <div className="dp-past-placeholder">🎫</div>
              )}

              <span>{event.title}</span>
              <span>Revenue: {event.revenue}</span>
              <span>Attendees: {event.attendees}</span>
              <span>Rating: {event.rating}</span>
            </div>
          ))}
        </div>

      </div>

      {/* CREATE EVENT MODAL */}
      {isCreateModalOpen && (
        <div className="cm-modal-overlay" onClick={closeCreateModal}>
          <div
            className="cm-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cm-modal-close" onClick={closeCreateModal}>
              ✕
            </button>

            <CreateEvent token={token} onClose={closeCreateModal} />
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;