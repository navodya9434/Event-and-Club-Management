import React, { useState, useEffect } from "react";
import "./createEvent.css";

export default function CreateEvent() {
  const [event, setEvent] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
    organizer: "",
    capacity: "",
  });

  const [permissionDoc, setPermissionDoc] = useState(null);
  const [errors, setErrors] = useState({});
  const [minDate, setMinDate] = useState("");

  const categories = ["Workshop", "Seminar", "Competition", "Meetup", "Other"];

  // Set minDate for date picker (tomorrow)
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    // Restrict characters while typing
    if (name === "title") {
      value = value.replace(/[^A-Za-z0-9 ]/g, "");
    } else if (name === "organizer") {
      value = value.replace(/[^A-Za-z ]/g, "");
    }

    setEvent({ ...event, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    setPermissionDoc(e.target.files[0]);
    setErrors({ ...errors, permissionDoc: "" });
  };

  const handleNumberInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;
    setEvent({ ...event, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const titleRegex = /^[A-Za-z0-9 ]+$/;
    const organizerRegex = /^[A-Za-z]+ [A-Za-z]+$/;

    if (!event.title.trim()) newErrors.title = "Event title is required";
    else if (!titleRegex.test(event.title))
      newErrors.title = "Only letters and numbers allowed";

    if (!event.category) newErrors.category = "Category is required";

    if (!event.date) newErrors.date = "Event date is required";
    else {
      const today = new Date();
      const selectedDate = new Date(event.date);
      selectedDate.setHours(0,0,0,0);
      today.setHours(0,0,0,0);
      if (selectedDate <= today)
        newErrors.date = "Select a future date (after today)";
    }

    if (!event.time) newErrors.time = "Event time is required";

    if (!event.location.trim()) newErrors.location = "Location is required";

    if (!event.description.trim()) newErrors.description = "Description is required";
    else if (event.description.trim().length < 200)
      newErrors.description = "Description must be at least 200 characters";

    if (!event.organizer.trim()) newErrors.organizer = "Organizer name is required";
    else if (!organizerRegex.test(event.organizer))
      newErrors.organizer = "Enter first and last name (letters only)";

    if (!event.capacity) newErrors.capacity = "Max participants required";
    else if (Number(event.capacity) <= 0)
      newErrors.capacity = "Must be greater than 0";

    if (!permissionDoc) newErrors.permissionDoc = "Permission document required";
    else if (!["application/pdf", "application/msword",
               "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
            .includes(permissionDoc.type))
      newErrors.permissionDoc = "Only PDF or DOC/DOCX allowed";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Event Created:", event);
      console.log("Permission Document:", permissionDoc);
      alert("Event created successfully!");
      // Reset form
      setEvent({
        title: "",
        category: "",
        date: "",
        time: "",
        location: "",
        description: "",
        organizer: "",
        capacity: "",
      });
      setPermissionDoc(null);
      setErrors({});
      document.getElementById("permissionDoc").value = "";
    }
  };

  return (
    <div className="evc-page">
      <div className="evc-container">
        <h2 className="evc-title">Create Event</h2>
        <form onSubmit={handleSubmit} className="evc-form-card">

          <div className="evc-form-group">
            <label>Event Title</label>
            <input
              name="title"
              value={event.title}
              onChange={handleChange}
              placeholder="Letters and numbers only"
            />
            {errors.title && <span className="evc-error">{errors.title}</span>}
          </div>

          <div className="evc-form-group">
            <label>Category</label>
            <select name="category" value={event.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="evc-error">{errors.category}</span>}
          </div>

          <div className="evc-form-row">
            <div className="evc-form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={event.date}
                onChange={handleChange}
                min={minDate} // Disable past dates and today
              />
              {errors.date && <span className="evc-error">{errors.date}</span>}
            </div>
            <div className="evc-form-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={event.time}
                onChange={handleChange}
              />
              {errors.time && <span className="evc-error">{errors.time}</span>}
            </div>
          </div>

          <div className="evc-form-group">
            <label>Location</label>
            <input
              name="location"
              value={event.location}
              onChange={handleChange}
              placeholder="Event location"
            />
            {errors.location && <span className="evc-error">{errors.location}</span>}
          </div>

          <div className="evc-form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={event.description}
              onChange={handleChange}
              placeholder="At least 200 characters"
            />
            {errors.description && <span className="evc-error">{errors.description}</span>}
          </div>

          <div className="evc-form-group">
            <label>Organizer Name</label>
            <input
              name="organizer"
              value={event.organizer}
              onChange={handleChange}
              placeholder="First and Last Name"
            />
            {errors.organizer && <span className="evc-error">{errors.organizer}</span>}
          </div>

          <div className="evc-form-group">
            <label>Max Participants</label>
            <input
              name="capacity"
              value={event.capacity}
              onChange={handleNumberInput}
              placeholder="Numbers only"
            />
            {errors.capacity && <span className="evc-error">{errors.capacity}</span>}
          </div>

          <div className="evc-form-group">
            <label className="evc-file-label">
              Upload Permission Document
              <input
                type="file"
                id="permissionDoc"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </label>
            {permissionDoc && <span className="evc-file-name">{permissionDoc.name}</span>}
            {errors.permissionDoc && <span className="evc-error">{errors.permissionDoc}</span>}
          </div>

          <button className="evc-btn">Create Event</button>
        </form>
      </div>
    </div>
  );
}