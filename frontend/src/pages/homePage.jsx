import React, { useState, useEffect } from "react";
import "./homePage.css";
import home2 from "../assets/home2.jpg";
import home3 from "../assets/home3.jpg";
import home4 from "../assets/home4.jpg";




// ─── Icon Components (inline SVG) ────────────────────────────────────────────
const SnowflakeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /><line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.93 3.26 2 2 0 0 1 3.93 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const ArrowUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const UsersIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const GearIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const FlagIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);
const StarIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Ticker Ad Bar ────────────────────────────────────────────────────────────
const AdTickerBar = () => {
  const messages = [
    "🎉 Spring Fest 2025 — Campus Main Stage — April 18 & 19 | Register Now and Get Early Bird Discount!",
    "📢 Tech Club Workshop: AI & Machine Learning — Every Saturday 2PM @ Lab 204 | Free for Members",
    "🏆 Inter-College Hackathon 2025 — Registration Open Until March 30 | Prizes Worth $5,000!",
    "🎭 Drama Club Auditions — Open to All Students — April 5, Auditorium Hall A",
    "🌟 CampusHub Premium Membership — Unlock Exclusive Event Access, Early Tickets & Club Perks!",
  ];
  const fullText = messages.join("    ✦    ");
  return (
    <div className="ad-ticker-bar">
      <div className="ad-ticker-label">
        <span>LIVE</span>
      </div>
      <div className="ad-ticker-track">
        <div className="ad-ticker-content">
          <span>{fullText}</span>
          <span aria-hidden="true">&nbsp;&nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;&nbsp;{fullText}</span>
        </div>
      </div>
    </div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <a href="#" className="navbar__logo">
          <span className="navbar__logo-icon"><SnowflakeIcon /></span>
          <span className="navbar__logo-text">Campus<span className="accent">Hub</span></span>
        </a>
        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {["Home","About Us","Events","Clubs","Contact Us"].map(item => (
            <li key={item}><a href="#" className={item === "Home" ? "active" : ""}>{item}</a></li>
          ))}
        </ul>
        <div className="navbar__actions">
          <button className="navbar__search" aria-label="Search"><SearchIcon /></button>
  
  {/* Register Now Button */}
  <a href="#" className="btn btn--pink navbar__cta">REGISTER NOW &rsaquo;</a>
  
  {/* Login Button */}
  <a href="#" className="btn btn--blue navbar__cta">LOGIN &rsaquo;</a>
  
  <button
    className="navbar__hamburger"
    onClick={() => setMenuOpen(o => !o)}
    aria-label="Menu"
  >
    {menuOpen ? <CloseIcon /> : <MenuIcon />}
  </button>
          
        </div>
      </div>
    </nav>
  );
};

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection = () => (
  <section className="hero">
    <div className="hero__overlay" />
    <div className="hero__bg-circle hero__bg-circle--1" />
    <div className="hero__bg-circle hero__bg-circle--2" />
    <div className="hero__content">
      <p className="hero__eyebrow">Big Event 2025</p>
      <h1 className="hero__title">
        Discover, Connect, Thrive<br />
        <span className="hero__title-outline">SLIIT</span>
      </h1>
      <p className="hero__subtitle-large">EVENT &amp; CLUBS</p>
      <p className="hero__desc">
        Discover, join, and manage campus events and clubs all in one platform.
        Connect with your community and make every semester memorable.
      </p>
      <div className="hero__btns">
        <a href="#" className="btn btn--pink">BUY TICKET &rsaquo;</a>
        <a href="#" className="btn btn--outline">Explore Events &rsaquo;</a>
      </div>
    </div>
    <div className="hero__image-area">
      <div className="hero__img-ring" />
      <div className="hero__img-placeholder">
        <div className="hero__img-glow" />
        <div className="hero__img-person" />
      </div>
    </div>
  </section>
);

