import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import "./EventFeedbackModal.css";

export default function EventFeedbackModal({ event, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const feedbackPayload = {
        ...formData,
        eventId: event.id,
        eventTitle: event.title,
      };

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
        body: JSON.stringify(feedbackPayload),
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

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError(err.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Feedback for "{event.title}"</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

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
              required
            />
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
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <div className="rating-input">
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              >
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
              <span className="rating-display">
                {"⭐".repeat(formData.rating)}
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
              placeholder="Share your thoughts about this event..."
              rows="5"
              required
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
