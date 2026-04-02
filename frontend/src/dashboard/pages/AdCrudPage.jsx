import { useEffect, useMemo, useState } from "react";
import {
  createAdvertisement,
  deleteAdvertisement,
  getAllAdvertisements,
  updateAdvertisement,
  uploadAdvertisementImage,
} from "../../services/api";

const EMPTY_FORM = { title: "", description: "", expiryDate: "" };
const MAX_FILE  = 5 * 1024 * 1024;
const ALLOWED   = ["image/jpeg","image/jpg","image/png","image/webp","image/gif"];
const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api")
  .replace(/\/api\/?$/, "");

function resolveImg(url) {
  if (!url) return "";
  if (url.startsWith("blob:") || url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}

function fmtDate(d) {
  if (!d) return "-";
  return new Date(d + "T00:00:00").toLocaleDateString();
}

function StatusBadge({ status }) {
  const cls = { ACTIVE: "active", EXPIRED: "expired", INAPPROPRIATE: "inappropriate" }[status] || "expired";
  return <span className={`mgr-badge mgr-badge--${cls}`}>{status}</span>;
}

export default function AdCrudPage() {
  const [ads, setAds]               = useState([]);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [editId, setEditId]         = useState(null);
  const [imageFile, setImageFile]   = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [fieldErr, setFieldErr]     = useState({});
  const [loading, setLoading]       = useState(false);
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState("");

  const isEditing = useMemo(() => editId !== null, [editId]);

  async function loadAds() {
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

  useEffect(() => { loadAds(); }, []);

  useEffect(() => {
    if (!imageFile) { setPreviewUrl(resolveImg(form.imageUrl || "")); return; }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [form.imageUrl, imageFile]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    setFieldErr(p => {
      const n = { ...p };
      if (name === "title") {
        if (!value.trim()) n.title = "Title is required.";
        else if (value.trim().length < 3) n.title = "Title needs at least 3 characters.";
        else if (value.length > 150) n.title = "Title cannot exceed 150 characters.";
        else delete n.title;
      }
      if (name === "description") {
        if (!value.trim()) n.description = "Description is required.";
        else if (value.trim().length < 10) n.description = "Description needs at least 10 characters.";
        else if (value.length > 1000) n.description = "Description cannot exceed 1000 characters.";
        else delete n.description;
      }
      if (name === "expiryDate") {
        const today = new Date().toISOString().slice(0, 10);
        if (!value) n.expiryDate = "Expiry date is required.";
        else if (value < today) n.expiryDate = "Expiry date cannot be in the past.";
        else delete n.expiryDate;
      }
      return n;
    });
  }

  function handleFile(e) {
    const f = e.target.files?.[0] || null;
    setImageFile(f);
    setFieldErr(p => {
      const n = { ...p };
      if (!f) { if (!isEditing || !form.imageUrl) n.imageFile = "Please choose an image."; else delete n.imageFile; return n; }
      if (!ALLOWED.includes(f.type)) { n.imageFile = "Allowed: jpg, png, webp, gif (max 5 MB)."; return n; }
      if (f.size > MAX_FILE)         { n.imageFile = "File must be 5 MB or less."; return n; }
      delete n.imageFile; return n;
    });
  }

  function validate() {
    const err = {};
    if (!form.title.trim())                              err.title = "Title is required.";
    else if (form.title.trim().length < 3)               err.title = "Title needs at least 3 characters.";
    else if (form.title.length > 150)                    err.title = "Title cannot exceed 150 characters.";

    if (!form.description.trim())                        err.description = "Description is required.";
    else if (form.description.trim().length < 10)        err.description = "Description needs at least 10 characters.";
    else if (form.description.length > 1000)             err.description = "Description cannot exceed 1000 characters.";

    const today = new Date().toISOString().slice(0, 10);
    if (!form.expiryDate)                                err.expiryDate = "Expiry date is required.";
    else if (form.expiryDate < today)                    err.expiryDate = "Expiry date cannot be in the past.";

    if (imageFile) {
      if (!ALLOWED.includes(imageFile.type)) err.imageFile = "Allowed: jpg, png, webp, gif (max 5 MB).";
      else if (imageFile.size > MAX_FILE)    err.imageFile = "File must be 5 MB or less.";
    } else if (!isEditing || !form.imageUrl) {
      err.imageFile = "Please choose an image.";
    }
    setFieldErr(err);
    return Object.keys(err).length === 0;
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setImageFile(null);
    setPreviewUrl("");
    setFieldErr({});
  }

  function handleEdit(ad) {
    setEditId(ad.id);
    setForm({ title: ad.title || "", description: ad.description || "", imageUrl: ad.imageUrl || "", expiryDate: ad.expiryDate || "" });
    setImageFile(null);
    setFieldErr({});
    setSuccess("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!validate()) return;
    setSaving(true);
    try {
      let imageUrl = form.imageUrl || "";
      if (imageFile) {
        const up = await uploadAdvertisementImage(imageFile);
        imageUrl = up.data?.imageUrl || "";
      } else if (!isEditing || !form.imageUrl) {
        throw new Error("Please choose an image.");
      }
      const payload = { ...form, imageUrl, status: form.status || "ACTIVE" };
      if (isEditing) {
        await updateAdvertisement(editId, payload);
        setSuccess("Advertisement updated successfully.");
      } else {
        await createAdvertisement(payload);
        setSuccess("Advertisement created successfully.");
      }
      resetForm();
      await loadAds();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this advertisement?")) return;
    setError(""); setSuccess("");
    try {
      await deleteAdvertisement(id);
      setSuccess("Advertisement deleted.");
      await loadAds();
    } catch {
      setError("Failed to delete advertisement.");
    }
  }

  return (
    <div>
      <div className="mgr-page-header">
        <h1 className="mgr-page-title">Manage Advertisements</h1>
        <p className="mgr-page-subtitle">Create, edit and remove club advertisements.</p>
      </div>

      {/* ── Form Panel ── */}
      <div className="mgr-panel">
        <h2 className="mgr-panel-title">
          {isEditing ? "✏️ Edit Advertisement" : "➕ New Advertisement"}
        </h2>

        {error   && <div className="mgr-alert mgr-alert--error">{error}</div>}
        {success && <div className="mgr-alert mgr-alert--success">{success}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mgr-form-grid">
            {/* Title */}
            <div className="mgr-field">
              <label htmlFor="crud-title">Title *</label>
              <input
                id="crud-title" name="title" value={form.title}
                onChange={handleChange} maxLength={150}
                placeholder="e.g. Club Recruitment Drive"
                className={fieldErr.title ? "mgr-input-err" : ""}
              />
              {fieldErr.title && <span className="mgr-field-err">{fieldErr.title}</span>}
            </div>

            {/* Expiry Date */}
            <div className="mgr-field">
              <label htmlFor="crud-expiry">Expiry Date *</label>
              <input
                id="crud-expiry" name="expiryDate" type="date"
                value={form.expiryDate} onChange={handleChange}
                min={new Date().toISOString().slice(0, 10)}
                className={fieldErr.expiryDate ? "mgr-input-err" : ""}
              />
              {fieldErr.expiryDate && <span className="mgr-field-err">{fieldErr.expiryDate}</span>}
            </div>

            {/* Description */}
            <div className="mgr-field mgr-form-grid--full">
              <label htmlFor="crud-desc">Description *</label>
              <textarea
                id="crud-desc" name="description" value={form.description}
                onChange={handleChange} rows={4} maxLength={1000}
                placeholder="Describe the event or announcement in detail..."
                className={fieldErr.description ? "mgr-input-err" : ""}
              />
              {fieldErr.description && <span className="mgr-field-err">{fieldErr.description}</span>}
            </div>

            {/* Image Upload */}
            <div className="mgr-field mgr-form-grid--full">
              <label htmlFor="crud-img">Upload Image *</label>
              <input
                id="crud-img" type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                onChange={handleFile}
                className={fieldErr.imageFile ? "mgr-input-err" : ""}
              />
              <span className="mgr-field-hint">
                Allowed: jpg, jpeg, png, webp, gif — max 5 MB.
                {isEditing ? " Leave empty to keep the current image." : ""}
              </span>
              {fieldErr.imageFile && <span className="mgr-field-err">{fieldErr.imageFile}</span>}
              {previewUrl && (
                <div className="mgr-preview-box">
                  <img src={previewUrl} alt="Preview" className="mgr-preview-img" />
                </div>
              )}
            </div>

            {/* Status (edit only) */}
            {isEditing && (
              <div className="mgr-field">
                <label htmlFor="crud-status">Status</label>
                <select id="crud-status" name="status" value={form.status || "ACTIVE"} onChange={handleChange}>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="EXPIRED">EXPIRED</option>
                  <option value="INAPPROPRIATE">INAPPROPRIATE</option>
                </select>
              </div>
            )}
          </div>

          <div className="mgr-form-actions">
            <button type="submit" className="mgr-btn mgr-btn--primary" disabled={saving}>
              {saving ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Advertisement" : "Create Advertisement")}
            </button>
            {isEditing && (
              <button type="button" className="mgr-btn mgr-btn--secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ── Table Panel ── */}
      <div className="mgr-panel">
        <h2 className="mgr-panel-title">📋 All Advertisements ({ads.length})</h2>
        {loading ? (
          <div className="mgr-loading">Loading advertisements...</div>
        ) : ads.length === 0 ? (
          <div className="mgr-empty">
            <div className="mgr-empty-icon">📭</div>
            <div className="mgr-empty-text">No advertisements yet. Create one above!</div>
          </div>
        ) : (
          <div className="mgr-table-wrap">
            <table className="mgr-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Expiry</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ads.map(ad => (
                  <tr key={ad.id}>
                    <td>
                      {ad.imageUrl && (
                        <img src={resolveImg(ad.imageUrl)} alt={ad.title} className="mgr-td-img" />
                      )}
                    </td>
                    <td style={{ fontWeight: 600, color: "#1e293b", maxWidth: 180 }}>{ad.title}</td>
                    <td style={{ maxWidth: 240, color: "#64748b", fontSize: "0.82rem" }}>
                      {ad.description?.length > 80 ? ad.description.slice(0, 80) + "..." : ad.description}
                    </td>
                    <td>{fmtDate(ad.expiryDate)}</td>
                    <td><StatusBadge status={ad.status} /></td>
                    <td>
                      <div className="mgr-td-actions">
                        <button className="mgr-btn mgr-btn--secondary mgr-btn--sm" onClick={() => handleEdit(ad)}>
                          Edit
                        </button>
                        <button className="mgr-btn mgr-btn--danger mgr-btn--sm" onClick={() => handleDelete(ad.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

