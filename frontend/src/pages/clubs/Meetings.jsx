import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Meetings.css';

const MeetingsManagement = () => {
  const { clubId } = useParams(); // Get clubId from URL
  const [meetings, setMeetings] = useState([]);

  const [audience, setAudience] = useState('both');
  const [meetingData, setMeetingData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent non-letter characters for title
    if (name === 'title') {
      if (/[^A-Za-z ]/.test(value)) return;
    }

    setMeetingData({ ...meetingData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!meetingData.title.trim()) newErrors.title = "Meeting title is required";
    else if (!/^[A-Za-z ]+$/.test(meetingData.title.trim()))
      newErrors.title = "Only letters and spaces allowed in title";

    if (!meetingData.date) newErrors.date = "Date is required";
    if (!meetingData.time) newErrors.time = "Time is required";

    if (meetingData.date && meetingData.time) {
      const now = new Date();
      const selectedDateTime = new Date(meetingData.date + 'T' + meetingData.time);
      if (selectedDateTime < now) newErrors.date = "Date & time cannot be in the past";
    }

    if (!meetingData.location.trim()) newErrors.location = "Location/Link is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    const payload = {
      clubId,
      title: meetingData.title,
      dateTime: `${meetingData.date}T${meetingData.time}`,
      location: meetingData.location,
      audience: audience.toUpperCase(),
    };

    try {
      const res = await axios.post("http://localhost:8080/api/meetings", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Add returned meeting to state
      setMeetings(prev => [...prev, res.data]);
      setToast({ show: true, message: "Meeting Scheduled Successfully!" });
      setTimeout(() => setToast({ show: false, message: "" }), 3000);

      setMeetingData({ title: '', date: '', time: '', location: '' });
      setAudience('both');
    } catch (err) {
      console.error("Error scheduling meeting:", err);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  };

  // Fetch all meetings for the club on load
  useEffect(() => {
    if (!clubId) return;

    const fetchMeetings = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:8080/api/meetings/club/${clubId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMeetings(res.data);
      } catch (err) {
        console.error("Error fetching meetings:", err);
      }
    };

    fetchMeetings();
  }, [clubId]);

  // Separate upcoming and past meetings
  const now = new Date();
  const upcomingMeetings = meetings.filter(m => new Date(m.dateTime) >= now).sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  const pastMeetings = meetings.filter(m => new Date(m.dateTime) < now).sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

  return (
    <div className="meetings-management-page">
      {/* Toast */}
      {toast.show && <div className="m-toast">{toast.message}</div>}

      {/* Sidebar */}
      <aside className="m-sidebar">
        <div className="m-sidebar-header">
          <div className="m-logo-icon">🎓</div>
          <div>
            <div className="m-brand">Club Manager</div>
            <div className="m-sub-brand">ELITE ACADEMIC ARCHIVE</div>
          </div>
        </div>

        <nav className="m-nav-menu">
          <a href="#" className="m-nav-item">📊 DASHBOARD</a>
          <a href="#" className="m-nav-item">👥 MEMBERS</a>
          <a href="#" className="m-nav-item">👔 STAFF</a>
          <a href="#" className="m-nav-item active">📅 MEETINGS</a>
          <a href="#" className="m-nav-item">🛍️ MERCHANDISE</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="m-main-content">
        <header className="m-top-bar">
          <div className="m-top-left"></div>
          <div className="m-search-container">
            <input type="text" placeholder="Search archives..." className="m-search-input" />
          </div>
        </header>

        <div className="m-page-header">
          <h1>Meetings Management</h1>
          <p>Coordinate schedules, manage attendance, and archive historical scholarly records.</p>
        </div>

        <div className="m-content-grid">
          {/* Schedule New Session Form */}
          <div className="m-schedule-form-card">
            <div className="m-form-header">
              <span className="m-form-icon">📅</span>
              <h2>Schedule New Session</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="m-form-group">
                <label>MEETING TITLE</label>
                <input
                  type="text"
                  name="title"
                  value={meetingData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Editorial Board Sync"
                  className="m-title-input"
                  required
                />
                {errors.title && <span className="m-error">{errors.title}</span>}
              </div>

              <div className="m-form-row">
                <div className="m-form-group">
                  <label>DATE</label>
                  <input
                    type="date"
                    name="date"
                    value={meetingData.date}
                    onChange={handleInputChange}
                    className="m-date-input"
                    min={getTodayDate()}
                    required
                  />
                  {errors.date && <span className="m-error">{errors.date}</span>}
                </div>
                <div className="m-form-group">
                  <label>TIME</label>
                  <input
                    type="time"
                    name="time"
                    value={meetingData.time}
                    onChange={handleInputChange}
                    className="m-time-input"
                    min={meetingData.date === getTodayDate() ? getCurrentTime() : '00:00'}
                    required
                  />
                  {errors.time && <span className="m-error">{errors.time}</span>}
                </div>
              </div>

              <div className="m-form-group">
                <label>LOCATION / LINK</label>
                <input
                  type="text"
                  name="location"
                  value={meetingData.location}
                  onChange={handleInputChange}
                  placeholder="Room 402 or Zoom URL"
                  className="m-location-input"
                  required
                />
                {errors.location && <span className="m-error">{errors.location}</span>}
              </div>

              <div className="m-audience-section">
                <label>AUDIENCE SELECTION</label>
                <div className="m-audience-options">
                  <label className={`m-audience-option ${audience === 'staff' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="audience"
                      checked={audience === 'staff'}
                      onChange={() => setAudience('staff')}
                    />
                    Staff Only
                  </label>
                  <label className={`m-audience-option ${audience === 'members' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="audience"
                      checked={audience === 'members'}
                      onChange={() => setAudience('members')}
                    />
                    Members Only
                  </label>
                  <label className={`m-audience-option ${audience === 'both' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="audience"
                      checked={audience === 'both'}
                      onChange={() => setAudience('both')}
                    />
                    Both (All Staff & Members)
                  </label>
                </div>
              </div>

              <button type="submit" className="m-finalize-btn">Finalize Schedule</button>
            </form>
          </div>

          {/* Active Agenda */}
          <div className="m-active-agenda-card">
            <div className="m-agenda-header">
              <div className="m-agenda-title"><span>📅</span> Active Agenda</div>
              <span className="m-scheduled-badge">{upcomingMeetings.length} SCHEDULED</span>
            </div>
            {upcomingMeetings.map(m => (
              <div className="m-agenda-item" key={m.id}>
                <div className="m-date-box">
                  <span className="m-day">{new Date(m.dateTime).getDate()}</span>
                  <span className="m-month">{new Date(m.dateTime).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                </div>
                <div className="m-agenda-details">
                  <div className="m-agenda-name">{m.title}</div>
                  <div className="m-agenda-meta">
                    <span>🕒 {new Date(m.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>📍 {m.location}</span>
                  </div>
                </div>
                <span className={`m-tag ${m.audience === 'STAFF' ? 'm-staff-only' : m.audience === 'MEMBERS' ? 'm-all-members' : 'm-both'}`}>
                  {m.audience}
                </span>
              </div>
            ))}
          </div>

          {/* Historical Records */}
          <div className="m-historical-records-card">
            <div className="m-records-header">
              <div className="m-records-title"><span>🕒</span> Historical Records</div>
              <a href="#" className="m-view-all">VIEW ALL ARCHIVE</a>
            </div>
            {pastMeetings.map(m => (
              <div className="m-record-row" key={m.id}>
                <div className="m-record-info">
                  <div className="m-event-name">{m.title}</div>
                  <div className="m-event-code">MEETING ID: #{m.id}</div>
                </div>
                <div className="m-record-date">{new Date(m.dateTime).toLocaleDateString()}</div>
                <div className="m-status m-archived">ARCHIVED</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MeetingsManagement;