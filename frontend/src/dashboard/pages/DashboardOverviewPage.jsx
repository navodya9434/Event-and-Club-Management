import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

export default function DashboardOverviewPage() {
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
        setError("Failed to load advertisement data.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ── Computed stats ─────────────────────────────────────────────────────────
  const total        = ads.length;
  const activeCount  = ads.filter((a) => a.status === "ACTIVE").length;
  const expiredCount = ads.filter((a) => a.status === "EXPIRED").length;
  const flaggedCount = ads.filter((a) => a.status === "INAPPROPRIATE").length;

  // Ads expiring within the next 7 days (still active)
  const todayMs = new Date().setHours(0, 0, 0, 0);
  const soonExpiring = ads.filter((a) => {
    if (a.status !== "ACTIVE" || !a.expiryDate) return false;
    const expiryMs = new Date(a.expiryDate + "T00:00:00").getTime();
    const daysLeft  = Math.ceil((expiryMs - todayMs) / 86_400_000);
    return daysLeft >= 0 && daysLeft <= 7;
  });

  // 5 most recently created
  const recentAds = [...ads]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Page header */}
      <div className="mgr-page-header">
        <h1 className="mgr-page-title">📊 Dashboard Overview</h1>
        <p className="mgr-page-subtitle">
          Welcome back, Manager. Here's a real-time snapshot of the advertisement system.
        </p>
      </div>

      {/* ── Stats row ── */}
      <div className="mgr-stats-row">
        <div className="mgr-stat-card mgr-stat-card--blue">
          <span className="mgr-stat-label">Total</span>
          <span className="mgr-stat-value">{loading ? "…" : total}</span>
          <span className="mgr-stat-sub">All advertisements</span>
        </div>
        <div className="mgr-stat-card mgr-stat-card--green">
          <span className="mgr-stat-label">Active</span>
          <span className="mgr-stat-value">{loading ? "…" : activeCount}</span>
          <span className="mgr-stat-sub">Visible to students</span>
        </div>
        <div className="mgr-stat-card mgr-stat-card--red">
          <span className="mgr-stat-label">Expired</span>
          <span className="mgr-stat-value">{loading ? "…" : expiredCount}</span>
          <span className="mgr-stat-sub">Past expiry date</span>
        </div>
        <div className="mgr-stat-card mgr-stat-card--amber">
          <span className="mgr-stat-label">Flagged</span>
          <span className="mgr-stat-value">{loading ? "…" : flaggedCount}</span>
          <span className="mgr-stat-sub">Inappropriate content</span>
        </div>
      </div>

      {/* ── Expiry alert ── */}
      {!loading && soonExpiring.length > 0 && (
        <div className="mgr-alert mgr-alert--error" style={{ marginBottom: "1.5rem" }}>
          ⚠️&nbsp;
          <strong>
            {soonExpiring.length} advertisement{soonExpiring.length > 1 ? "s" : ""} expiring
            within 7 days:
          </strong>{" "}
          {soonExpiring.map((a) => a.title).join(", ")}. Consider updating or removing them.
        </div>
      )}

      {error && <div className="mgr-alert mgr-alert--error">{error}</div>}

      {/* ── Quick actions ── */}
      <div className="mgr-panel">
        <h2 className="mgr-panel-title">⚡ Quick Actions</h2>
        <div className="mgr-quick-actions">
          <Link to="/manager/crud" className="mgr-quick-action-card mgr-quick-action-card--blue">
            <span className="mgr-quick-action-icon">➕</span>
            <span className="mgr-quick-action-label">Create Advertisement</span>
            <span className="mgr-quick-action-sub">Add a new club or event ad</span>
          </Link>
          <Link to="/manager/details" className="mgr-quick-action-card mgr-quick-action-card--indigo">
            <span className="mgr-quick-action-icon">📋</span>
            <span className="mgr-quick-action-label">All Ad Details</span>
            <span className="mgr-quick-action-sub">Browse every advertisement</span>
          </Link>
          <Link to="/manager/active" className="mgr-quick-action-card mgr-quick-action-card--green">
            <span className="mgr-quick-action-icon">✅</span>
            <span className="mgr-quick-action-label">Active Ads</span>
            <span className="mgr-quick-action-sub">{activeCount} currently visible</span>
          </Link>
          <Link to="/manager/expired" className="mgr-quick-action-card mgr-quick-action-card--red">
            <span className="mgr-quick-action-icon">⏰</span>
            <span className="mgr-quick-action-label">Expired &amp; Flagged</span>
            <span className="mgr-quick-action-sub">{expiredCount + flaggedCount} hidden from students</span>
          </Link>
        </div>
      </div>

      {/* ── Recent advertisements ── */}
      <div className="mgr-panel">
        <h2 className="mgr-panel-title">🕐 Recent Advertisements</h2>

        {loading ? (
          <div className="mgr-loading">⏳ Loading...</div>
        ) : recentAds.length === 0 ? (
          <div className="mgr-empty">
            <div className="mgr-empty-icon">📭</div>
            <div className="mgr-empty-text">No advertisements yet. Create one to get started!</div>
          </div>
        ) : (
          <>
            <div className="mgr-table-wrap">
              <table className="mgr-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Expiry Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAds.map((ad) => (
                    <tr key={ad.id}>
                      <td>
                        {ad.imageUrl ? (
                          <img
                            src={resolveImg(ad.imageUrl)}
                            alt={ad.title}
                            className="mgr-td-img"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="mgr-td-img-placeholder">📷</div>
                        )}
                      </td>
                      <td style={{ fontWeight: 600, color: "#1e293b", maxWidth: 180 }}>
                        {ad.title}
                      </td>
                      <td style={{ color: "#64748b", fontSize: "0.82rem", maxWidth: 240 }}>
                        {ad.description?.length > 70
                          ? ad.description.slice(0, 70) + "…"
                          : ad.description}
                      </td>
                      <td>{fmtDate(ad.expiryDate)}</td>
                      <td>
                        <StatusBadge status={ad.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <Link to="/manager/details" className="mgr-btn mgr-btn--secondary mgr-btn--sm">
                View All Advertisements →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

