import React, { useState, useEffect } from 'react';
import './Staff.css';
import axios from "axios";
import { useParams } from "react-router-dom";

const StaffProfiles = () => {

  const { clubId } = useParams(); // ✅ get clubId
const [staffMembers, setStaffMembers] = useState([]); // ✅ replace static data

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
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:8080/api/staff?clubId=${clubId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStaffMembers(res.data);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  if (clubId) fetchStaff();
}, [clubId]);

  
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

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("clubId", clubId);
    data.append("fullName", formData.name);
    data.append("age", formData.age);
    data.append("position", formData.position);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("officeLocation", formData.location);

    const fileInput = document.querySelector(".ss-file-input");
    data.append("image", fileInput.files[0]);

    await axios.post("http://localhost:8080/api/staff", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // ✅ refresh list
    const res = await axios.get(
      `http://localhost:8080/api/staff?clubId=${clubId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setStaffMembers(res.data);

    setToastMessage("Submitted successfully!");
    setFormData({ name: '', age: '', position: '', email: '', phone: '', location: '' });
    setPreviewImage(null);
    setErrors({});
    setShowAddForm(false);

    setTimeout(() => setToastMessage(''), 3000);

  } catch (err) {
    console.error(err);
    alert("Error saving staff");
  }
};
  return (
    <div className="ss-staff-profiles-page">
      {/* Toast Message */}
      {toastMessage && <div className="ss-toast">{toastMessage}</div>}

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
  <img
    src={`http://localhost:8080/${staff.profilePhotoPath}`}
    alt={staff.fullName}
    className="ss-staff-avatar"
  />
</div>

<div className="ss-staff-info">
  <div className="ss-name-age">
    <h3>{staff.fullName}</h3>
    <span className="ss-age">{staff.age} Yrs</span>
  </div>

  <span className="ss-role-badge">
    {staff.position}
  </span>

  <div className="ss-contact-info">
    <div className="ss-contact-row">
      <span className="ss-icon">✉️</span>
      <span>{staff.email}</span>
    </div>

    {staff.phone && (
      <div className="ss-contact-row">
        <span className="ss-icon">📞</span>
        <span>{staff.phone}</span>
      </div>
    )}

    {staff.officeLocation && (
      <div className="ss-contact-row">
        <span className="ss-icon">📍</span>
        <span>{staff.officeLocation}</span>
      </div>
    )}
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