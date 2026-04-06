import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MemberManagement.css';
import { useParams } from 'react-router-dom';

const MemberManagement = () => {
  const { clubId } = useParams(); // ✅ Call at top-level of component
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [facultyFilter, setFacultyFilter] = useState(""); 
  const [allFaculties, setAllFaculties] = useState([]); // for dropdown options

  // Fetch members from backend API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT token
        if (!token) {
          console.error("No JWT token found. Please login.");
          return;
        }

        const res = await axios.get(
          `http://localhost:8080/api/clubs/members?clubId=${clubId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMembers(res.data); // expects array of ClubMember objects with clubName

        // Extract unique faculties for filter dropdown
        const faculties = [...new Set(res.data.map(m => m.faculty).filter(f => f))];
        setAllFaculties(faculties);

      } catch (err) {
        console.error("Error fetching members:", err);

        if (err.response && err.response.status === 403) {
          alert("You are not allowed to view this club's members.");
        } else {
          alert("Failed to load members. Check console for details.");
        }
      }
    };

    if (clubId) fetchMembers(); // ✅ only fetch if clubId exists
  }, [clubId]); // ✅ depend on clubId

  // Filter members based on search query AND faculty filter
  const filteredMembers = members.filter((m) => {
    const fullText = `${m.firstName} ${m.lastName} ${m.faculty} ${m.email} ${m.mobileNumber} ${m.dob} ${m.joinedAt} ${m.clubName || ""}`.toLowerCase();
    const matchesSearch = fullText.includes(searchQuery.toLowerCase());
    const matchesFaculty = facultyFilter === "" || (m.faculty || "").toLowerCase().includes(facultyFilter.toLowerCase());
    return matchesSearch && matchesFaculty;
  });

  // Handle delete with confirmation
  const handleDelete = async (memberId) => {
    if (!window.confirm("Are you sure you want to remove this member?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/club_members/${memberId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers((prev) => prev.filter((m) => m.memberId !== memberId));
    } catch (err) {
      console.error("Error deleting member:", err);
      alert("Failed to delete member. Check console for details.");
    }
  };

  return (
    <div className="member-management-page">
      {/* Sidebar */}
      <aside className="mm-sidebar">
        <div className="mm-logo">
          <span className="mm-logo-icon">🎓</span>
          <div>
            <div className="mm-brand">The Academic Editorial</div>
            <div className="mm-sub-brand">CLUB ADMINISTRATION</div>
          </div>
        </div>

        <nav className="mm-nav-menu">
          <a href="#" className="mm-nav-item">
            <span className="mm-icon">📊</span> Dashboard
          </a>
          <a href="#" className="mm-nav-item active">
            <span className="mm-icon">👥</span> Members
          </a>
          <a href="#" className="mm-nav-item">
            <span className="mm-icon">👔</span> Staff
          </a>
          <a href="#" className="mm-nav-item">
            <span className="mm-icon">📅</span> Meetings
          </a>
          <a href="#" className="mm-nav-item">
            <span className="mm-icon">🛍️</span> Merchandise
          </a>
        </nav>

        <div className="mm-sidebar-footer">
          <div className="mm-admin-portal">
            <div className="mm-admin-icon">🛡️</div>
            <div>
              <div className="mm-admin-title">Admin Portal</div>
              <div className="mm-admin-version">v2.4.0-Final</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="mm-main-content">
        {/* Top Bar */}
        <header className="mm-top-bar">
          <div className="mm-search-container">
            <input
              type="text"
              placeholder="Search members by any detail..."
              className="mm-global-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Faculty Filter Dropdown */}
            <select
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
              className="mm-faculty-filter"
            >
              <option value="">All Faculties</option>
              {allFaculties.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </header>

        {/* Page Header */}
        <div className="mm-page-header">
          <h1>Member Management</h1>
          <p>Curate and oversee your academic community roster.</p>
        </div>

        {/* Join Requests Section */}
        <div className="mm-join-requests-section">
          <div className="mm-section-title">
            <span>📬</span> Join Requests
            <span className="mm-pending-badge">4 PENDING</span>
          </div>

          <div className="mm-join-requests-grid">
            {/* Mock Join Requests */}
            <div className="mm-request-card">
              <div className="mm-request-avatar">AJ</div>
              <div className="mm-request-info">
                <div className="mm-name">Alex Johnson</div>
                <div className="mm-faculty">COMPUTER SCIENCE</div>
              </div>
              <div className="mm-request-actions">
                <button className="mm-accept-btn">Accept</button>
                <button className="mm-deny-btn">Deny</button>
              </div>
            </div>
            <div className="mm-request-card">
              <div className="mm-request-avatar">MW</div>
              <div className="mm-request-info">
                <div className="mm-name">Marcus Wright</div>
                <div className="mm-faculty">THEORETICAL PHYSICS</div>
              </div>
              <div className="mm-request-actions">
                <button className="mm-accept-btn">Accept</button>
                <button className="mm-deny-btn">Deny</button>
              </div>
            </div>
            <div className="mm-request-card">
              <div className="mm-request-avatar">EL</div>
              <div className="mm-request-info">
                <div className="mm-name">Elena Luz</div>
                <div className="mm-faculty">FINE ARTS</div>
              </div>
              <div className="mm-request-actions">
                <button className="mm-accept-btn">Accept</button>
                <button className="mm-deny-btn">Deny</button>
              </div>
            </div>
          </div>
        </div>

        {/* Member Directory */}
        <div className="mm-member-directory-section">
          <div className="mm-directory-header">
            <div className="mm-section-title">
              <span>👥</span> Member Directory
            </div>
          </div>

          <div className="mm-members-grid">
            {filteredMembers.map((member) => (
              <div className="mm-member-card" key={member.memberId}>
                {/* Member Photo */}
                <div className="mm-member-photo-container">
                  {member.photo ? (
                    <img
                      src={`http://localhost:8080/${member.photo}`}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="mm-member-photo"
                    />
                  ) : (
                    <div className="mm-member-photo-placeholder">👤</div>
                  )}
                </div>

                {/* Member Info */}
                <div className="mm-member-info">
                  <div className="mm-name">
                    {member.firstName} {member.lastName}
                  </div>
                  <div className="mm-faculty">Faculty: {member.faculty || "-"}</div>
                  <div className="mm-club">Club: {member.clubName || "-"}</div>
                  <div className="mm-email">Email: {member.email}</div>
                  <div className="mm-mobile">Mobile: {member.mobileNumber || "-"}</div>
                  <div className="mm-joined">
                    Joined: {new Date(member.joinedAt).toLocaleDateString()}
                  </div>
                  <div className="mm-dob">
                    DOB: {member.dob ? new Date(member.dob).toLocaleDateString() : "-"}
                  </div>
                  
                </div>
              </div>
            ))}
          </div>

          {filteredMembers.length < members.length && (
            <button
              className="mm-load-more-btn"
              onClick={() => setMembers(members)}
            >
              LOAD MORE ENTRIES
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default MemberManagement;