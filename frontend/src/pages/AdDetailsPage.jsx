import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentAdvertisementById } from "../services/api";
import "./homePage.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
const API_ORIGIN   = API_BASE_URL.replace(/\/api\/?$/, "");

function resolveImageUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${API_ORIGIN}${url}`;
  return `${API_ORIGIN}/${url}`;
}

function formatDateLong(d) {
  if (!d) return "-";
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year:    "numeric",
    month:   "long",
    day:     "numeric",
  });
}

// ─── Simple Snowflake SVG ─────────────────────────────────────────────────────
const SnowflakeIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="2"    x2="12" y2="22" />
    <line x1="2"  y1="12"   x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdDetailsPage() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [ad, setAd]  = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await getStudentAdvertisementById(id);
        setAd(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "This advertisement is no longer available."
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  return (
    <div className="page-wrapper ad-details-page">

      {/* ── Sticky Header ── */}
      <header className="ad-details-header">
        <div className="ad-details-header__inner">
          <button
            className="ad-details-back-btn"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            ← Back
          </button>
          <a href="/" className="ad-details-logo">
            <span className="ad-details-logo-icon"><SnowflakeIcon /></span>
            <span>Campus<span className="accent">Hub</span></span>
          </a>
        </div>
      </header>

      <main className="ad-details-main">

        {/* ── Loading ── */}
        {loading && (
          <div className="ad-details-state">
            <div className="ad-details-spinner" />
            <p>Loading advertisement…</p>
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div className="ad-details-state ad-details-state--error">
            <span className="ad-details-state-icon">⚠️</span>
            <h2>Advertisement Not Available</h2>
            <p>{error}</p>
            <button className="btn btn--pink" onClick={() => navigate("/")}>
              Return to Home
            </button>
          </div>
        )}

        {/* ── Content ── */}
        {!loading && !error && ad && (
          <>
            {/* Hero */}
            <div className="ad-details-hero">
              <img
                src={resolveImageUrl(ad.imageUrl)}
                alt={ad.title}
                className="ad-details-hero__img"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/1280x500?text=Advertisement";
                }}
              />
              <div className="ad-details-hero__overlay" />
              <div className="ad-details-hero__content">
                <span className="section-tag">Advertisement</span>
                <h1 className="ad-details-hero__title">{ad.title}</h1>
              </div>
            </div>

            {/* Body Card */}
            <div className="ad-details-content">
              <div className="ad-details-content__inner">

                {/* Meta row */}
                <div className="ad-details-meta">
                  <span className="ad-details-meta__chip ad-details-meta__chip--green">
                    ✅ Active
                  </span>
                  <span className="ad-details-meta__chip">
                    📅 Available until: <strong>{formatDateLong(ad.expiryDate)}</strong>
                  </span>
                </div>

                {/* Title (visible on scroll, below hero) */}
                <h2 className="ad-details-card-title">{ad.title}</h2>

                <p className="ad-details-desc">{ad.description}</p>

                <div className="ad-details-divider" />

                {/* Actions */}
                <div className="ad-details-actions">
                  <button
                    className="btn btn--pink"
                    onClick={() => navigate(-1)}
                  >
                    ← Go Back
                  </button>
                  <a href="/" className="btn btn--outline">
                    🏠 Home
                  </a>
                </div>

              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

