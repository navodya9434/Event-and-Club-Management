import React, { useState, useEffect } from "react";
import "./allEvents.css";
import { Navbar, Footer, AdTickerBar } from "../../components/HomeComponents";

const placeholderImg = "https://via.placeholder.com/300x200?text=Event+Image";

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [activeEventId, setActiveEventId] = useState(null);

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const handleCardClick = (id) => {
    setActiveEventId(prev => (prev === id ? null : id));
  };

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!token) return;

        const res = await fetch("http://localhost:8080/api/events", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          console.error("Failed to fetch events");
          return;
        }

        const data = await res.json();
        const now = new Date();

        // Only APPROVED events
        const approvedEvents = data.filter(e => e.status === "APPROVED");

        // Upcoming events
        const upcoming = approvedEvents.filter(e => {
          const eventDT = new Date(`${e.date}T${e.time}`);
          return eventDT > now;
        });

        // Past events
        const past = approvedEvents.filter(e => {
          const eventDT = new Date(`${e.date}T${e.time}`);
          return eventDT <= now;
        });

        setUpcomingEvents(upcoming);
        setPastEvents(past);

      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, [token]);

  // Corrected image URL function (like Dashboard)
  const getImageUrl = (path) => {
    if (!path) return placeholderImg;
    // Replace backslashes and encode filename
    const normalizedPath = path.replace(/\\/g, "/");
    const parts = normalizedPath.split("/");
    const filename = encodeURIComponent(parts.pop());
    return `http://localhost:8080/${[...parts, filename].join("/")}`;
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <AdTickerBar />

      <main className="events-page">
        <h1 className="events-title">All <span>EVENTS</span></h1>

        {/* Upcoming Events */}
        <h2 className="section-heading">Upcoming Events</h2>
        <div className="events-grid">
          {upcomingEvents.length === 0 && <p>No upcoming events.</p>}
          {upcomingEvents.map(event => {
            const isActive = activeEventId === event.event_id;
            return (
              <div key={event.event_id} className={`event-card ${isActive ? "active" : ""}`}>
                <div className="event-card-header" onClick={() => handleCardClick(event.event_id)}>
                  <img
                    src={event.imagePath ? `http://localhost:8080/${event.imagePath.replace(/\\/g, "/")}` : placeholderImg}
                    alt={event.title}
                    className="event-card-img"
                  />
                  <h3>{event.title}</h3>
                  <p>{event.date} • {event.time}</p>
                  <p><strong>Category:</strong> {event.category}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Past Events */}
        <h2 className="section-heading">Recent Past Events</h2>
        <div className="events-grid past">
          {pastEvents.length === 0 && <p>No past events.</p>}
          {pastEvents.map(event => {
            const isActive = activeEventId === event.event_id;
            return (
              <div
                key={event.event_id}
                className={`event-card past-card ${isActive ? "active" : ""}`}
                onClick={() => handleCardClick(event.event_id)}
              >
                <img
                  src={event.imagePath ? `http://localhost:8080/${event.imagePath.replace(/\\/g, "/")}` : placeholderImg}
                  alt={event.title}
                  className="event-card-img"
                />
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p><strong>Category:</strong> {event.category}</p>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}