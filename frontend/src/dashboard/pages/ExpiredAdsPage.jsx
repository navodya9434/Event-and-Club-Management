import { useEffect, useState } from "react";
import { getExpiredAdvertisements } from "../../services/api";

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

export default function ExpiredAdsPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await getExpiredAdvertisements();
        setAds(res.data || []);
      } catch {
        setError("Failed to load expired advertisements.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const expiredCount      = ads.filter((a) => a.status === "EXPIRED").length;
  const inappropriateCount = ads.filter((a) => a.status === "INAPPROPRIATE").length;

  return (
    <div>
      {/* Page Header */}
      <div className="mgr-page-header">
        <h1 className="mgr-page-title">⏰ Expired Advertisements</h1>
        <p className="mgr-page-subtitle">
          Advertisements that are expired or flagged as inappropriate. Hidden from students.
        </p>
      </div>

      {/* Stats */}
      {!loading && !error && (
        <div className="mgr-stats-row">
          <div className="mgr-stat-card mgr-stat-card--red">
            <span className="mgr-stat-label">Expired</span>
            <span className="mgr-stat-value">{expiredCount}</span>
            <span className="mgr-stat-sub">Past expiry date</span>
          </div>
          <div className="mgr-stat-card mgr-stat-card--amber">
            <span className="mgr-stat-label">Flagged</span>
            <span className="mgr-stat-value">{inappropriateCount}</span>
            <span className="mgr-stat-sub">Marked inappropriate</span>
          </div>
          <div className="mgr-stat-card">
            <span className="mgr-stat-label">Total Hidden</span>
            <span className="mgr-stat-value">{ads.length}</span>
            <span className="mgr-stat-sub">Not visible to students</span>
          </div>
        </div>
      )}

      {loading && <div className="mgr-loading">⏳ Loading expired advertisements...</div>}
      {error   && <div className="mgr-alert mgr-alert--error">{error}</div>}

      {!loading && !error && ads.length === 0 && (
        <div className="mgr-empty">
          <div className="mgr-empty-icon">🎉</div>
          <div className="mgr-empty-text">No expired or flagged advertisements. All clean!</div>
        </div>
      )}

      {!loading && !error && ads.length > 0 && (
        <div className="mgr-cards-grid">
          {ads.map((ad) => (
            <article key={ad.id} className="mgr-ad-card" style={{ opacity: 0.85 }}>
              <div style={{ position: "relative" }}>
                <img
                  src={resolveImg(ad.imageUrl)}
                  alt={ad.title}
                  className="mgr-ad-card-img"
                  style={{ filter: "grayscale(30%)" }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/640x360?text=Advertisement";
                  }}
                />
                <div style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                }}>
                  <StatusBadge status={ad.status} />
                </div>
              </div>
              <div className="mgr-ad-card-body">
                <h3 className="mgr-ad-card-title">{ad.title}</h3>
                <p className="mgr-ad-card-desc">{ad.description}</p>
                <div className="mgr-ad-card-meta">
                  <span>
                    {ad.status === "EXPIRED" ? "Expired: " : "Expiry: "}
                    {fmtDate(ad.expiryDate)}
                  </span>
                  {ad.createdAt && (
                    <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                      Created: {fmtDate(ad.createdAt.split("T")[0])}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

