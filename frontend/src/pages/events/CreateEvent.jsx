import React, { useState } from "react";
import "./createEvent.css";

export default function CreateEvent() {
  const [event, setEvent] = useState({
    title: "",
    category: "",
    date: "",
    location: "",
    description: "",
    organizer: "",
    capacity: "",
  });

  const [permissionDoc, setPermissionDoc] = useState(null);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPermissionDoc(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!permissionDoc) {
      alert("Please upload a permission document to create the event.");
      return;
    }
    console.log("Event Created:", event);
    console.log("Permission Document:", permissionDoc);
    alert("Event created successfully!");
    // TODO: Send event and document to backend API
  };

  return (
    <div className="form-page">
      <h2>Create Event</h2>

      <form onSubmit={handleSubmit} className="form-card">
        <input
          name="title"
          placeholder="Event Title"
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <input type="date" name="date" onChange={handleChange} required />
        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          onChange={handleChange}
          required
        />
        <input
          name="organizer"
          placeholder="Organizer Name"
          onChange={handleChange}
          required
        />
        <input
          name="capacity"
          placeholder="Max Participants"
          onChange={handleChange}
          required
        />

        {/* Permission Document Upload */}
        <label className="file-label">
          Upload Permission Document
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
          />
        </label>

        <button className="btn btn--pink">Create Event</button>
      </form>
    </div>
  );
}