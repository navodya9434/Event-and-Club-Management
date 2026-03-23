import React, { useState } from "react";
import "./allEvents.css";
import { Navbar, Footer, AdTickerBar } from "../../components/HomeComponents";

import HomeImg from "../../assets/home3.jpg";
import TechXpoImg from "../../assets/home2.jpg";
import LeadershipImg from "../../assets/home4.jpg";

const upcomingEvents = [
  {
    id: 1,
    title: "Spring Fest 2025",
    date: "April 18, 2025",
    time: "6:00 PM",
    venue: "Main Auditorium",
    artists: "DJ Alex, Live Band",
    dress: "Casual / Festive",
    desc: "A vibrant cultural festival with music, dance, and food.",
    img: HomeImg
  },
  {
    id: 2,
    title: "TechXpo Hackathon",
    date: "April 25, 2025",
    time: "9:00 AM",
    venue: "CS Building",
    artists: "Industry Mentors",
    dress: "Smart Casual",
    desc: "24-hour coding challenge with exciting prizes.",
    img: TechXpoImg
  },
  {
    id: 3,
    title: "Leadership Summit",
    date: "May 2, 2025",
    time: "10:00 AM",
    venue: "Hall B",
    artists: "Guest Speakers",
    dress: "Formal",
    desc: "Enhance leadership and communication skills.",
    img: LeadershipImg
  }
];

const pastEvents = [
  {
    id: 4,
    title: "Winter Gala",
    date: "Jan 10, 2025",
    images: [HomeImg, TechXpoImg]
  },
  {
    id: 5,
    title: "Coding Bootcamp",
    date: "Feb 15, 2025",
    images: [LeadershipImg, TechXpoImg]
  }
];

export default function EventsPage() {
  const [activeEventId, setActiveEventId] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0 });

  const handleCardClick = (id) => {
    setActiveEventId(prev => (prev === id ? null : id));
  };

  const openLightbox = (images, idx) => {
    setLightbox({ open: true, images, index: idx });
  };

  const closeLightbox = () => setLightbox({ open: false, images: [], index: 0 });

  const prevImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length
    }));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length
    }));
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <AdTickerBar />

      <main className="events-page">
        <h1 className="events-title">All <span>EVENTS</span></h1>

        {/* Upcoming Events */}
        <h2 className="section-heading">Upcoming Events</h2>
        <div className="events-grid">
          {upcomingEvents.map(event => {
            const isActive = activeEventId === event.id;
            return (
              <div key={event.id} className={`event-card ${isActive ? "active" : ""}`}>
                <div className="event-card-header" onClick={() => handleCardClick(event.id)}>
                  <img src={event.img} alt={event.title} className="event-card-img" />
                  <h3>{event.title}</h3>
                  <p>{event.date} • {event.time}</p>
                </div>
                <div className="event-details">
                  <p><strong>Venue:</strong> {event.venue}</p>
                  <p><strong>Artists:</strong> {event.artists}</p>
                  <p><strong>Dress Code:</strong> {event.dress}</p>
                  <p>{event.desc}</p>
                  <button className="btn-book">Book Ticket</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Past Events */}
        <h2 className="section-heading">Recent Past Events</h2>
        <div className="events-grid past">
          {pastEvents.map(event => {
            const isActive = activeEventId === event.id;
            const firstImage = event.images[0];
            return (
              <div
                key={event.id}
                className={`event-card past-card ${isActive ? "active" : ""}`}
                onClick={() => handleCardClick(event.id)}
              >
                <img src={firstImage} alt={event.title} className="event-card-img" />
                <h3>{event.title}</h3>
                <p>{event.date}</p>

                {isActive && (
                  <div className="event-details">
                    <p><strong>Gallery:</strong></p>
                    <div className="gallery">
                      {event.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${event.title} ${idx + 1}`}
                          className="gallery-img"
                          onClick={e => {
                            e.stopPropagation();
                            openLightbox(event.images, idx);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {lightbox.open && (
          <div className="lightbox" onClick={closeLightbox}>
            <span className="arrow left" onClick={prevImage}>&#10094;</span>
            <img src={lightbox.images[lightbox.index]} alt="Preview" className="lightbox-img" />
            <span className="arrow right" onClick={nextImage}>&#10095;</span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}