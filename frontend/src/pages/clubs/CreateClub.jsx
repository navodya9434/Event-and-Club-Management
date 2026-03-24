import React, { useState } from "react";
import "./createClub.css";

export default function CreateClub() {
  const [club, setClub] = useState({
    name: "",
    category: "",
    description: "",
    president: "",
    email: "",
    contact: "",
    members: "",
  });

  const handleChange = (e) => {
    setClub({ ...club, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Club Created:", club);
    alert("Club profile created!");
  };

  return (
    <div className="form-page">
      <h2>Create Club Profile</h2>

      <form onSubmit={handleSubmit} className="form-card">
        <input name="name" placeholder="Club Name" onChange={handleChange} required />
        <input name="category" placeholder="Category (Tech, Sports...)" onChange={handleChange} required />
        <textarea name="description" placeholder="Club Description" onChange={handleChange} required />
        <input name="president" placeholder="President Name" onChange={handleChange} required />
        <input name="email" placeholder="Club Email" onChange={handleChange} required />
        <input name="contact" placeholder="Contact Number" onChange={handleChange} required />
        <input name="members" placeholder="No. of Members" onChange={handleChange} required />

        <button className="btn btn--pink">Create Club</button>
      </form>
    </div>
  );
}