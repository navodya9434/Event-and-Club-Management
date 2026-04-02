import { useEffect, useState } from "react";
import { getAllAdvertisements } from "../../services/api";

const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api")
  .replace(/\/api\/?$/, "");

function resolveImg(url) {
  if (!url) return "";
  if (url.startsWith("blob:") || url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}

function fmtDate(d) {
  if (!d) return "-";
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StatusBadge({ status }) {
  const cls =
    { ACTIVE: "active", EXPIRED: "expired", INAPPROPRIATE: "inappropriate" }[status] ||
    "expired";
  return <span className={`mgr-badge mgr-badge--${cls}`}>{status}</span>;
}

export default function AllAdsDetailsPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await getAllAdvertisements();
        setAds(res.data || []);
      } catch {
        setError("Failed to load advertisements.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const total        = ads.length;
  const activeCount  = ads.filter((a) => a.status === "ACTIVE").length;
  const expiredCount = ads.filter((a) => a.status === "EXPIRED").length;
  const flaggedCount = ads.filter((a) => a.status === "INAPPROPRIATE").length;

  return (
    <div>
      {/* Page Header */}
      <div className="mgr-page-header">
        <h1 className="mgr-page-title">All Advertisement Details</h1>
        <p className="mgr-page-subtitle">
          Complete overview of every advertisement currently in the system.
        </p>
      </div>

      {/* Stats Row */}
      <div className="mgr-stats-row">
        <div className="mgr-stat-card">
          <span className="mgr-stat-label">Total</span>
          <span className="mgr-stat-value">{total}</span>
          <span className="mgr-stat-sub">All advertisements</span>
        </div>
        <div className="mgr-stat-card mgr-stat-card--green">
          <span className="mgr-stat-label">Active</span>
          <span className="mgr-stat-value">{activeCount}</span>
          <span className="mgr-stat-sub">Visible to students</span>
        </div>
        <div className="mgr-stat-card mgr-stat-card--red">
          <span className="mgr-stat-label">Expired</span>
          <span className="mgr-stat-value">{expiredCount}</span>
          <span className="mgr-stat-sub">Past expiry date</span>
        </div>
        <div className="mgr-stat-card mgr-stat-card--amber">
          <span className="mgr-stat-label">Flagged</span>
          <span className="mgr-stat-value">{flaggedCount}</span>
          <span className="mgr-stat-sub">Inappropriate content</span>
        </div>
      </div>

      {/* Content */}
      {loading && <div className="mgr-loading">⏳ Loading advertisements...</div>}
      {error   && <div className="mgr-alert mgr-alert--error">{error}</div>}

      {!loading && !error && ads.length === 0 && (
        <div className="mgr-empty">
          <div className="mgr-empty-icon">📭</div>
          <div className="mgr-empty-text">No advertisements found.</div>
        </div>
      )}

      {!loading && !error && ads.length > 0 && (
        <div className="mgr-cards-grid">
          {ads.map((ad) => (
            <article key={ad.id} className="mgr-ad-card">
              <img
                src={resolveImg(ad.imageUrl)}
                alt={ad.title}
                className="mgr-ad-card-img"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/640x360?text=Advertisement";
                }}
              />
              <div className="mgr-ad-card-body">
                <h3 className="mgr-ad-card-title">{ad.title}</h3>
                <p className="mgr-ad-card-desc">{ad.description}</p>
                <div className="mgr-ad-card-meta">
                  <span>Expires: {fmtDate(ad.expiryDate)}</span>
                  <StatusBadge status={ad.status} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

