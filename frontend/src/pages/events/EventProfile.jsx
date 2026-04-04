import React, { useState, useEffect } from "react";
import "./eventProfile.css";
import { Link } from "react-router-dom";

export default function EventProfile() {
  const [tickets, setTickets] = useState([
    { name: "VIP Backstage Pass", price: 249, seats: 150, date: "2024-03-01" },
    { name: "Early Bird General", price: 89, seats: 1200, date: "2024-03-01" },
  ]);

  const [eventData, setEventData] = useState({
    name: "Solstice Digital Arts Festival 2024",
    venue: "Grand Pavilion at Waterfront",
    date: "2024-03-01",
    time: "18:00",
    description: "A celebration of digital arts with performances, workshops, and exhibitions.",
    performers: "DJ Pulse, Visual Artist Lena",
    dressCode: "Casual Chic",
    image: null,
    ticketsSold: 534,
  });

  const [errors, setErrors] = useState({});
  const [ticketErrors, setTicketErrors] = useState([]);
  const [countdown, setCountdown] = useState("");
  const [minDate, setMinDate] = useState("");

  // Countdown calculation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const eventDateTime = new Date(`${eventData.date}T${eventData.time}`);
      const diff = eventDateTime - now;

      if (diff <= 0) {
        setCountdown("Event Live!");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [eventData.date, eventData.time]);

  // Set min date for date picker (tomorrow)
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const addTicket = () => {
    setTickets([...tickets, { name: "", price: "", seats: "", date: "" }]);
    setTicketErrors([...ticketErrors, {}]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...tickets];

    if (field === "name") {
      value = value.replace(/[^A-Za-z0-9 ]/g, "");
    } else if (field === "price" || field === "seats") {
      value = value.replace(/[^0-9]/g, "");
    }

    updated[index][field] = value;
    setTickets(updated);

    const updatedErrors = [...ticketErrors];
    if (!updatedErrors[index]) updatedErrors[index] = {};
    updatedErrors[index][field] = "";
    setTicketErrors(updatedErrors);
  };

  const handleEventChange = (field, value) => {
    let val = value;
    if (field === "name" || field === "venue") {
      val = val.replace(/[^A-Za-z0-9 ]/g, "");
    }
    setEventData({ ...eventData, [field]: val });
    setErrors({ ...errors, [field]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    const nameVenueRegex = /^[A-Za-z0-9 ]+$/;

    if (!eventData.name.trim()) newErrors.name = "Event Name is required";
    else if (!nameVenueRegex.test(eventData.name))
      newErrors.name = "Only letters and numbers allowed";

    if (!eventData.venue.trim()) newErrors.venue = "Venue is required";
    else if (!nameVenueRegex.test(eventData.venue))
      newErrors.venue = "Only letters and numbers allowed";

    if (!eventData.date) newErrors.date = "Date is required";
    else {
      const today = new Date();
      const selectedDate = new Date(eventData.date);
      selectedDate.setHours(0,0,0,0);
      today.setHours(0,0,0,0);
      if (selectedDate <= today) newErrors.date = "Select a future date (after today)";
    }

    if (!eventData.time) newErrors.time = "Time is required";

    if (!eventData.description.trim()) newErrors.description = "Description is required";
    else if (eventData.description.trim().length < 200)
      newErrors.description = "Description must be at least 200 characters";

    // Validate tickets
    const updatedTicketErrors = [];
    tickets.forEach((t, i) => {
      const err = {};
      if (!t.name.trim()) err.name = "Category required";
      if (!t.price || Number(t.price) <= 0) err.price = "Price must be > 0";
      if (!t.seats || Number(t.seats) <= 0) err.seats = "Seats must be > 0";
      if (!t.date) err.date = "Date required";
      else {
        const today = new Date();
        const ticketDate = new Date(t.date);
        ticketDate.setHours(0,0,0,0);
        today.setHours(0,0,0,0);
        if (ticketDate <= today) err.date = "Select future date";
      }
      updatedTicketErrors[i] = err;
    });

    setTicketErrors(updatedTicketErrors);
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0 && updatedTicketErrors.every(te => Object.keys(te).length === 0);
  };

  const launchEvent = () => {
    if (validateForm()) {
      alert(`Event "${eventData.name}" has been launched! 🚀`);
      // TODO: API call to mark event as live
    }
  };

  return (
    <div className="ep-dashboard">
      {/* Sidebar */}
      <aside className="ep-sidebar sticky-sidebar">
        <h2 className="ep-logo">Event Manager</h2>
        <ul className="ep-menu">
          <li className="ep-active">Event</li>
          <li><Link to="/ticket-analyze">Ticket Analyzer</Link></li>
          <li><Link to="/budget-planner">Budget Planner</Link></li>
          <li><Link to="/e-dashboard">Dashboard</Link></li>
          <li><Link to="/">Home</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="ep-main">
        {/* Sticky Event Status */}
        <div className="ep-top-status">
          <div>
            <h2 className="ep-event-name">{eventData.name}</h2>
            <span>Tickets Sold: {eventData.ticketsSold}</span>
          </div>
          <div className={`ep-countdown ${countdown === "Event Live!" ? "live" : ""}`}>
            {countdown}
          </div>
        </div>

        <h1 className="ep-title">Event Profile Management</h1>

        <div className="ep-top-grid">
          {/* Event Details */}
          <div className="ep-card">
            <h3>Event Details</h3>

            <input
              className="ep-input"
              placeholder="Event Name"
              value={eventData.name}
              onChange={(e) => handleEventChange("name", e.target.value)}
            />
            {errors.name && <span className="ep-error">{errors.name}</span>}

            <input
              className="ep-input"
              placeholder="Venue Name"
              value={eventData.venue}
              onChange={(e) => handleEventChange("venue", e.target.value)}
            />
            {errors.venue && <span className="ep-error">{errors.venue}</span>}

            <div className="ep-row">
              <input
                className="ep-input"
                type="date"
                value={eventData.date}
                min={minDate}
                onChange={(e) => handleEventChange("date", e.target.value)}
              />
              {errors.date && <span className="ep-error">{errors.date}</span>}

              <input
                className="ep-input"
                type="time"
                value={eventData.time}
                onChange={(e) => handleEventChange("time", e.target.value)}
              />
              {errors.time && <span className="ep-error">{errors.time}</span>}
            </div>

            <textarea
              className="ep-textarea"
              placeholder="Event Description"
              value={eventData.description}
              onChange={(e) => handleEventChange("description", e.target.value)}
            />
            {errors.description && <span className="ep-error">{errors.description}</span>}

            <input
              className="ep-input"
              placeholder="Performers (Optional)"
              value={eventData.performers}
              onChange={(e) => handleEventChange("performers", e.target.value)}
            />
            <input
              className="ep-input"
              placeholder="Dress Code (Optional)"
              value={eventData.dressCode}
              onChange={(e) => handleEventChange("dressCode", e.target.value)}
            />

            <div className="ep-upload-box">
              <label className="ep-upload-label">
                Upload Event Image
                <input
                  type="file"
                  onChange={(e) => handleEventChange("image", e.target.files[0])}
                />
              </label>
            </div>

            <button className="ep-btn-primary" onClick={launchEvent}>
              Update Event
            </button>
          </div>

          {/* Promotion */}
          <div className="ep-card">
            <h3>Request Promotion</h3>

            <input className="ep-input" placeholder="Event Name" value={eventData.name} readOnly />
            <input className="ep-input" placeholder="Venue" value={eventData.venue} readOnly />
            <div className="ep-row">
              <input className="ep-input" type="date" value={eventData.date} readOnly />
              <input className="ep-input" type="time" value={eventData.time} readOnly />
            </div>
            <textarea className="ep-textarea" placeholder="Event Description" value={eventData.description} readOnly />
            <select className="ep-input">
              <option>Social Media Blitz</option>
              <option>Email Campaign</option>
            </select>
            <input className="ep-input" placeholder="Target Audience" />
            <input className="ep-range" type="range" min="500" max="10000" />
            <button className="ep-btn-primary">Submit Request</button>
          </div>
        </div>

        {/* Tickets */}
        <div className="ep-card">
          <div className="ep-ticket-header">
            <h3>Ticket Launch Center</h3>
          </div>

          <table className="ep-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Price</th>
                <th>Seats</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t, i) => (
                <tr key={i}>
                  <td>
                    <input
                      className="ep-input-small"
                      value={t.name}
                      onChange={(e) => handleChange(i, "name", e.target.value)}
                    />
                    {ticketErrors[i]?.name && <span className="ep-error">{ticketErrors[i].name}</span>}
                  </td>
                  <td>
                    <input
                      className="ep-input-small"
                      value={t.price}
                      onChange={(e) => handleChange(i, "price", e.target.value)}
                    />
                    {ticketErrors[i]?.price && <span className="ep-error">{ticketErrors[i].price}</span>}
                  </td>
                  <td>
                    <input
                      className="ep-input-small"
                      value={t.seats}
                      onChange={(e) => handleChange(i, "seats", e.target.value)}
                    />
                    {ticketErrors[i]?.seats && <span className="ep-error">{ticketErrors[i].seats}</span>}
                  </td>
                  <td>
                    <input
                      className="ep-input-small"
                      type="date"
                      min={minDate}
                      value={t.date}
                      onChange={(e) => handleChange(i, "date", e.target.value)}
                    />
                    {ticketErrors[i]?.date && <span className="ep-error">{ticketErrors[i].date}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="ep-add-btn" onClick={addTicket}>
            + Add Ticket Category
          </button>

          <button className="ep-btn-primary" onClick={launchEvent}>Live Launch</button>
        </div>
      </div>
    </div>
  );
}