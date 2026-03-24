import React, { useState } from 'react';
import './Staff.css';

const StaffProfiles = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    position: '',
    email: '',
    phone: '',
    location: '',
  });

  const staffMembers = [
    {
      id: 1,
      name: "Dr. Julian Vance",
      age: "45",
      role: "FACULTY ADVISOR",
      roleColor: "faculty",
      email: "j.vance@university.edu",
      location: "Hall of Letters, Rm 402",
      avatar: "https://i.pravatar.cc/300?u=julian",
    },
    {
      id: 2,
      name: "Elena Rodriguez",
      age: "22",
      role: "PRESIDENT",
      roleColor: "president",
      email: "e.rodriguez@student.edu",
      phone: "+1 (555) 092-4412",
      avatar: "https://i.pravatar.cc/300?u=elena",
    },
    {
      id: 3,
      name: "Marcus Chen",
      age: "21",
      role: "SECRETARY",
      roleColor: "secretary",
      email: "m.chen@student.edu",
      schedule: "Mon-Fri: 2PM - 5PM",
      avatar: "https://i.pravatar.cc/300?u=marcus",
    },
    {
      id: 4,
      name: "Sarah Jenkins",
      age: "23",
      role: "TREASURER",
      roleColor: "treasurer",
      email: "s.jenkins@student.edu",
      responsibility: "Budget Oversights",
      avatar: "https://i.pravatar.cc/300?u=sarah",
    },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Staff Added:", { ...formData, avatar: previewImage });
    alert("Staff member added successfully! (Check console for data)");
    setShowAddForm(false);
    setPreviewImage(null);
    setFormData({ name: '', age: '', position: '', email: '', phone: '', location: '' });
  };

  return (
    <div className="staff-profiles-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">🎓</div>
          <div>
            <div className="brand">Academic Editorial</div>
            <div className="sub-brand">CLUB ADMINISTRATION</div>
          </div>
        </div>

        <nav className="nav-menu">
          <a href="#" className="nav-item">📊 Dashboard</a>
          <a href="#" className="nav-item">👥 Members</a>
          <a href="#" className="nav-item active">👔 Staff</a>
          <a href="#" className="nav-item">📅 Meetings</a>
          <a href="#" className="nav-item">🛍️ Merchandise</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-bar">
          <div className="page-title">
            <h1>Staff Profiles</h1>
            <p>Managing the core operational team of the Academic Editorial.</p>
          </div>

          <div className="top-actions">
            <div className="filter-container">
              <input
                type="text"
                placeholder="Filter by position..."
                className="filter-input"
              />
              <button className="search-icon">🔍</button>
            </div>
            <button className="notification-btn">🛎️</button>
          </div>
        </header>

        {/* Staff Grid */}
        <div className="staff-grid">
          {staffMembers.map((staff) => (
            <div key={staff.id} className="staff-card">
              <div className="avatar-container">
                <img src={staff.avatar} alt={staff.name} className="staff-avatar" />
              </div>

              <div className="staff-info">
                <div className="name-age">
                  <h3>{staff.name}</h3>
                  <span className="age">{staff.age} Yrs</span>
                </div>

                <span className={`role-badge ${staff.roleColor}`}>
                  {staff.role}
                </span>

                <div className="contact-info">
                  <div className="contact-row">
                    <span className="icon">✉️</span>
                    <span>{staff.email}</span>
                  </div>
                  {staff.phone && (
                    <div className="contact-row">
                      <span className="icon">📞</span>
                      <span>{staff.phone}</span>
                    </div>
                  )}
                  {staff.location && (
                    <div className="contact-row">
                      <span className="icon">📍</span>
                      <span>{staff.location}</span>
                    </div>
                  )}
                  {staff.schedule && (
                    <div className="contact-row">
                      <span className="icon">🕒</span>
                      <span>{staff.schedule}</span>
                    </div>
                  )}
                  {staff.responsibility && (
                    <div className="contact-row">
                      <span className="icon">📋</span>
                      <span>{staff.responsibility}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add Staff Card */}
          <div className="add-staff-card" onClick={() => setShowAddForm(true)}>
            <div className="add-icon">👤+</div>
            <h3>Add Staff Member</h3>
            <p>Invite a new team member to the administration board.</p>
          </div>
        </div>
      </main>

      {/* Add Staff Modal with Image Upload */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Staff Member</h2>

            <form className="add-staff-form" onSubmit={handleSubmit}>
              {/* Image Upload */}
              <div className="image-upload-group">
                <label>Profile Photo</label>
                <div className="upload-area">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="image-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <span>📸</span>
                      <p>Click to upload photo</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Position</label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Position</option>
                    <option value="Faculty Advisor">Faculty Advisor</option>
                    <option value="President">President</option>
                    <option value="Secretary">Secretary</option>
                    <option value="Treasurer">Treasurer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@university.edu"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label>Office / Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Hall of Letters, Rm 402"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowAddForm(false);
                    setPreviewImage(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffProfiles;