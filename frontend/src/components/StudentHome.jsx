import { useEffect, useState } from "react";
import { getActiveAdvertisements } from "../services/api";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

function resolveImageUrl(imageUrl) {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  if (imageUrl.startsWith("/")) {
    return `${API_ORIGIN}${imageUrl}`;
  }
  return `${API_ORIGIN}/${imageUrl}`;
}

export default function StudentHome() {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadActiveAdvertisements() {
      setLoading(true);
      setError("");

      try {
        const response = await getActiveAdvertisements();
        setAdvertisements(response.data || []);
      } catch (apiError) {
        setError(apiError.response?.data?.message || "Failed to load advertisements.");
      } finally {
        setLoading(false);
      }
    }

    loadActiveAdvertisements();
  }, []);

  return (
    <section className="page-content">
      <h1>Student Home</h1>
      <p className="hint">Discover active opportunities from clubs and events.</p>

      {loading && <p>Loading active advertisements...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && advertisements.length === 0 && (
        <p>No active advertisements available right now.</p>
      )}

      <div className="card-grid">
        {advertisements.map((ad) => (
          <article key={ad.id} className="ad-card">
            <img
              src={resolveImageUrl(ad.imageUrl)}
              alt={ad.title}
              className="ad-image"
              onError={(event) => {
                event.currentTarget.src =
                  "https://via.placeholder.com/640x360?text=Advertisement";
              }}
            />
            <div className="ad-card-body">
              <h3>{ad.title}</h3>
              <p>{ad.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


