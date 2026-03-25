import React, { useState } from "react";
import "./createClub.css";

export default function CreateClub() {
  const [club, setClub] = useState({
    name: "",
    category: "",
    description: "",
    president: "",
    presidentId: "",
    email: "",
    contact: "",
    permissionLetter: null,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!club.name.trim()) newErrors.name = "Club name is required";
    else if (!nameRegex.test(club.name))
      newErrors.name = "Letters only";

    if (!club.category) newErrors.category = "Category is required";

    if (!club.description || club.description.trim().length < 500)
      newErrors.description = "Description must be at least 500 characters";

    const presNameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
    if (!club.president.trim()) newErrors.president = "President name is required";
    else if (!presNameRegex.test(club.president))
      newErrors.president = "Enter full name (first & last)";

    const presIdRegex1 = /^[0-9]{11}[vV]$/;
    const presIdRegex2 = /^[0-9]{12}$/;
    if (!club.presidentId.trim()) newErrors.presidentId = "President ID is required";
    else if (!presIdRegex1.test(club.presidentId) && !presIdRegex2.test(club.presidentId))
      newErrors.presidentId = "Must be 11 digits + v/V or 12 digits only";
    else if (/^(\d)\1{11}$/.test(club.presidentId))
      newErrors.presidentId = "Cannot repeat same number 12 times";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!club.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(club.email)) newErrors.email = "Invalid email format";

    const contactRegex = /^[0-9]{10}$/;
    if (!club.contact) newErrors.contact = "Contact number is required";
    else if (!contactRegex.test(club.contact)) newErrors.contact = "Must be 10 digits";
    else if (/^(\d)\1{9}$/.test(club.contact))
      newErrors.contact = "Cannot repeat same number 10 times";

    if (!club.permissionLetter) newErrors.permissionLetter = "Permission letter required";
    else if (club.permissionLetter.type !== "application/pdf")
      newErrors.permissionLetter = "Only PDF files allowed";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setClub({ ...club, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleNumberInput = (e) => {
    const value = e.target.value;
    if (e.target.name === "presidentId") {
      const newValue = value.replace(/[^0-9vV]/gi, "").slice(0, 12);
      e.target.value = newValue;
      setClub({ ...club, [e.target.name]: newValue });
    } else if (e.target.name === "contact") {
      const newValue = value.replace(/[^0-9]/g, "").slice(0, 10);
      e.target.value = newValue;
      setClub({ ...club, [e.target.name]: newValue });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setClub({ ...club, permissionLetter: file });
    setErrors({ ...errors, permissionLetter: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Club Created:", club);
      alert("Club profile created successfully!");
      setClub({
        name: "",
        category: "",
        description: "",
        president: "",
        presidentId: "",
        email: "",
        contact: "",
        permissionLetter: null,
      });
      setErrors({});
      document.getElementById("permissionLetter").value = "";
    }
  };

  return (
    <div className="cc-page">
      <div className="cc-background">
        <div className="cc-container">
          <h2 className="cc-title">Create Club Profile</h2>
          <p className="cc-subtitle">Register a new academic club and expand your community.</p>

          <form onSubmit={handleSubmit} className="cc-form-card">

            <div className="cc-form-group">
              <label>Club Name</label>
              <input
                name="name"
                value={club.name}
                onChange={handleChange}
                placeholder="Letters only, no numbers/special chars"
              />
              {errors.name && <span className="cc-error">{errors.name}</span>}
            </div>

            <div className="cc-form-group">
              <label>Category</label>
              <select name="category" value={club.category} onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="Tech">Tech</option>
                <option value="Sports">Sports</option>
                <option value="Arts">Arts</option>
                <option value="Science">Science</option>
                <option value="Others">Others</option>
              </select>
              {errors.category && <span className="cc-error">{errors.category}</span>}
            </div>

            <div className="cc-form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={club.description}
                onChange={handleChange}
                placeholder="At least 500 characters"
              />
              {errors.description && <span className="cc-error">{errors.description}</span>}
            </div>

            <div className="cc-form-group">
              <label>President Name</label>
              <input
                name="president"
                value={club.president}
                onChange={handleChange}
                placeholder="First and Last Name"
              />
              {errors.president && <span className="cc-error">{errors.president}</span>}
            </div>

            <div className="cc-form-group">
              <label>President ID</label>
              <input
                name="presidentId"
                value={club.presidentId}
                onChange={handleChange}
                onInput={handleNumberInput}
                placeholder="11 digits + v/V or 12 digits"
              />
              {errors.presidentId && <span className="cc-error">{errors.presidentId}</span>}
            </div>

            <div className="cc-form-group">
              <label>Email</label>
              <input
                name="email"
                value={club.email}
                onChange={handleChange}
                placeholder="example@domain.com"
              />
              {errors.email && <span className="cc-error">{errors.email}</span>}
            </div>

            <div className="cc-form-group">
              <label>Contact Number</label>
              <input
                name="contact"
                value={club.contact}
                onChange={handleChange}
                onInput={handleNumberInput}
                placeholder="10 digits only"
              />
              {errors.contact && <span className="cc-error">{errors.contact}</span>}
            </div>

            <div className="cc-form-group">
              <label>Permission Letter (PDF)</label>
              <input
                type="file"
                id="permissionLetter"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              {club.permissionLetter && <span className="cc-file-name">{club.permissionLetter.name}</span>}
              {errors.permissionLetter && <span className="cc-error">{errors.permissionLetter}</span>}
            </div>

            <button className="cc-btn">Create Club</button>
          </form>
        </div>
      </div>
    </div>
  );
}