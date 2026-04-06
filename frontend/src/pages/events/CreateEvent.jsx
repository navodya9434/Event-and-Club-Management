import React, { useState, useEffect } from "react";
import "./createEvent.css";

export default function CreateEvent({ token, onClose }) {

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
  const [eventImage, setEventImage] = useState(null); // ✅ NEW IMAGE STATE
  const [errors, setErrors] = useState({});
  const [minDate, setMinDate] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["Workshop", "Seminar", "Competition", "Meetup", "Other"];

  // ✅ Set minimum date (tomorrow)
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // ✅ Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanValue = value;

    if (name === "title") cleanValue = value.replace(/[^A-Za-z0-9 ]/g, "");
    if (name === "organizer") cleanValue = value.replace(/[^A-Za-z ]/g, "");

    setEvent({ ...event, [name]: cleanValue });
    setErrors({ ...errors, [name]: "" });
  };

  // ✅ Handle numbers only
  const handleNumberInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setEvent({ ...event, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ✅ Handle PDF file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPermissionDoc(file);
    setErrors({ ...errors, permissionDoc: "" });
  };

  // ✅ Handle IMAGE file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEventImage(file);
    setErrors({ ...errors, eventImage: "" });
  };

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    const titleRegex = /^[A-Za-z0-9 ]+$/;
    const organizerRegex = /^[A-Za-z]+( [A-Za-z]+)?$/;

    if (!event.title.trim()) newErrors.title = "Event title is required";
    else if (!titleRegex.test(event.title))
      newErrors.title = "Only letters and numbers allowed";

    if (!event.category) newErrors.category = "Category is required";

    if (!event.date) newErrors.date = "Event date is required";
    else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(event.date);
      if (selectedDate <= today)
        newErrors.date = "Select a future date";
    }

    if (!event.time) newErrors.time = "Event time is required";

    if (!event.location.trim())
      newErrors.location = "Location is required";

    if (!event.description.trim())
      newErrors.description = "Description is required";
    else if (event.description.trim().length < 200)
      newErrors.description = "Minimum 200 characters required";

    if (!event.organizer.trim())
      newErrors.organizer = "Organizer name is required";
    else if (!organizerRegex.test(event.organizer))
      newErrors.organizer = "Only letters allowed";

    if (!event.capacity)
      newErrors.capacity = "Capacity required";
    else if (Number(event.capacity) <= 0)
      newErrors.capacity = "Must be greater than 0";

    if (!permissionDoc)
      newErrors.permissionDoc = "Permission document required";
    else if (permissionDoc.type !== "application/pdf")
      newErrors.permissionDoc = "Only PDF allowed";

    // ✅ IMAGE VALIDATION
    if (!eventImage)
      newErrors.eventImage = "Event image is required";
    else if (!eventImage.type.startsWith("image/"))
      newErrors.eventImage = "Only image files allowed";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const authToken = token || storedUser?.token;

    if (!authToken) {
      alert("Please login first!");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // ✅ IMPORTANT: must match backend field names
      formData.append("title", event.title);
      formData.append("category", event.category);
      formData.append("date", event.date);
      formData.append("time", event.time);
      formData.append("location", event.location);
      formData.append("description", event.description);
      formData.append("organizerName", event.organizer);
      formData.append("capacity", Number(event.capacity));

      // ✅ MUST MATCH BACKEND PARAM NAME EXACTLY
      formData.append("permissionDocument", permissionDoc);

      // ✅ ADD IMAGE FILE
      formData.append("image", eventImage);

      const response = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
          onClose && onClose();
        }, 2500);

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
        setEventImage(null);
        setErrors({});

        const fileInput = document.getElementById("permissionDoc");
        if (fileInput) fileInput.value = "";

        const imageInput = document.getElementById("eventImage");
        if (imageInput) imageInput.value = "";

      } else if (response.status === 403) {
        alert("You are not approved to create events.");
      } else if (response.status === 401) {
        alert("Session expired. Login again.");
      } else {
        const text = await response.text();
        alert("Error: " + text);
      }

    } catch (err) {
      console.error(err);
      alert("Network error. Check backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="evc-page">
      {showToast && <div className="evc-toast">Event created successfully!</div>}

      <div className="evc-container">
        <h2 className="evc-title">Create Event</h2>

        <form onSubmit={handleSubmit} className="evc-form-card">

          <div className="evc-form-group">
            <label>Event Title</label>
            <input name="title" value={event.title} onChange={handleChange} />
            {errors.title && <span className="evc-error">{errors.title}</span>}
          </div>

          <div className="evc-form-group">
            <label>Category</label>
            <select name="category" value={event.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && <span className="evc-error">{errors.category}</span>}
          </div>

          <div className="evc-form-row">
            <div>
              <input type="date" name="date" value={event.date} onChange={handleChange} min={minDate} />
              {errors.date && <span className="evc-error">{errors.date}</span>}
            </div>

            <div>
              <input type="time" name="time" value={event.time} onChange={handleChange} />
              {errors.time && <span className="evc-error">{errors.time}</span>}
            </div>
          </div>

          <div className="evc-form-group">
            <input name="location" value={event.location} onChange={handleChange} placeholder="Location" />
            {errors.location && <span className="evc-error">{errors.location}</span>}
          </div>

          <div className="evc-form-group">
            <textarea name="description" value={event.description} onChange={handleChange} />
            {errors.description && <span className="evc-error">{errors.description}</span>}
          </div>

          <div className="evc-form-group">
            <input name="organizer" value={event.organizer} onChange={handleChange} placeholder="Organizer name" />
            {errors.organizer && <span className="evc-error">{errors.organizer}</span>}
          </div>

          <div className="evc-form-group">
            <input name="capacity" value={event.capacity} onChange={handleNumberInput} placeholder="Capacity" />
            {errors.capacity && <span className="evc-error">{errors.capacity}</span>}
          </div>

          <div className="evc-form-group">
            <input type="file" id="permissionDoc" accept="application/pdf" onChange={handleFileChange} />
            {permissionDoc && <span>{permissionDoc.name}</span>}
            {errors.permissionDoc && <span className="evc-error">{errors.permissionDoc}</span>}
          </div>

          {/* ✅ IMAGE UPLOAD */}
          <div className="evc-form-group">
            <label>Event Image</label>
            <input type="file" id="eventImage" accept="image/*" onChange={handleImageChange} />
            {eventImage && <span>{eventImage.name}</span>}
            {errors.eventImage && <span className="evc-error">{errors.eventImage}</span>}

            {/* ✅ IMAGE PREVIEW */}
            {eventImage && (
              <img
                src={URL.createObjectURL(eventImage)}
                alt="preview"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Event"}
          </button>

        </form>
      </div>
    </div>
  );
}