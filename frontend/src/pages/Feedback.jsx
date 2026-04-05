import React, { useEffect, useMemo, useState } from "react";
import { GhostButton, PageHeader, PrimaryButton, StatTile, Surface } from "../components/AdminUi";

const API_BASE = "http://localhost:9091/api/feedback";

const initialForm = {
  name: "",
  email: "",
  message: "",
  rating: 5,
  reply: "",
};

const getFeedbackId = (feedback) => feedback.id ?? feedback.Id;

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= Number(rating) ? "text-amber-500" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const RatingBars = ({ distribution }) => {
  const max = Math.max(...Object.values(distribution || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }), 1);

  return (
    <Surface>
      <h3 className="mb-3 text-lg font-bold text-slate-900">Rating Distribution</h3>
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = Number(distribution?.[rating] ?? 0);
          const width = `${(count / max) * 100}%`;

          return (
            <div key={rating} className="grid grid-cols-[30px_1fr_40px] items-center gap-3">
              <span className="text-sm font-medium text-slate-600">{rating}★</span>
              <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-blue-500" style={{ width }} />
              </div>
              <span className="text-sm text-slate-500 text-right">{count}</span>
            </div>
          );
        })}
      </div>
    </Surface>
  );
};

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalFeedbacks: 0,
    repliedCount: 0,
    pendingCount: 0,
    averageRating: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });

  const [form, setForm] = useState(initialForm);
  const [replyDraft, setReplyDraft] = useState({});
  const [isEditingId, setIsEditingId] = useState(null);

  const [filters, setFilters] = useState({
    keyword: "",
    minRating: "",
    maxRating: "",
    onlyReplied: false,
  });

  const [loading, setLoading] = useState(false);

  const searchParams = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.keyword.trim()) params.set("keyword", filters.keyword.trim());
    if (filters.minRating) params.set("minRating", filters.minRating);
    if (filters.maxRating) params.set("maxRating", filters.maxRating);
    if (filters.onlyReplied) params.set("onlyReplied", "true");
    return params.toString();
  }, [filters]);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const endpoint = searchParams ? `${API_BASE}/search?${searchParams}` : API_BASE;
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to load feedbacks");
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load feedback list.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${API_BASE}/analytics`);
      if (!response.ok) throw new Error("Failed to load analytics");
      const data = await response.json();
      setAnalytics({
        ...data,
        ratingDistribution: {
          1: Number(data.ratingDistribution?.[1] ?? 0),
          2: Number(data.ratingDistribution?.[2] ?? 0),
          3: Number(data.ratingDistribution?.[3] ?? 0),
          4: Number(data.ratingDistribution?.[4] ?? 0),
          5: Number(data.ratingDistribution?.[5] ?? 0),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const refreshAll = async () => {
    await Promise.all([fetchFeedbacks(), fetchAnalytics()]);
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setIsEditingId(null);
  };

  const handleSaveFeedback = async (event) => {
    event.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
      message: form.message,
      rating: Number(form.rating),
      reply: form.reply || null,
    };

    const isEditing = Boolean(isEditingId);
    const endpoint = isEditing ? `${API_BASE}/${isEditingId}` : API_BASE;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to save feedback");

      resetForm();
      await refreshAll();
    } catch (error) {
      console.error(error);
      alert("Unable to save feedback.");
    }
  };

  const handleEdit = (feedback) => {
    setIsEditingId(getFeedbackId(feedback));
    setForm({
      name: feedback.name || "",
      email: feedback.email || "",
      message: feedback.message || "",
      rating: Number(feedback.rating || 1),
      reply: feedback.reply || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this feedback?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed");
      await refreshAll();
    } catch (error) {
      console.error(error);
      alert("Unable to delete feedback.");
    }
  };

  const handleReply = async (id) => {
    const reply = (replyDraft[id] || "").trim();
    if (!reply) {
      alert("Reply cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/${id}/reply`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      });

      if (!response.ok) throw new Error("Reply failed");

      setReplyDraft((prev) => ({ ...prev, [id]: "" }));
      await refreshAll();
    } catch (error) {
      console.error(error);
      alert("Unable to send reply.");
    }
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Feedback"
        subtitle="View, filter, and respond to user feedback while monitoring sentiment trends."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Total Feedback" value={analytics.totalFeedbacks} tone="teal" />
        <StatTile label="Replied" value={analytics.repliedCount} tone="emerald" />
        <StatTile label="Pending" value={analytics.pendingCount} tone="orange" />
        <StatTile label="Average Rating" value={Number(analytics.averageRating || 0).toFixed(2)} />
      </div>

      <RatingBars distribution={analytics.ratingDistribution} />

      <Surface>
        <form onSubmit={handleSaveFeedback} className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            {isEditingId ? "Edit Feedback" : "Add Feedback Manually"}
          </h2>

          <div className="grid gap-3 md:grid-cols-2">
            <input
              required
              name="name"
              value={form.name}
              onChange={handleFormChange}
              placeholder="Name"
              className="rounded-xl border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleFormChange}
              placeholder="Email"
              className="rounded-xl border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            />
            <input
              required
              type="number"
              min="1"
              max="5"
              name="rating"
              value={form.rating}
              onChange={handleFormChange}
              placeholder="Rating (1-5)"
              className="rounded-xl border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            />
            <input
              name="reply"
              value={form.reply}
              onChange={handleFormChange}
              placeholder="Optional initial reply"
              className="rounded-xl border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          <textarea
            required
            name="message"
            value={form.message}
            onChange={handleFormChange}
            rows={3}
            placeholder="Feedback message"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
          />

          <div className="flex gap-2">
            <PrimaryButton type="submit">
              {isEditingId ? "Update Feedback" : "Add Feedback"}
            </PrimaryButton>
            {isEditingId && (
              <GhostButton type="button" onClick={resetForm}>
                Cancel Edit
              </GhostButton>
            )}
          </div>
        </form>
      </Surface>

      <Surface className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Filter / Search</h2>
        <div className="grid gap-3 md:grid-cols-4">
            <input
              placeholder="Search by name, email, message, reply"
              value={filters.keyword}
              onChange={(event) => setFilters((prev) => ({ ...prev, keyword: event.target.value }))}
              className="rounded-xl border border-slate-300 px-3 py-2 md:col-span-2 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            />
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Min rating"
              value={filters.minRating}
              onChange={(event) => setFilters((prev) => ({ ...prev, minRating: event.target.value }))}
              className="rounded-xl border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            />
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Max rating"
              value={filters.maxRating}
              onChange={(event) => setFilters((prev) => ({ ...prev, maxRating: event.target.value }))}
              className="rounded-xl border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            />
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={filters.onlyReplied}
              onChange={(event) => setFilters((prev) => ({ ...prev, onlyReplied: event.target.checked }))}
            />
            Show only replied feedback
        </label>

        <div className="flex gap-2">
            <PrimaryButton onClick={fetchFeedbacks} className="bg-indigo-600 hover:bg-indigo-700">
              Apply Filters
            </PrimaryButton>
            <GhostButton
              onClick={() => {
                setFilters({ keyword: "", minRating: "", maxRating: "", onlyReplied: false });
                setTimeout(fetchFeedbacks, 0);
              }}
            >
              Reset
            </GhostButton>
        </div>
      </Surface>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full">
            <thead className="bg-slate-100/90 text-slate-700">
              <tr>
                <th className="text-left px-4 py-3">ID</th>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Message</th>
                <th className="text-left px-4 py-3">Rating</th>
                <th className="text-left px-4 py-3">Reply</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td className="px-4 py-3" colSpan={7}>Loading feedbacks...</td>
                </tr>
              )}

              {!loading && feedbacks.length === 0 && (
                <tr>
                  <td className="px-4 py-3 text-slate-500" colSpan={7}>No feedback found.</td>
                </tr>
              )}

              {!loading &&
                feedbacks.map((feedback) => {
                  const id = getFeedbackId(feedback);

                  return (
                    <tr key={id} className="border-t align-top">
                      <td className="px-4 py-3 font-semibold text-slate-700">{id}</td>
                      <td className="px-4 py-3 text-slate-900">{feedback.name}</td>
                      <td className="px-4 py-3 text-slate-600">{feedback.email}</td>
                      <td className="max-w-sm px-4 py-3 text-slate-700">{feedback.message}</td>
                      <td className="px-4 py-3"><StarRating rating={feedback.rating} /></td>
                      <td className="px-4 py-3 min-w-72 space-y-2">
                        <p className="wrap-break-word text-sm text-slate-700">{feedback.reply || "No reply yet"}</p>
                        <textarea
                          value={replyDraft[id] ?? ""}
                          onChange={(event) =>
                            setReplyDraft((prev) => ({ ...prev, [id]: event.target.value }))
                          }
                          rows={2}
                          placeholder="Type admin reply"
                          className="w-full rounded-lg border border-slate-300 px-2 py-1 text-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                        />
                        <button
                          onClick={() => handleReply(id)}
                          className="rounded-md bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-700"
                        >
                          Send Reply
                        </button>
                      </td>
                      <td className="px-4 py-3 space-y-2">
                        <button
                          onClick={() => handleEdit(feedback)}
                          className="block rounded-md bg-amber-500 px-3 py-1 text-sm text-white hover:bg-amber-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(id)}
                          className="block rounded-md bg-rose-600 px-3 py-1 text-sm text-white hover:bg-rose-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default Feedback;
