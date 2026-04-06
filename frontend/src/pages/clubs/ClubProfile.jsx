import React, { useEffect, useState } from "react";
import "./ClubProfile.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ClubProfile = () => {
  const { clubId } = useParams(); // expects route like /club/:clubId
  const [clubData, setClubData] = useState(null);
  const [members, setMembers] = useState([]);
  const [facultyDistribution, setFacultyDistribution] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("ALL FACULTIES");

  // Map of faculty colors
  const facultyColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ JWT token
        if (!token) {
          console.error("No JWT token found. Please login.");
          return;
        }

        const res = await axios.get(`http://localhost:8080/api/clubs/${clubId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ pass token
          },
        });

        const data = res.data;
        setClubData(data.club);
        setMembers(data.members || []);
        setFacultyDistribution(data.facultyDistribution || {});
      } catch (err) {
        console.error("Error fetching club data:", err);
      }
    };

    fetchClubData();
  }, [clubId]);

  // Convert facultyDistribution object to array and assign colors
  const facultyArray = Object.entries(facultyDistribution).map(([faculty, count], idx) => ({
    faculty,
    count,
    color: facultyColors[idx % facultyColors.length],
  }));

  // Filter and search members
  const filteredMembers = members
  .filter((m) => {
    const fullName = (m.name || `${m.firstName || ""} ${m.lastName || ""}`).trim().toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  })
  .filter((m) =>
    selectedFaculty === "ALL FACULTIES" ? true : m.faculty === selectedFaculty
  )
  .slice(-4); // latest 4 members

  return (
    <div className="club-profile-container">
      {/* Left Sidebar */}
      <aside className="club-sidebar">
        <div className="club-sidebar-header">
          <h2>Club Manager</h2>
        </div>
        <nav className="club-nav">
  <a href="#" className="nav-link active">📊 Dashboard</a>
{clubData && (
  <Link to={`/member-management/${clubData.id}`} className="nav-link">
    👥 Members
  </Link>
)}<Link to={`/staff/${clubData?.id}`} className="nav-link">👔 Staff</Link>
<Link to={`/meetings/${clubData?.id}`} className="nav-link">📅 Meetings</Link>
</nav>
        <button className="create-new-button">+ Create New Entry</button>
      </aside>

      {/* Main Content */}
      <main className="club-main-content">
        {/* Club Header */}
        <div className="club-main-header">
          <div className="club-info">
            <h1 className="club-name">{clubData?.name || "Club Name"}</h1>
            <p className="club-subtitle">
              Founded {clubData?.foundedYear || "N/A"} • {clubData?.faculty || "Faculty"}
            </p>
          </div>
          <button className="edit-profile-button">✏️ Edit Profile</button>
        </div>

        {/* Top Cards Grid */}
        <div className="content-grid">
          {/* Member Growth */}
          <div className="stat-card member-growth-card">
            <h3 className="card-title">MEMBER GROWTH</h3>
            <div className="growth-number">
              {members.length} <span className="growth-rate">+12%</span>
            </div>
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min((members.length / 1500) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="goal-text">GOAL: 1500</div>
          </div>

          {/* Faculty Distribution */}
          <div className="stat-card faculty-distribution-card">
            <div className="card-header">
              <h3 className="card-title">FACULTY DISTRIBUTION</h3>
              <div className="pie-placeholder">
                {/* Simulated pie chart */}
                {facultyArray.map((f) => (
  <span
    key={f.faculty}   // ✅ ADD THIS
    className="pie-segment"
    style={{ backgroundColor: f.color }}
  />
))}
              </div>
            </div>
            <div className="distribution-list">
              {facultyArray.map((f) => (
                <div className="dist-item" key={f.faculty}>
                  <span
                    className="dot"
                    style={{ backgroundColor: f.color }}
                  ></span>
                  <span className="faculty-name">{f.faculty}</span>
                  <span className="percentage">
                    {Math.round((f.count / members.length) * 100) || 0}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Meetings */}
          <div className="stat-card upcoming-meetings-card">
            <h3 className="card-title">UPCOMING MEETINGS</h3>

            {/* Hardcoded sample meetings */}
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
              <select
                className="faculty-select"
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
              >
                <option>ALL FACULTIES</option>
                {facultyArray.map((f) => (
                  <option key={f.faculty}>{f.faculty}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Search members..."
                className="member-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="members-list">
            {filteredMembers.map((member) => (
              <div className="member-row" key={member.id}>
                <div className="member-details">
                  <div className="avatar-small">
                    {member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                      />
                    ) : (
                      "👤"
                    )}
                  </div>
                  <div>
<div className="member-name">{member.name || `${member.firstName || ""} ${member.lastName || ""}`.trim() || "Unnamed"}</div>                    <div className="member-title">{member.faculty || "Other"}</div>
                  </div>
                </div>
                <span className="status-badge active">ACTIVE MEMBER</span>
                <div className="action-icon">👤</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClubProfile;