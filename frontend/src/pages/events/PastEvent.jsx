import React from "react";
import "./PastEvent.css";
import { useLocation } from "react-router-dom";

import img1 from "../../assets/home2.jpg";
import img2 from "../../assets/home3.jpg";
import img3 from "../../assets/home4.jpg";

const EventProfile = () => {
  const { state } = useLocation();

  return (
    <div className="event-profile">
      {/* Header */}
      <div className="header">
        <div>
          <h1>{state?.title || "Global Tech Summit 2024"}</h1>
          <p className="meta">
            Oct 12–14, 2024 • Convention Center, San Francisco
          </p>
        </div>

        <div className="header-actions">
          <button className="btn light">Export Report</button>
          <button className="btn primary">Share Media</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="stat-card">
          <p>Total Revenue</p>
          <h2>$842,500</h2>
          <span className="positive">+12% vs LY</span>
        </div>

        <div className="stat-card">
          <p>Total Attendees</p>
          <h2>3,240</h2>
          <span>Sold Out</span>
        </div>

        <div className="stat-card">
          <p>Satisfaction Score</p>
          <h2>4.92 / 5</h2>
          <span>★★★★★</span>
        </div>
      </div>

      {/* Main Content FULL WIDTH */}
      <div className="full">
        {/* Performance */}
        <div className="card">
          <h3>Performance Summary</h3>
          <p>
            The Global Tech Summit 2024 surpassed all key performance
            indicators, achieving record-high engagement across sessions.
            Revenue goals were exceeded and attendee satisfaction remained
            extremely high.
          </p>

          <div className="mini-stats">
            <div>
              <p>Growth Index</p>
              <h4>Excellent</h4>
            </div>
            <div>
              <p>Post-Event NPS</p>
              <h4>88.4</h4>
            </div>
          </div>
        </div>

        {/* Upload */}
        <div className="upload-box">
          <p className="upload-title">Upload Media</p>
          <p>Drag and drop files here or browse</p>
        </div>
      </div>

      {/* Gallery */}
      <div className="gallery">
        <h2>Event Gallery</h2>

        <div className="gallery-grid">
  <img src={img1} alt="Gallery 1" />
  <img src={img2} alt="Gallery 2" />
  <img src={img3} alt="Gallery 3" />
  <div className="add-more">+ Add More</div>
</div>
      </div>
    </div>
  );
};

export default EventProfile;