import React, { useState, useEffect } from "react";
import axios from "axios";
import "./allClubs.css";
import { Navbar, Footer, AdTickerBar } from "../../components/HomeComponents";

export default function AllClubs() {
  const [clubs, setClubs] = useState([]);
  const [activeClubId, setActiveClubId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch ACCEPTED clubs from backend
    axios
      .get("http://localhost:8080/api/clubs/accepted") // Public endpoint
      .then((res) => {
        setClubs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching clubs:", err);
        setError(
          err.response?.data?.error || "Error fetching clubs. Please try again."
        );
        setLoading(false);
      });
  }, []);

  const handleCardClick = (id) => {
    setActiveClubId(prev => (prev === id ? null : id));
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <AdTickerBar />

      <main className="clubs-page">
        <h1 className="clubs-title">All <span>CLUBS</span></h1>

        {loading ? (
          <p>Loading clubs...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : clubs.length === 0 ? (
          <p>No clubs available at the moment.</p>
        ) : (
          <div className="clubs-grid">
            {clubs.map((club) => {
              const isActive = activeClubId === club.id;
              const firstImage = club.imagePath
                ? `http://localhost:8080/${club.imagePath.replace(/\\/g, "/")}`
                : "https://via.placeholder.com/300";

              return (
                <div
                  key={club.id}
                  className={`club-card ${isActive ? "active" : ""}`}
                >
                  <div
                    className="club-card-header"
                    onClick={() => handleCardClick(club.id)}
                  >
                    <img
                      src={firstImage}
                      alt={club.name}
                      className="club-card-img"
                    />
                    <h3>{club.name}</h3>
                  </div>

                  {isActive && (
                    <div className="club-details">
                      <p><strong>Purpose:</strong> {club.description}</p>
<p><strong>Participants:</strong> {club.memberCount || 0}</p>
                      <p><strong>Authorities:</strong> {club.president}</p>
                      <p><strong>Contact:</strong> {club.contact}</p>
                      <button className="btn-join">Join Club</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}