// ─── About Section ────────────────────────────────────────────────────────────
const AboutSection = () => (
  <section className="about">
    <div className="about__left">
      <p className="section-tag">Conference Organisation</p>
      <h2 className="about__ghost-title">About</h2>
      <h2 className="about__main-title">
        Campus Events,<br />Seminars &amp; <span className="accent-pink">CLUBS</span>
      </h2>
      <p className="about__desc">
        Our platform brings every campus event and student club under one roof. From tech fests and cultural nights
        to departmental seminars and sports meets — discover, register, and participate seamlessly.
        Whether you're an organiser or an attendee, CampusHub has everything you need.
      </p>
      <a href="#" className="btn btn--pink-outline">Discover Now &rsaquo;</a>
    </div>
    <div className="about__right">
  <div className="about__img-grid">
    {/* Tall Purple Box → Replace with Seminar Image */}
    <div className="about__img about__img--tall">
      <img 
        src={home2} 
        alt="Campus Seminar or Conference"
        className="about__img-inner"
      />
    </div>

    {/* Right Column */}
    <div className="about__img-col">
      {/* Blue Box → Replace with Meeting Image */}
      <div className="about__img about__img--short">
        <img 
          src={home3}  
          alt="Student Meeting or Workshop"
          className="about__img-inner"
        />
      </div>

      {/* Pink Box → Replace with Celebration Image */}
      <div className="about__img about__img--short">
        <img 
          src={home4}  
          alt="Campus Celebration or Cultural Event"
          className="about__img-inner"
        />
      </div>
    </div>

    {/* Decorative Accent Boxes (keep them - they look nice) */}
    <div className="about__accent-box about__accent-box--tl" />
    <div className="about__accent-box about__accent-box--br" />
  </div>
</div>
  </section>
);

// ─── Services / Cards Section ─────────────────────────────────────────────────
const services = [
  { icon: <UsersIcon />, title: "Event Conferences", desc: "Organise and attend academic conferences, guest lectures, and inter-college summits." },
  { icon: <GearIcon />, title: "Club Management", desc: "Create, manage and grow student clubs with tools for members, events, and announcements." },
  { icon: <FlagIcon />, title: "Cultural Leadership", desc: "Lead cultural committees, manage fests, and celebrate campus diversity." },
  { icon: <StarIcon />, title: "Workshops & Seminars", desc: "Discover skill-building workshops, industry seminars, and certification programs." },
];

const ServicesSection = () => (
  <section className="services">
    <div className="services__cards">
      {services.map((s, i) => (
        <div key={i} className={`service-card ${i === 1 ? "service-card--elevated" : ""}`}>
          <div className="service-card__icon">{s.icon}</div>
          <h3 className="service-card__title">{s.title}</h3>
          <p className="service-card__desc">{s.desc}</p>
          <a href="#" className="service-card__link">Learn More <ChevronRight /></a>
        </div>
      ))}
    </div>
    <div className="services__why">
      <div className="services__world-map" />
      <p className="section-tag section-tag--dark">Student Life</p>
      <h2 className="services__why-title">
        Why You Should<br />Join The <span className="accent-pink">EVENTS?</span>
      </h2>
      <p className="services__why-desc">
        Campus events shape your college experience beyond academics. Build real connections,
        develop leadership skills, discover hidden talents, and create memories that last a lifetime.
        Every event is an opportunity waiting to be seized.
      </p>
      <a href="#" className="btn btn--pink">Join Event &rsaquo;</a>
    </div>
  </section>
);

// ─── Stats Section ────────────────────────────────────────────────────────────
const stats = [
  { value: "200+", label: "Events Hosted" },
  { value: "50+", label: "Active Clubs" },
  { value: "5000+", label: "Students Registered" },
  { value: "100+", label: "Speakers Invited" },
];
const StatsSection = () => (
  <section className="stats">
    <div className="stats__bg" />
    {stats.map((s, i) => (
      <div key={i} className="stats__item">
        <span className="stats__value">{s.value}</span>
        <span className="stats__label">{s.label}</span>
      </div>
    ))}
  </section>
);

