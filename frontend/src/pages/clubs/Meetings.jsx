import React, { useState } from 'react';
import './Meetings.css';

const MeetingsManagement = () => {
  const [audience, setAudience] = useState('both');

  return (
    <div className="meetings-management-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">🎓</div>
          <div>
            <div className="brand">Club Manager</div>
            <div className="sub-brand">ELITE ACADEMIC ARCHIVE</div>
          </div>
        </div>

        <nav className="nav-menu">
          <a href="#" className="nav-item">📊 DASHBOARD</a>
          <a href="#" className="nav-item">👥 MEMBERS</a>
          <a href="#" className="nav-item">👔 STAFF</a>
          <a href="#" className="nav-item active">📅 MEETINGS</a>
          <a href="#" className="nav-item">🛍️ MERCHANDISE</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="top-left">
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search archives..."
              className="search-input"
            />
          </div>
          
        </header>

        {/* Page Header */}
        <div className="page-header">
          <h1>Meetings Management</h1>
          <p>Coordinate schedules, manage attendance, and archive historical scholarly records.</p>
        </div>

        <div className="content-grid">
          {/* Schedule New Session Form */}
          <div className="schedule-form-card">
            <div className="form-header">
              <span className="form-icon">📅</span>
              <h2>Schedule New Session</h2>
            </div>

            <div className="form-group">
              <label>MEETING TITLE</label>
              <input
                type="text"
                placeholder="e.g., Editorial Board Sync"
                className="title-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>DATE</label>
                <input type="text" placeholder="mm/dd/yyyy" className="date-input" />
              </div>
              <div className="form-group">
                <label>TIME</label>
                <input type="text" placeholder="--:-- --" className="time-input" />
              </div>
            </div>

            <div className="form-group">
              <label>LOCATION / LINK</label>
              <input
                type="text"
                placeholder="Room 402 or Zoom URL"
                className="location-input"
              />
            </div>

            <div className="audience-section">
              <label>AUDIENCE SELECTION</label>
              <div className="audience-options">
                <label className={`audience-option ${audience === 'staff' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="audience"
                    checked={audience === 'staff'}
                    onChange={() => setAudience('staff')}
                  />
                  Staff Only
                </label>
                <label className={`audience-option ${audience === 'members' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="audience"
                    checked={audience === 'members'}
                    onChange={() => setAudience('members')}
                  />
                  Members Only
                </label>
                <label className={`audience-option ${audience === 'both' ? 'selected' : ''}`}>
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

            <button className="finalize-btn">Finalize Schedule</button>
          </div>

          {/* Active Agenda */}
          <div className="active-agenda-card">
            <div className="agenda-header">
              <div className="agenda-title">
                <span>📅</span> Active Agenda
              </div>
              <span className="scheduled-badge">3 SCHEDULED</span>
            </div>

            <div className="agenda-item">
              <div className="date-box">
                <span className="day">24</span>
                <span className="month">OCT</span>
              </div>
              <div className="agenda-details">
                <div className="agenda-name">Quarterly Review Session</div>
                <div className="agenda-meta">
                  <span>🕒 14:00 PM</span>
                  <span>📍 Main Library, Room 2B</span>
                </div>
              </div>
              <span className="tag staff-only">STAFF ONLY</span>
            </div>

            <div className="agenda-item">
              <div className="date-box">
                <span className="day">28</span>
                <span className="month">OCT</span>
              </div>
              <div className="agenda-details">
                <div className="agenda-name">Open Member Symposium</div>
                <div className="agenda-meta">
                  <span>🕒 10:30 AM</span>
                  <span>🔗 meet.google.com/abc-xyz</span>
                </div>
              </div>
              <span className="tag all-members">ALL MEMBERS</span>
            </div>
          </div>

          {/* Historical Records */}
          <div className="historical-records-card">
            <div className="records-header">
              <div className="records-title">
                <span>🕒</span> Historical Records
              </div>
              <a href="#" className="view-all">VIEW ALL ARCHIVE</a>
            </div>

            <div className="records-table">
              <div className="record-row">
                <div className="record-info">
                  <div className="event-name">Founders' Annual Gala Planning</div>
                  <div className="event-code">EVENT CODE: #2023-45A</div>
                </div>
                <div className="record-date">Oct 12, 2023</div>
                <div className="status archived">ARCHIVED</div>
              </div>

              <div className="record-row">
                <div className="record-info">
                  <div className="event-name">Drafting Constitutional Amendments</div>
                  <div className="event-code">EVENT CODE: #2023-44C</div>
                </div>
                <div className="record-date">Oct 08, 2023</div>
                <div className="status recorded">RECORDED</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MeetingsManagement;