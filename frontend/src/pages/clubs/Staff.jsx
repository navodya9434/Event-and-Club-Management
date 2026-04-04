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
  const [errors, setErrors] = useState({});

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
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: digits });
    } else if (name === "age") {
      const num = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: num });
    } else if (name === "name") {
      const clean = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData({ ...formData, [name]: clean });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    // Full Name: must have first and last, only letters
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (!/^[A-Za-z]+\s[A-Za-z]+$/.test(formData.name.trim())) {
      newErrors.name = "Enter first and last name (letters only)";
    }

    // Age
    if (!formData.age) newErrors.age = "Age is required";
    else if (+formData.age < 18 || +formData.age > 100) newErrors.age = "Age must be 18-100";

    // Position
    if (!formData.position) newErrors.position = "Position is required";

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email";

    // Phone
    if (!formData.phone) newErrors.phone = "Phone number required";
    else if (formData.phone.length !== 10) newErrors.phone = "Phone must be 10 digits";

    // Image
    if (!previewImage) newErrors.image = "Profile photo is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("New Staff Added:", { ...formData, avatar: previewImage });
      alert("Staff member added successfully! (Check console for data)");
      setShowAddForm(false);
      setPreviewImage(null);
      setFormData({ name: '', age: '', position: '', email: '', phone: '', location: '' });
      setErrors({});
    }
  };

  return (
    <div className="ss-staff-profiles-page">
      {/* Sidebar */}
      <aside className="ss-sidebar">
        <div className="ss-logo">
          <div className="ss-logo-icon">🎓</div>
          <div>
            <div className="ss-brand">Academic Editorial</div>
            <div className="ss-sub-brand">CLUB ADMINISTRATION</div>
          </div>
        </div>

        <nav className="ss-nav-menu">
          <a href="#" className="ss-nav-item">📊 Dashboard</a>
          <a href="#" className="ss-nav-item">👥 Members</a>
          <a href="#" className="ss-nav-item active">👔 Staff</a>
          <a href="#" className="ss-nav-item">📅 Meetings</a>
          <a href="#" className="ss-nav-item">🛍️ Merchandise</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ss-main-content">
        <header className="ss-top-bar">
          <div className="ss-page-title">
            <h1>Staff Profiles</h1>
            <p>Managing the core operational team of the Academic Editorial.</p>
          </div>

          <div className="ss-top-actions">
            <div className="ss-filter-container">
              <input type="text" placeholder="Filter by position..." className="ss-filter-input" />
              <button className="ss-search-icon">🔍</button>
            </div>
            <button className="ss-notification-btn">🛎️</button>
          </div>
        </header>

        {/* Staff Grid */}
        <div className="ss-staff-grid">
          {staffMembers.map((staff) => (
            <div key={staff.id} className="ss-staff-card">
              <div className="ss-avatar-container">
                <img src={staff.avatar} alt={staff.name} className="ss-staff-avatar" />
              </div>

              <div className="ss-staff-info">
                <div className="ss-name-age">
                  <h3>{staff.name}</h3>
                  <span className="ss-age">{staff.age} Yrs</span>
                </div>

                <span className={`ss-role-badge ${staff.roleColor}`}>
                  {staff.role}
                </span>

                <div className="ss-contact-info">
                  <div className="ss-contact-row"><span className="ss-icon">✉️</span><span>{staff.email}</span></div>
                  {staff.phone && <div className="ss-contact-row"><span className="ss-icon">📞</span><span>{staff.phone}</span></div>}
                  {staff.location && <div className="ss-contact-row"><span className="ss-icon">📍</span><span>{staff.location}</span></div>}
                  {staff.schedule && <div className="ss-contact-row"><span className="ss-icon">🕒</span><span>{staff.schedule}</span></div>}
                  {staff.responsibility && <div className="ss-contact-row"><span className="ss-icon">📋</span><span>{staff.responsibility}</span></div>}
                </div>
              </div>
            </div>
          ))}

          {/* Add Staff Card */}
          <div className="ss-add-staff-card" onClick={() => setShowAddForm(true)}>
            <div className="ss-add-icon">👤+</div>
            <h3>Add Staff Member</h3>
            <p>Invite a new team member to the administration board.</p>
          </div>
        </div>
      </main>

      {/* Add Staff Modal */}
      {showAddForm && (
        <div className="ss-modal-overlay">
          <div className="ss-modal">
            <h2>Add New Staff Member</h2>

            <form className="ss-add-staff-form" onSubmit={handleSubmit}>
              {/* Image Upload */}
              <div className="ss-image-upload-group">
                <label>Profile Photo</label>
                <div className="ss-upload-area">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="ss-image-preview" />
                  ) : (
                    <div className="ss-upload-placeholder">
                      <span>📸</span>
                      <p>Click to upload photo</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="ss-file-input" />
                  {errors.image && <span className="ss-error">{errors.image}</span>}
                </div>
              </div>

              {/* Name */}
              <div className="ss-form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter full name" required />
                {errors.name && <span className="ss-error">{errors.name}</span>}
              </div>

              {/* Age & Position */}
              <div className="ss-form-row">
                <div className="ss-form-group">
                  <label>Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Age" required />
                  {errors.age && <span className="ss-error">{errors.age}</span>}
                </div>
                <div className="ss-form-group">
                  <label>Position</label>
                  <select name="position" value={formData.position} onChange={handleInputChange} required>
                    <option value="">Select Position</option>
                    <option value="Faculty Advisor">Faculty Advisor</option>
                    <option value="President">President</option>
                    <option value="Secretary">Secretary</option>
                    <option value="Treasurer">Treasurer</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.position && <span className="ss-error">{errors.position}</span>}
                </div>
              </div>

              {/* Email */}
              <div className="ss-form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@university.edu" required />
                {errors.email && <span className="ss-error">{errors.email}</span>}
              </div>

              {/* Phone */}
              <div className="ss-form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="10-digit number" required />
                {errors.phone && <span className="ss-error">{errors.phone}</span>}
              </div>

              {/* Location */}
              <div className="ss-form-group">
                <label>Office / Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Hall of Letters, Rm 402" />
              </div>

              <div className="ss-modal-actions">
                <button type="button" className="ss-cancel-btn" onClick={() => { setShowAddForm(false); setPreviewImage(null); setErrors({}); }}>Cancel</button>
                <button type="submit" className="ss-submit-btn">Add Staff Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffProfiles;