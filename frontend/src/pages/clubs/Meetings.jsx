import React, { useState } from 'react';
import './Meetings.css';

const MeetingsManagement = () => {
  const [audience, setAudience] = useState('both');
  const [meetingData, setMeetingData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent non-letter characters for title
    if (name === 'title') {
      if (/[^A-Za-z ]/.test(value)) return; // ignore invalid input
    }

    setMeetingData({ ...meetingData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    // Title validation: letters and spaces only
    if (!meetingData.title.trim()) newErrors.title = "Meeting title is required";
    else if (!/^[A-Za-z ]+$/.test(meetingData.title.trim()))
      newErrors.title = "Only letters and spaces allowed in title";

    // Date & Time validation
    if (!meetingData.date) newErrors.date = "Date is required";
    if (!meetingData.time) newErrors.time = "Time is required";
    if (meetingData.date && meetingData.time) {
      const now = new Date();
      const selectedDateTime = new Date(meetingData.date + 'T' + meetingData.time);
      if (selectedDateTime < now) newErrors.date = "Date & time cannot be in the past";
    }

    // Location
    if (!meetingData.location.trim()) newErrors.location = "Location/Link is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Scheduled Meeting:", { ...meetingData, audience });
      alert("Meeting scheduled successfully! (Check console for data)");
      setMeetingData({ title: '', date: '', time: '', location: '' });
      setErrors({});
      setAudience('both');
    }
  };

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Get current time in HH:MM format
  const getCurrentTime = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  };

  return (
    <div className="meetings-management-page">
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
        {/* Top Bar */}
        <header className="m-top-bar">
          <div className="m-top-left"></div>
          <div className="m-search-container">
            <input
              type="text"
              placeholder="Search archives..."
              className="m-search-input"
            />
          </div>
        </header>

        {/* Page Header */}
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
              <div className="m-agenda-title">
                <span>📅</span> Active Agenda
              </div>
              <span className="m-scheduled-badge">3 SCHEDULED</span>
            </div>

            <div className="m-agenda-item">
              <div className="m-date-box">
                <span className="m-day">24</span>
                <span className="m-month">OCT</span>
              </div>
              <div className="m-agenda-details">
                <div className="m-agenda-name">Quarterly Review Session</div>
                <div className="m-agenda-meta">
                  <span>🕒 14:00 PM</span>
                  <span>📍 Main Library, Room 2B</span>
                </div>
              </div>
              <span className="m-tag m-staff-only">STAFF ONLY</span>
            </div>

            <div className="m-agenda-item">
              <div className="m-date-box">
                <span className="m-day">28</span>
                <span className="m-month">OCT</span>
              </div>
              <div className="m-agenda-details">
                <div className="m-agenda-name">Open Member Symposium</div>
                <div className="m-agenda-meta">
                  <span>🕒 10:30 AM</span>
                  <span>🔗 meet.google.com/abc-xyz</span>
                </div>
              </div>
              <span className="m-tag m-all-members">ALL MEMBERS</span>
            </div>
          </div>

          {/* Historical Records */}
          <div className="m-historical-records-card">
            <div className="m-records-header">
              <div className="m-records-title">
                <span>🕒</span> Historical Records
              </div>
              <a href="#" className="m-view-all">VIEW ALL ARCHIVE</a>
            </div>

            <div className="m-records-table">
              <div className="m-record-row">
                <div className="m-record-info">
                  <div className="m-event-name">Founders' Annual Gala Planning</div>
                  <div className="m-event-code">EVENT CODE: #2023-45A</div>
                </div>
                <div className="m-record-date">Oct 12, 2023</div>
                <div className="m-status m-archived">ARCHIVED</div>
              </div>

              <div className="m-record-row">
                <div className="m-record-info">
                  <div className="m-event-name">Drafting Constitutional Amendments</div>
                  <div className="m-event-code">EVENT CODE: #2023-44C</div>
                </div>
                <div className="m-record-date">Oct 08, 2023</div>
                <div className="m-status m-recorded">RECORDED</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MeetingsManagement;