import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ClubDashboard.css';

// Import the CreateClub form component
import CreateClub from './CreateClub'; // Make sure the path is correct

const Dashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [pendingClubs, setPendingClubs] = useState([]);
  const [approvedClubs, setApprovedClubs] = useState([]);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  // ✅ Get username safely
  const userName = localStorage.getItem('userName') || 'Organizer';

  // ✅ TIME AGO FUNCTION (ADDED)
  const getTimeAgo = (dateString) => {
    if (!dateString) return "just now";

    const now = new Date();
    const submitted = new Date(dateString);
    const diffMs = now - submitted;

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    return `${days} day(s) ago`;
  };

  // ✅ Fetch clubs using JWT
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        if (!token) throw new Error('No token found');

        const res = await fetch('http://localhost:8080/api/clubs', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          console.error('Failed to fetch clubs:', res.status, res.statusText);
          throw new Error('Failed to fetch clubs');
        }

        const data = await res.json();

        // ✅ Split based on status
        const fresh = data.filter(c => c.status === 'FRESH');
        const approved = data.filter(c => c.status === 'ACCEPTED');

        setPendingClubs(fresh);
        setApprovedClubs(approved);

      } catch (err) {
        console.error('Error fetching clubs:', err);
      }
    };

    fetchClubs();
  }, []);

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

          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

          <button 
            onClick={openCreateModal}
            className="cm-create-btn"
          >
            + Create New Club
          </button>
        </nav>
        <div className="cm-sidebar-bottom"></div>
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
                <strong>{userName}</strong>
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
            You have <strong>{pendingClubs.length} pending club approvals</strong> and 2 committee meetings
            scheduled for this afternoon. Your academic reach is currently growing
            at <strong>12% monthly</strong>.
          </p>
          <div className="cm-stats">
            <div className="cm-stat-card">
              <div className="cm-stat-label">ACTIVE CLUBS</div>
              <div className="cm-stat-value">{approvedClubs.length}</div>
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
            {approvedClubs.length === 0 && <p>No approved clubs.</p>}
          {approvedClubs.map(club => (
<Link to={`/club-profile/${club.id}`} key={club.id} className="cm-club-card-link">
    <div className="cm-club-card">
      {club.imagePath 
        ? <img src={`http://localhost:8080/${club.imagePath.replace(/\\/g, "/")}`} /> 
        : <div className="cm-club-icon">🏛️</div>
      }
      <span className={`cm-status ${club.status === 'ACCEPTED' ? 'cm-approved' : 'cm-pending'}`}>
        {club.status}
      </span>
      <h3>{club.name}</h3>
      {/* Removed description */}
      <div className="cm-members">
        <div className="cm-avatars"></div>
        <span className="cm-member-count">+{club.memberCount || 0}</span>
      </div>
    </div>
  </Link>
))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="cm-section">
          <div className="cm-section-header">
            <h2>Pending Approvals</h2>
            <span className="cm-review-count">{pendingClubs.length} REVIEWS</span>
          </div>
          <div className="cm-pending-grid">
            {pendingClubs.length === 0 && <p>No pending approvals.</p>}
            {pendingClubs.map(club => (
              <div key={club.id} className="cm-pending-card">
                {club.imagePath 
                  ? <img src={`http://localhost:8080/${club.imagePath.replace(/\\/g, "/")}`} />
                  : <div className="cm-pending-icon">📖</div>
                }
                <div className="cm-pending-info">
                  <h4>{club.name}</h4>
                  <p>Submitted by you • {getTimeAgo(club.submittedAt)}</p>
                </div>
                <span className="cm-stage">VERIFICATION STAGE</span>
                <button className="cm-review-btn">Review Case</button>
              </div>
            ))}
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

      {/* CREATE CLUB MODAL */}
      {isCreateModalOpen && (
        <div className="cm-modal-overlay" onClick={closeCreateModal}>
          <div 
            className="cm-modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cm-modal-close" onClick={closeCreateModal}>
              ✕
            </button>
            <CreateClub onClose={closeCreateModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;