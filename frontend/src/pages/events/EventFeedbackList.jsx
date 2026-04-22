import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./EventFeedbackList.css";

export default function EventFeedbackList({ eventId, refreshTrigger }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!eventId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://localhost:7070/api/feedback/event/${eventId}`
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        
        // The backend already filters by eventId, so just use the data as-is
        if (Array.isArray(data)) {
          setFeedbackList(data);
        } else {
          setFeedbackList([]);
        }
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError(err.message || "Failed to load feedback. Make sure backend is running.");
        setFeedbackList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [eventId, refreshTrigger]);

  if (!eventId) return null;
  if (loading) return <div className="feedback-loading">Loading feedback...</div>;
  if (error) {
    return (
      <div className="feedback-error" style={{padding: '15px', backgroundColor: '#fee', borderRadius: '4px', marginTop: '10px'}}>
        <p style={{color: '#c33', margin: 0}}>⚠️ {error}</p>
      </div>
    );
  }
  if (feedbackList.length === 0) {
    return (
      <div className="feedback-empty">
        <p>No feedback yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="feedback-list-container">
      <h4 className="feedback-list-title">Event Feedback ({feedbackList.length})</h4>
      <div className="feedback-list">
        {feedbackList.map((feedback) => (
          <div key={feedback.id} className="feedback-item">
            <div className="feedback-header">
              <div className="feedback-author">
                <h5 className="feedback-name">{feedback.name}</h5>
                <p className="feedback-event-id" style={{fontSize: '0.7rem', color: '#999', margin: '2px 0 0 0'}}>
                  Event ID: {feedback.eventId}
                </p>
              </div>
              <div className="feedback-rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={star <= feedback.rating ? "star-filled" : "star-empty"}
                      size={18}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="feedback-message">{feedback.message}</p>
            {feedback.reply && (
              <div className="feedback-reply">
                <div className="reply-header">📝 Admin Reply:</div>
                <p className="reply-message">{feedback.reply}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
