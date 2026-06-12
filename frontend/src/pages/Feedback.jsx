import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import StudentNavbar from "./user/StudentNavbar";
import "./Feedback.css";

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      
      const headers = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      
      const res = await fetch("http://localhost:7070/api/feedback", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Failed to submit feedback: ${res.status}`);
      }

      const data = await res.json();
      console.log("Feedback submitted successfully:", data);

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        message: "",
        rating: 5,
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError(err.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-page-wrapper">
      <StudentNavbar />

      <main className="feedback-page">
        <div className="feedback-container">
          <h1 className="feedback-title">Send Us Your Feedback</h1>
          <p className="feedback-subtitle">
            We'd love to hear your thoughts and suggestions about our events!
          </p>

          {success && (
            <div className="success-message">
              <p>✓ Thank you! Your feedback has been submitted successfully.</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>✗ {error}</p>
            </div>
          )}

          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={validationErrors.name ? "input-error" : ""}
              />
              {validationErrors.name && <span className="validation-error" style={{color: "#dc3545", fontSize: "0.85rem", marginTop: "4px", display: "block"}}>{validationErrors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={validationErrors.email ? "input-error" : ""}
              />
              {validationErrors.email && <span className="validation-error" style={{color: "#dc3545", fontSize: "0.85rem", marginTop: "4px", display: "block"}}>{validationErrors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <div className="rating-input">
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={star <= formData.rating ? "star-filled" : "star-empty"}
                      size={32}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, rating: star }))
                      }
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </div>
                <span className="rating-display">
                  {formData.rating} / 5
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Feedback</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please share your thoughts, suggestions, or comments..."
                rows="6"
                className={validationErrors.message ? "input-error" : ""}
              />
              {validationErrors.message && <span className="validation-error" style={{color: "#dc3545", fontSize: "0.85rem", marginTop: "4px", display: "block"}}>{validationErrors.message}</span>}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