// ─── Upcoming Events Section ──────────────────────────────────────────────────
const events = [
  { date: "APR 18", month: "2025", title: "Spring Fest 2025", category: "Cultural", location: "Main Auditorium", tag: "Featured" },
  { date: "APR 25", month: "2025", title: "TechXpo Hackathon", category: "Technology", location: "Computer Science Block", tag: "Hot" },
  { date: "MAY 2", month: "2025", title: "Leadership Summit", category: "Seminar", location: "Conference Hall B", tag: "New" },
  { date: "MAY 10", month: "2025", title: "Sports Carnival", category: "Sports", location: "Campus Ground", tag: "" },
];
const EventsSection = () => (
  <section className="events-section">
    <div className="events-section__header">
      <p className="section-tag">Upcoming</p>
      <h2 className="section-title">Don't Miss <span className="accent-pink">EVENTS</span></h2>
      <p className="section-sub">Stay ahead with all upcoming campus events. Register early, save your spot.</p>
    </div>
    <div className="events-grid">
      {events.map((e, i) => (
        <div key={i} className="event-card">
          {e.tag && <span className="event-card__tag">{e.tag}</span>}
          <div className="event-card__date-badge">
            <span className="event-card__date">{e.date}</span>
            <span className="event-card__year">{e.month}</span>
          </div>
          <div className="event-card__body">
            <span className="event-card__category">{e.category}</span>
            <h3 className="event-card__title">{e.title}</h3>
            <p className="event-card__location">📍 {e.location}</p>
            <a href="#" className="btn btn--pink-sm">Register &rsaquo;</a>
          </div>
        </div>
      ))}
    </div>
    <div className="events-section__footer">
      <a href="#" className="btn btn--outline-dark">View All Events &rsaquo;</a>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const [email, setEmail] = useState("");
  return (
    <footer className="footer">
      <div className="footer__overlay" />
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-icon"><SnowflakeIcon /></span>
            <span>Campus<span className="accent-pink">Hub</span></span>
          </div>
          <p className="footer__tagline">
            Your one-stop platform for campus events, clubs, and student community engagement.
            Stay connected, stay involved.
          </p>
          <div className="footer__socials">
            {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon].map((Icon, i) => (
              <a key={i} href="#" className="footer__social-btn" aria-label="social"><Icon /></a>
            ))}
          </div>
        </div>
        <div className="footer__col">
          <h4 className="footer__col-title">Quick Link</h4>
          <ul className="footer__links">
            {["About Us","Events","Clubs","Schedule","Ticket Pricing","Contact Us"].map(l => (
              <li key={l}><a href="#"><ChevronRight /> {l}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer__col">
          <h4 className="footer__col-title">Get In Touch</h4>
          <div className="footer__contact-list">
            <div className="footer__contact-item">
              <span className="footer__contact-icon"><MapPinIcon /></span>
              <span>Block A, Campus Main Building,<br />University Road, City 10001</span>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon"><PhoneIcon /></span>
              <div>
                <strong>+1 955 444 1245</strong>
                <p>For Information</p>
              </div>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon"><MailIcon /></span>
              <div>
                <strong>info@campushub.edu</strong>
                <p>Email Address</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__col">
          <h4 className="footer__col-title">Subscribe To Our Newsletter</h4>
          <p className="footer__newsletter-sub">New subscribers get 10% off your next event ticket</p>
          <div className="footer__newsletter-form">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="footer__newsletter-input"
            />
            <button className="btn btn--pink footer__newsletter-btn">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>Copyright ©2025 CampusHub. All Rights Reserved</p>
      </div>
      <a href="#" className="scroll-top-btn" onClick={e => { e.preventDefault(); window.scrollTo({top:0,behavior:"smooth"}); }}>
        <ArrowUpIcon />
      </a>
    </footer>
  );
};

// ─── Main HomePage ────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-content">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <StatsSection />
        <EventsSection />
        <Footer />
      </main>
      <AdTickerBar />
    </div>
  );
}