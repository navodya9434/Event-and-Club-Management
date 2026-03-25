import React, { useState } from 'react';
import './Meetings.css';

const MeetingsManagement = () => {
  const [audience, setAudience] = useState('both');

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
          <div className="m-top-left">
          </div>
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

            <div className="m-form-group">
              <label>MEETING TITLE</label>
              <input
                type="text"
                placeholder="e.g., Editorial Board Sync"
                className="m-title-input"
              />
            </div>

            <div className="m-form-row">
              <div className="m-form-group">
                <label>DATE</label>
                <input type="text" placeholder="mm/dd/yyyy" className="m-date-input" />
              </div>
              <div className="m-form-group">
                <label>TIME</label>
                <input type="text" placeholder="--:-- --" className="m-time-input" />
              </div>
            </div>

            <div className="m-form-group">
              <label>LOCATION / LINK</label>
              <input
                type="text"
                placeholder="Room 402 or Zoom URL"
                className="m-location-input"
              />
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

            <button className="m-finalize-btn">Finalize Schedule</button>
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