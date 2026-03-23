import React, { useState } from "react";
import "./allClubs.css";
import { Navbar, Footer, AdTickerBar } from "../../components/HomeComponents";

import SportsImg from "../../assets/home3.jpg";
import TechClubImg from "../../assets/home2.jpg";
import MusicClubImg from "../../assets/home4.jpg";

const clubsData = [
  {
    id: 1,
    name: "Sports Club",
    images: [SportsImg],
    purpose: "Promote sports and fitness activities across campus.",
    participants: 120,
    authorities: "Mr. John Doe (President), Ms. Jane Smith (Secretary)",
    contact: "sportsclub@uni.edu"
  },
  {
    id: 2,
    name: "Tech Club",
    images: [TechClubImg],
    purpose: "Encourage students to develop software, apps, and tech projects.",
    participants: 80,
    authorities: "Mr. Alan Turing (President), Ms. Ada Lovelace (Secretary)",
    contact: "techclub@uni.edu"
  },
  {
    id: 3,
    name: "Music Club",
    images: [MusicClubImg],
    purpose: "Support musical talents and organize concerts/events.",
    participants: 60,
    authorities: "Mr. Ludwig Beethoven (President), Ms. Clara Schumann (Secretary)",
    contact: "musicclub@uni.edu"
  }
];

export default function AllClubs() {
  const [activeClubId, setActiveClubId] = useState(null);

  const handleCardClick = (id) => {
    setActiveClubId(prev => (prev === id ? null : id));
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <AdTickerBar />

      <main className="clubs-page">
        <h1 className="clubs-title">All <span>CLUBS</span></h1>

        <div className="clubs-grid">
          {clubsData.map(club => {
            const isActive = activeClubId === club.id;
            const firstImage = club.images[0];

            return (
              <div
                key={club.id}
                className={`club-card ${isActive ? "active" : ""}`}
              >
                <div
                  className="club-card-header"
                  onClick={() => handleCardClick(club.id)}
                >
                  <img src={firstImage} alt={club.name} className="club-card-img" />
                  <h3>{club.name}</h3>
                </div>

                {isActive && (
                  <div className="club-details">
                    <p><strong>Purpose:</strong> {club.purpose}</p>
                    <p><strong>Participants:</strong> {club.participants}</p>
                    <p><strong>Authorities:</strong> {club.authorities}</p>
                    <p><strong>Contact:</strong> {club.contact}</p>
                    <button className="btn-join">Join Club</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}