import { useEffect, useMemo, useState } from "react";
import {
  createAdvertisement,
  deleteAdvertisement,
  getAllAdvertisements,
  updateAdvertisement,
  uploadAdvertisementImage
} from "../services/api";

const initialFormState = {
  title: "",
  description: "",
  imageUrl: "",
  expiryDate: ""
};

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const MIN_TITLE_LENGTH = 3;
const MIN_DESCRIPTION_LENGTH = 10;
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif"
];

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

function resolveImageUrl(imageUrl) {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("blob:")) return imageUrl;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  if (imageUrl.startsWith("/")) {
    return `${API_ORIGIN}${imageUrl}`;
  }
  return `${API_ORIGIN}/${imageUrl}`;
}

function formatDate(dateValue) {
  if (!dateValue) return "-";
  return new Date(dateValue).toLocaleDateString();
}

export default function ManagerDashboard() {
  const [advertisements, setAdvertisements] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isEditing = useMemo(() => editingId !== null, [editingId]);

  async function loadAdvertisements() {
    setLoading(true);
    setError("");

    try {
      const response = await getAllAdvertisements();
      setAdvertisements(response.data || []);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Failed to load advertisements.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAdvertisements();
  }, []);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(resolveImageUrl(formData.imageUrl || ""));
      return;
    }

    const localUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(localUrl);

    return () => URL.revokeObjectURL(localUrl);
  }, [formData.imageUrl, imageFile]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));

    setFieldErrors((previous) => {
      const next = { ...previous };

      if (name === "title") {
        if (!value.trim()) {
          next.title = "Title is required.";
        } else if (value.trim().length < MIN_TITLE_LENGTH) {
          next.title = `Title must be at least ${MIN_TITLE_LENGTH} characters.`;
        } else if (value.length > 150) {
          next.title = "Title cannot exceed 150 characters.";
        } else {
          delete next.title;
        }
      }

      if (name === "description") {
        if (!value.trim()) {
          next.description = "Description is required.";
        } else if (value.trim().length < MIN_DESCRIPTION_LENGTH) {
          next.description = `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters.`;
        } else if (value.length > 1000) {
          next.description = "Description cannot exceed 1000 characters.";
        } else {
          delete next.description;
        }
      }

      if (name === "expiryDate") {
        const today = new Date().toISOString().slice(0, 10);
        if (!value) {
          next.expiryDate = "Expiry date is required.";
        } else if (value < today) {
          next.expiryDate = "Expiry date cannot be in the past.";
        } else {
          delete next.expiryDate;
        }
      }

      return next;
    });
  }

  function resetForm() {
    setFormData(initialFormState);
    setEditingId(null);
    setImageFile(null);
    setPreviewUrl("");
    setFieldErrors({});
  }

  function handleEdit(advertisement) {
    setEditingId(advertisement.id);
    setFormData({
      title: advertisement.title || "",
      description: advertisement.description || "",
      imageUrl: advertisement.imageUrl || "",
      expiryDate: advertisement.expiryDate || ""
    });
    setImageFile(null);
    setFieldErrors({});
    setSuccessMessage("");
    setError("");
  }

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0] || null;
    setImageFile(selectedFile);

    setFieldErrors((previous) => {
      const next = { ...previous };

      if (!selectedFile) {
        if (!isEditing || !formData.imageUrl) {
          next.imageFile = "Please choose an image file.";
        } else {
          delete next.imageFile;
        }
        return next;
      }

      if (!ALLOWED_MIME_TYPES.includes(selectedFile.type)) {
        next.imageFile = "Only jpg, jpeg, png, webp, and gif files are allowed.";
        return next;
      }

      if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
        next.imageFile = "Image file must be 5MB or less.";
        return next;
      }

      delete next.imageFile;
      return next;
    });
  }

  function validateForm() {
    const nextErrors = {};

    if (!formData.title.trim()) {
      nextErrors.title = "Title is required.";
    } else if (formData.title.trim().length < MIN_TITLE_LENGTH) {
      nextErrors.title = `Title must be at least ${MIN_TITLE_LENGTH} characters.`;
    } else if (formData.title.length > 150) {
      nextErrors.title = "Title cannot exceed 150 characters.";
    }

    if (!formData.description.trim()) {
      nextErrors.description = "Description is required.";
    } else if (formData.description.trim().length < MIN_DESCRIPTION_LENGTH) {
      nextErrors.description = `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters.`;
    } else if (formData.description.length > 1000) {
      nextErrors.description = "Description cannot exceed 1000 characters.";
    }

    const today = new Date().toISOString().slice(0, 10);
    if (!formData.expiryDate) {
      nextErrors.expiryDate = "Expiry date is required.";
    } else if (formData.expiryDate < today) {
      nextErrors.expiryDate = "Expiry date cannot be in the past.";
    }

    if (imageFile) {
      if (!ALLOWED_MIME_TYPES.includes(imageFile.type)) {
        nextErrors.imageFile = "Only jpg, jpeg, png, webp, and gif files are allowed.";
      } else if (imageFile.size > MAX_FILE_SIZE_BYTES) {
        nextErrors.imageFile = "Image file must be 5MB or less.";
      }
    } else if (!isEditing || !formData.imageUrl) {
      nextErrors.imageFile = "Please choose an image file.";
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function resolveImageUrlForSave() {
    if (imageFile) {
      const uploadResponse = await uploadAdvertisementImage(imageFile);
      return uploadResponse.data?.imageUrl || "";
    }

    if (isEditing && formData.imageUrl) {
      return formData.imageUrl;
    }

    throw new Error("Please choose an image file to upload.");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      const imageUrl = await resolveImageUrlForSave();
      const payload = {
        ...formData,
        imageUrl,
        status: "ACTIVE"
      };

      if (isEditing) {
        await updateAdvertisement(editingId, payload);
        setSuccessMessage("Advertisement updated successfully.");
      } else {
        await createAdvertisement(payload);
        setSuccessMessage("Advertisement created successfully.");
      }

      resetForm();
      await loadAdvertisements();
    } catch (apiError) {
      const fallbackMessage = "Failed to save advertisement.";
      setError(apiError.response?.data?.message || apiError.message || fallbackMessage);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setError("");
    setSuccessMessage("");

    const confirmed = window.confirm("Delete this advertisement?");
    if (!confirmed) return;

    try {
      await deleteAdvertisement(id);
      setSuccessMessage("Advertisement deleted.");
      await loadAdvertisements();
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Failed to delete advertisement.");
    }
  }

  return (
    <section className="page-content">
      <h1>Manager Dashboard</h1>
      <p className="hint">Create, edit, and remove advertisements.</p>

      <form className="ad-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            minLength={MIN_TITLE_LENGTH}
            maxLength={150}
            placeholder="Club recruitment drive"
            className={fieldErrors.title ? "input-error" : ""}
          />
          {fieldErrors.title && <small className="field-error">{fieldErrors.title}</small>}
        </div>

        <div className="form-row">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            minLength={MIN_DESCRIPTION_LENGTH}
            maxLength={1000}
            rows={4}
            placeholder="Share event details and key highlights"
            className={fieldErrors.description ? "input-error" : ""}
          />
          {fieldErrors.description && (
            <small className="field-error">{fieldErrors.description}</small>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="imageFile">Upload Image</label>
          <input
            id="imageFile"
            name="imageFile"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
            onChange={handleImageFileChange}
            required={!isEditing || !formData.imageUrl}
            className={fieldErrors.imageFile ? "input-error" : ""}
          />
          <small className="hint">
            Allowed formats: jpg, jpeg, png, webp, gif (max 5MB).
            {isEditing ? " Leave empty to keep the current image." : ""}
          </small>
          {fieldErrors.imageFile && <small className="field-error">{fieldErrors.imageFile}</small>}
        </div>

        {previewUrl && (
          <div className="preview-card">
            <p className="hint">Image preview</p>
            <img src={previewUrl} alt="Advertisement preview" className="preview-image" />
          </div>
        )}

        <div className="form-row">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            id="expiryDate"
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className={fieldErrors.expiryDate ? "input-error" : ""}
          />
          {fieldErrors.expiryDate && (
            <small className="field-error">{fieldErrors.expiryDate}</small>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-btn" disabled={saving}>
            {saving
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
              ? "Update Advertisement"
              : "Create Advertisement"}
          </button>
          {isEditing && (
            <button type="button" className="secondary-btn" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {error && <p className="error-text">{error}</p>}
      {successMessage && <p className="success-text">{successMessage}</p>}

      <div className="table-wrapper">
        <table className="ad-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5}>Loading advertisements...</td>
              </tr>
            ) : advertisements.length === 0 ? (
              <tr>
                <td colSpan={5}>No advertisements available.</td>
              </tr>
            ) : (
              advertisements.map((ad) => (
                <tr key={ad.id}>
                  <td>{ad.title}</td>
                  <td>{ad.description}</td>
                  <td>{formatDate(ad.expiryDate)}</td>
                  <td>{ad.status}</td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => handleEdit(ad)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="danger-btn"
                      onClick={() => handleDelete(ad.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
