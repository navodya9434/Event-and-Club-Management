import { useEffect, useState } from "react";
import { getManagerActiveAdvertisements } from "../../services/api";

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

function daysUntilExpiry(expiryDate) {
  if (!expiryDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate + "T00:00:00");
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
}

export default function ActiveAdsPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await getManagerActiveAdvertisements();
        setAds(res.data || []);
      } catch {
        setError("Failed to load active advertisements.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="mgr-page-header">
        <h1 className="mgr-page-title">✅ Active Advertisements</h1>
        <p className="mgr-page-subtitle">
          Advertisements currently visible to students — valid status and within expiry date.
        </p>
      </div>

      {/* Count badge */}
      {!loading && !error && (
        <div className="mgr-stats-row">
          <div className="mgr-stat-card mgr-stat-card--green">
            <span className="mgr-stat-label">Active Now</span>
            <span className="mgr-stat-value">{ads.length}</span>
            <span className="mgr-stat-sub">Shown to students</span>
          </div>
        </div>
      )}

      {loading && <div className="mgr-loading">⏳ Loading active advertisements...</div>}
      {error   && <div className="mgr-alert mgr-alert--error">{error}</div>}

      {!loading && !error && ads.length === 0 && (
        <div className="mgr-empty">
          <div className="mgr-empty-icon">🟢</div>
          <div className="mgr-empty-text">No active advertisements at this time.</div>
        </div>
      )}

      {!loading && !error && ads.length > 0 && (
        <div className="mgr-cards-grid">
          {ads.map((ad) => {
            const days = daysUntilExpiry(ad.expiryDate);
            const urgentClass = days !== null && days <= 7 ? " mgr-ad-card--urgent" : "";
            return (
              <article key={ad.id} className={`mgr-ad-card${urgentClass}`}>
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
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <h3 className="mgr-ad-card-title" style={{ margin: 0 }}>{ad.title}</h3>
                    {days !== null && days <= 7 && (
                      <span className="mgr-badge mgr-badge--expired" style={{ fontSize: "0.68rem", whiteSpace: "nowrap", marginLeft: "0.5rem" }}>
                        ⚠️ {days}d left
                      </span>
                    )}
                  </div>
                  <p className="mgr-ad-card-desc">{ad.description}</p>
                  <div className="mgr-ad-card-meta">
                    <span>Expires: {fmtDate(ad.expiryDate)}</span>
                    <span className="mgr-badge mgr-badge--active">ACTIVE</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}


