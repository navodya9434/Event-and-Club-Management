import React from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

import img1 from "../../assets/home2.jpg";
import img2 from "../../assets/home3.jpg";
import img3 from "../../assets/home4.jpg";

const Dashboard = () => {
  const navigate = useNavigate();

  const pastEvents = [
    { title: "Global FinTech Meetup", revenue: "$842,000", attendees: "1,240 attendees", rating: "4.8★" },
    { title: "Creative Design Weekend", revenue: "$125,500", attendees: "310 attendees", rating: "4.9★" },
    { title: "Product Launch: Vision X", revenue: "$2.1M", attendees: "5,000+ attendees", rating: "4.7★" },
  ];

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
          <input className="dp-search" placeholder="Search events, venues, or staff..." />
          <button
            className="dp-create-btn"
            onClick={() => navigate("/create-event")}
          >
            + Create New Event
          </button>
        </div>

        {/* Overview */}
        <h1 className="dp-title">Portfolio Overview</h1>
        <p className="dp-subtitle">
          Managing 14 active and upcoming productions across North America.
        </p>

        {/* Stats */}
        <div className="dp-stats">
          <div className="dp-card">
            <h4>Total Events Done </h4>
            <h2>16</h2>
            <span className="dp-positive">+4.3 Average Rating</span>
          </div>
          <div className="dp-card">
            <h4>Active Events</h4>
            <h2>18,492</h2>
            <span>Tickets sold</span>
          </div>
          <div className="dp-card">
            <h4>Pending Proposals</h4>
            <h2>06</h2>
            <span>Avg response: 4h</span>
          </div>
        </div>

        {/* Current Events */}
        <h2 className="dp-section-title">Current Events</h2>
        <div className="dp-events">
          <div
            className="dp-event-card"
            onClick={() =>
              navigate("/event-profile", {
                state: {
                  title: "Global Tech Summit 2024",
                  location: "San Francisco, CA",
                  progress: "94%",
                },
              })
            }
          >
            <img src={img1} alt="Gallery 1" />
            <div>
              <h3>Global Tech Summit 2024</h3>
              <p>San Francisco, CA</p>
              <div className="dp-progress">
                <div style={{ width: "94%" }}></div>
              </div>
              <span>94% Attendance</span>
            </div>
          </div>

          <div
            className="dp-event-card"
            onClick={() =>
              navigate("/event-profile", {
                state: {
                  title: "Executive Gala Dinner",
                  location: "New York City, NY",
                  progress: "100%",
                },
              })
            }
          >
            <img src={img2} alt="Gallery 2" />
            <div>
              <h3>Executive Gala Dinner</h3>
              <p>New York City, NY</p>
              <div className="dp-progress">
                <div style={{ width: "100%" }}></div>
              </div>
              <span>100% Check-in</span>
            </div>
          </div>
        </div>

        {/* Pending */}
        <h2 className="dp-section-title">Pending Approval</h2>
        <div className="dp-pending">
          <div className="dp-pending-card">
            <h4>Northwest AI Expo Logistics Plan</h4>
            <p>In Review</p>
          </div>
          <div className="dp-pending-card">
            <h4>Sustainable Future Summit 2025</h4>
            <p>Draft</p>
          </div>
          <div className="dp-pending-card">
            <h4>City Jazz Festival Branding V2</h4>
            <p>In Review</p>
          </div>
        </div>

        {/* Past Events */}
        <h2 className="dp-section-title">Past Events Performance</h2>
        <div className="dp-past">
          {pastEvents.map((event, index) => (
            <div
              key={index}
              className="dp-past-item dp-clickable"
              onClick={() =>
                navigate("/past-event", { state: { ...event } })
              }
            >
              <span>{event.title}</span>
              <span>{event.revenue}</span>
              <span>{event.attendees}</span>
              <span>{event.rating}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;