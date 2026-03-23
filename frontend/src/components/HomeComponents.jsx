// frontend/src/components/HomeComponents.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  SnowflakeIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ArrowUpIcon,
  ChevronRight,
  SearchIcon,
  MenuIcon,
  CloseIcon
} from "./Icons";

// ─── Ad Ticker Bar ───────────────────────────────────────────────────────────
export const AdTickerBar = () => {
  const messages = [
    "🎉 Spring Fest 2025 — Campus Main Stage — April 18 & 19 | Register Now and Get Early Bird Discount!",
    "📢 Tech Club Workshop: AI & Machine Learning — Every Saturday 2PM @ Lab 204 | Free for Members",
    "🏆 Inter-College Hackathon 2025 — Registration Open Until March 30 | Prizes Worth $5,000!",
    "🎭 Drama Club Auditions — Open to All Students — April 5, Auditorium Hall A",
    "🌟 CampusHub Premium Membership — Unlock Exclusive Event Access, Early Tickets & Club Perks!"
  ];
  const fullText = messages.join("    ✦    ");
  return (
    <div className="ad-ticker-bar">
      <div className="ad-ticker-label"><span>LIVE</span></div>
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
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Home", "About Us", "Events", "Clubs", "Contact Us"];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <SnowflakeIcon /> Campus<span className="accent">Hub</span>
        </Link>

        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {links.map(item => {
            let path = item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s/g, "")}`;
            return (
              <li key={item}>
                <Link to={path} className={item === "Home" ? "active" : ""}>{item}</Link>
              </li>
            );
          })}
        </ul>

        <div className="navbar__actions">
          <button className="navbar__search" aria-label="Search">
            <SearchIcon />
          </button>
          <a href="#" className="btn btn--pink navbar__cta">REGISTER NOW</a>
          <a href="#" className="btn btn--blue navbar__cta">LOGIN</a>
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
export const Footer = () => {
  const [email, setEmail] = useState("");
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Brand & Socials */}
        <div className="footer__brand">
          <div className="footer__logo">
            <SnowflakeIcon /> Campus<span className="accent-pink">Hub</span>
          </div>
          <p className="footer__tagline">
            Your one-stop platform for campus events, clubs, and student community engagement.
          </p>
          <div className="footer__socials">
            {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon].map((Icon, i) => (
              <a key={i} href="#" className="footer__social-btn" aria-label="social"><Icon /></a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul className="footer__links">
            {["About Us","Events","Clubs","Schedule","Ticket Pricing","Contact Us"].map(l => (
              <li key={l}><a href="#"><ChevronRight /> {l}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer__col">
          <h4 className="footer__col-title">Get In Touch</h4>
          <div className="footer__contact-list">
            <div className="footer__contact-item">
              <MapPinIcon /> Block A, Campus Main Building,<br/>University Road, City 10001
            </div>
            <div className="footer__contact-item">
              <PhoneIcon /> <strong>+1 955 444 1245</strong> <p>For Information</p>
            </div>
            <div className="footer__contact-item">
              <MailIcon /> <strong>info@campushub.edu</strong> <p>Email Address</p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer__col">
          <h4 className="footer__col-title">Subscribe To Our Newsletter</h4>
          <p>New subscribers get 10% off your next event ticket</p>
          <div className="footer__newsletter-form">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button className="btn btn--pink">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer__bottom">
        <p>Copyright ©2025 CampusHub. All Rights Reserved</p>
      </div>

      {/* Scroll Top */}
      <a href="#" className="scroll-top-btn" onClick={e => { e.preventDefault(); window.scrollTo({top:0, behavior:"smooth"}); }}>
        <ArrowUpIcon />
      </a>
    </footer>
  );
};