import React from "react";
import "./ClubProfile.css";
import { Link } from "react-router-dom";

const ClubProfile = () => {
  return (
    <div className="club-profile-container">
      {/* Left Sidebar */}
      <aside className="club-sidebar">
        <div className="club-sidebar-header">
          <h2>Club Manager</h2>
        </div>
        <nav className="club-nav">
          <a href="#" className="nav-link active">📊 Dashboard</a>
        <Link to="/member-management" className="nav-link">👥 Members</Link>
           <Link to="/staff" className="nav-link">👔 Staff</Link>
          <Link to="/meetings" className="nav-link">📅 Meetings</Link>
          
        </nav>
        <button className="create-new-button">+ Create New Entry</button>
      </aside>

      {/* Main Content */}
      <main className="club-main-content">
        {/* Club Header */}
        <div className="club-main-header">
          <div className="club-info">
            <h1 className="club-name">Modern Literature Society</h1>
            <p className="club-subtitle">Founded 1924 • Faculty of Arts & Humanities</p>
          </div>
          <button className="edit-profile-button">✏️ Edit Profile</button>
        </div>

        {/* Top Cards Grid - Now more attractive */}
        <div className="content-grid">
          {/* Member Growth - Enhanced Card */}
          <div className="stat-card member-growth-card">
            <h3 className="card-title">MEMBER GROWTH</h3>
            <div className="growth-number">
              1,248 <span className="growth-rate">+12%</span>
            </div>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "83%" }}></div>
              </div>
            </div>
            <div className="goal-text">GOAL: 1500</div>
          </div>

          {/* Faculty Distribution - Enhanced Card */}
          <div className="stat-card faculty-distribution-card">
            <div className="card-header">
              <h3 className="card-title">FACULTY DISTRIBUTION</h3>
              <div className="pie-placeholder">◔</div>
            </div>
            <div className="distribution-list">
              <div className="dist-item">
                <span className="dot arts"></span>
                <span className="faculty-name">Arts & Hum.</span>
                <span className="percentage">45%</span>
              </div>
              <div className="dist-item">
                <span className="dot engineering"></span>
                <span className="faculty-name">Engineering</span>
                <span className="percentage">22%</span>
              </div>
              <div className="dist-item">
                <span className="dot business"></span>
                <span className="faculty-name">Business</span>
                <span className="percentage">18%</span>
              </div>
              <div className="dist-item">
                <span className="dot science"></span>
                <span className="faculty-name">Science</span>
                <span className="percentage">15%</span>
              </div>
            </div>
          </div>

          {/* Upcoming Meetings */}
          <div className="stat-card upcoming-meetings-card">
            <h3 className="card-title">UPCOMING MEETINGS</h3>

            <div className="meeting">
              <div className="meeting-date">
                <span className="day">14</span>
                <span className="month">OCT</span>
              </div>
              <div className="meeting-info">
                <div className="meeting-name">Post-Modernism Symposium</div>
                <div className="meeting-time">16:30 – 18:00</div>
                <div className="meeting-location">Great Hall, Room 4B</div>
              </div>
            </div>

            <div className="meeting">
              <div className="meeting-date">
                <span className="day">21</span>
                <span className="month">OCT</span>
              </div>
              <div className="meeting-info">
                <div className="meeting-name">Weekly Editorial Review</div>
                <div className="meeting-time">15:00 – 16:30</div>
                <div className="meeting-location">Student Center Lobby</div>
              </div>
            </div>

            <div className="meeting">
              <div className="meeting-date">
                <span className="day">28</span>
                <span className="month">OCT</span>
              </div>
              <div className="meeting-info">
                <div className="meeting-name">Member Networking Night</div>
                <div className="meeting-time">19:00 – 21:00</div>
                <div className="meeting-location">The Faculty Club</div>
              </div>
            </div>

            <button className="schedule-meeting-btn">Schedule Meeting</button>
          </div>
        </div>

        {/* Member Management */}
        <div className="member-management-section">
          <div className="section-header">
            <h2>Member Management</h2>
            <div className="filters">
              <select className="faculty-select">
                <option>ALL FACULTIES</option>
                <option>Arts & Humanities</option>
                <option>Engineering</option>
                <option>Business</option>
                <option>Science</option>
                <option>Law</option>
                <option>Medicine</option>
              </select>
              <input type="text" placeholder="Search members..." className="member-search-input" />
            </div>
          </div>

          <div className="members-list">
            <div className="member-row">
              <div className="member-details">
                <div className="avatar-small">👨🏻‍💼</div>
                <div>
                  <div className="member-name">Elena Rodriguez</div>
                  <div className="member-title">Senior Editor • Arts & Hum.</div>
                </div>
              </div>
              <span className="status-badge active">ACTIVE MEMBER</span>
              <div className="action-icon">👤</div>
            </div>

            <div className="member-row">
              <div className="member-details">
                <div className="avatar-small">👩🏽</div>
                <div>
                  <div className="member-name">Julian Thorne</div>
                  <div className="member-title">Member • Science</div>
                </div>
              </div>
              <span className="status-badge active">ACTIVE MEMBER</span>
              <div className="action-icon">👤</div>
            </div>

            <div className="member-row">
              <div className="member-details">
                <div className="avatar-small">🧔🏻</div>
                <div>
                  <div className="member-name">Marcus Vane</div>
                  <div className="member-title">Member • Business</div>
                </div>
              </div>
              <span className="status-badge active">ACTIVE MEMBER</span>
              <div className="action-icon">👤</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClubProfile;