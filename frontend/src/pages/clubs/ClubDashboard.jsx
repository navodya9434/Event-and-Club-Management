import React from 'react';
import { Link } from 'react-router-dom';
import './ClubDashboard.css';

const Dashboard = () => {
  return (
    <div className="cm-dashboard">
      {/* Sidebar */}
      <div className="cm-sidebar">
        <div className="cm-logo">
          <div className="cm-logo-icon">🎓</div>
          <div className="cm-logo-text">
            <strong>Editorial Board</strong>
            <div className="cm-logo-sub">CLUB MANAGEMENT</div>
          </div>
        </div>

        <nav className="cm-nav">
          <a href="#" className="cm-nav-item cm-active">👥 My Clubs</a>
          <a href="#" className="cm-nav-item">✅ Approvals</a>
          <a href="#" className="cm-nav-item">📅 Meetings</a>
<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

<Link to="/create-club" className="cm-create-btn">
  + Create New Club
</Link>          
        </nav>

        <div className="cm-sidebar-bottom">
          
        </div>
      </div>

      {/* Main Content */}
      <div className="cm-main-content">
        {/* Top Bar */}
        <div className="cm-topbar">
          <div className="cm-title">The Academic Editorial</div>
          <div className="cm-search-bar">
            <input type="text" placeholder="Search publications or clubs..." />
          </div>

          <div className="cm-user-info">
            <div className="cm-notification">🛎️</div>
            <div className="cm-user">
              <div className="cm-user-text">
                <strong>Dr. Alistair Vance</strong>
                <div>Senior Curator</div>
              </div>
              <div className="cm-avatar">👨‍💼</div>
            </div>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="cm-welcome-banner">
          <h1>Welcome back, Curator.</h1>
          <p>
            You have <strong>4 pending club approvals</strong> and 2 committee meetings
            scheduled for this afternoon. Your academic reach is currently growing
            at <strong>12% monthly</strong>.
          </p>

          <div className="cm-stats">
            <div className="cm-stat-card">
              <div className="cm-stat-label">ACTIVE CLUBS</div>
              <div className="cm-stat-value">18</div>
            </div>
            <div className="cm-stat-card">
              <div className="cm-stat-label">TOTAL MEMBERS</div>
              <div className="cm-stat-value">1.2k</div>
            </div>
          </div>
        </div>

        {/* My Clubs Section */}
        <div className="cm-section">
          <div className="cm-section-header">
            <h2>My Clubs</h2>
            <a href="#" className="cm-view-all">View All Registry →</a>
          </div>

          <div className="cm-clubs-grid">
            {/* Club Card Example - Architecture Guild */}
            <Link to="/club-profile" className="cm-club-card-link">
              <div className="cm-club-card">
                <div className="cm-club-icon">🏛️</div>
                <span className="cm-status cm-approved">APPROVED</span>
                <h3>The Architecture Guild</h3>
                <p>Exploring Brutalist and Modernist movements in urban planning...</p>
                <div className="cm-members">
                  <div className="cm-avatars">
                    <span>🧔</span>
                    <span>👩‍💼</span>
                  </div>
                  <span className="cm-member-count">+12</span>
                </div>
              </div>
            </Link>

            {/* Club Card Example - Quantum Ethics Soc. */}
            <Link to="/club-profile" className="cm-club-card-link">
              <div className="cm-club-card">
                <div className="cm-club-icon">⚛️</div>
                <span className="cm-status cm-approved">APPROVED</span>
                <h3>Quantum Ethics Soc.</h3>
                <p>Discussing the philosophical implications of multi-verse theories...</p>
                <div className="cm-members">
                  <div className="cm-avatars">
                    <span>🧔</span>
                    <span>👩‍🔬</span>
                  </div>
                  <span className="cm-member-count">+42</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="cm-section">
          <div className="cm-section-header">
            <h2>Pending Approvals</h2>
            <span className="cm-review-count">4 REVIEWS</span>
          </div>

          <div className="cm-pending-grid">
            <div className="cm-pending-card">
              <div className="cm-pending-icon">📖</div>
              <div className="cm-pending-info">
                <h4>Modern Literature Circle</h4>
                <p>Submitted by Leo Thorne • 2 hours ago</p>
              </div>
              <span className="cm-stage">VERIFICATION STAGE</span>
              <button className="cm-review-btn">Review Case</button>
            </div>

            <div className="cm-pending-card">
              <div className="cm-pending-icon">🏔️</div>
              <div className="cm-pending-info">
                <h4>Alpine Geopolitics</h4>
                <p>Submitted by Sarah Finch • Yesterday</p>
              </div>
              <span className="cm-stage">BUDGETING</span>
              <button className="cm-review-btn">Review Case</button>
            </div>
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="cm-upcoming-meetings">
          <div className="cm-section-header">
            <h2>Upcoming Meetings</h2>
          </div>

          <div className="cm-meeting-list">
            <div className="cm-meeting-item">
              <div className="cm-meeting-date">
                <span className="cm-day">14</span>
                <span className="cm-month">OCT</span>
              </div>
              <div className="cm-meeting-details">
                <h4>Editorial Strategy Session</h4>
                <p>09:30 AM • Room 402-C</p>
              </div>
            </div>

            <div className="cm-meeting-item">
              <div className="cm-meeting-date">
                <span className="cm-day">16</span>
                <span className="cm-month">OCT</span>
              </div>
              <div className="cm-meeting-details">
                <h4>Digital Archives Workshop</h4>
                <p>02:00 PM • Virtual</p>
              </div>
            </div>

            <div className="cm-meeting-item">
              <div className="cm-meeting-date">
                <span className="cm-day">21</span>
                <span className="cm-month">OCT</span>
              </div>
              <div className="cm-meeting-details">
                <h4>Annual Founders Dinner</h4>
                <p>07:30 PM • Great Hall</p>
              </div>
            </div>
          </div>

          <button className="cm-add-calendar">Add to Calendar</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;