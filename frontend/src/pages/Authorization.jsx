import React, { useState } from "react";
import { Badge, GhostButton, PageHeader, PrimaryButton, StatTile, Surface } from "../components/AdminUi";

const Authorization = () => {
  const [activeTab, setActiveTab] = useState("ticket");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const [items, setItems] = useState({
    ticket: [
      { id: 1, name: "Ticket 1", email: "user1@gmail.com" },
      { id: 2, name: "Ticket 2", email: "user2@gmail.com" },
      { id: 3, name: "Ticket 3", email: "user3@gmail.com" },
    ],
    club: [
      { id: 7, name: "Club 1", email: "club1@gmail.com" },
      { id: 8, name: "Club 2", email: "club2@gmail.com" },
    ],
    event: [
      { id: 9, name: "Event 1", email: "event1@gmail.com" },
      { id: 10, name: "Event 2", email: "event2@gmail.com" },
    ],
  });

  const [approvedItems, setApprovedItems] = useState([]);

  //  Validation
  const validateReason = (value) => {
    if (!value.trim()) return "Reason is required!";
    if (value.trim().length < 5)
      return "Reason must be at least 5 characters!";
    if (value.length > 200)
      return "Reason must be less than 200 characters!";
    return "";
  };

  //  Approve
  const handleApprove = (item) => {
    const confirmAction = window.confirm(`Approve ${item.name}?`);
    if (!confirmAction) return;

    const alreadyApproved = approvedItems.find(
      (i) => i.id === item.id
    );
    if (alreadyApproved) {
      alert("Already approved!");
      return;
    }

    const updated = items[activeTab].filter(
      (i) => i.id !== item.id
    );

    setItems({
      ...items,
      [activeTab]: updated,
    });

    setApprovedItems([
      ...approvedItems,
      { ...item, status: "Email Sent " },
    ]);

    alert(`${item.name} Approved & Email Sent`);
  };

  //  Open modal
  const handleNotApprove = (item) => {
    setSelectedItem(item);
    setShowModal(true);
    setReason("");
    setError("");
  };

  //  Close modal
  const closeModal = () => {
    setShowModal(false);
    setReason("");
    setError("");
  };

  // Decline
  const submitReason = () => {
    if (!selectedItem) return;

    const validationError = validateReason(reason);

    if (validationError) {
      setError(validationError);
      return;
    }

    const updated = items[activeTab].filter(
      (i) => i.id !== selectedItem.id
    );

    setItems({
      ...items,
      [activeTab]: updated,
    });

    //  FINAL ALERT
    alert(
      `${selectedItem.name} Declined \nReason: ${reason}\n\n Email Sent Successfully to ${selectedItem.email}`
    );

    closeModal();
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Authorization"
        subtitle="Review pending approvals for tickets, clubs, and events with clear action controls."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatTile label="Pending Ticket" value={items.ticket.length} hint="Needs review" tone="orange" />
        <StatTile label="Pending Club" value={items.club.length} hint="Identity validation" tone="teal" />
        <StatTile label="Pending Event" value={items.event.length} hint="Compliance check" />
      </div>

      <Surface>
        <div className="mb-4 flex flex-wrap gap-2">
        {["ticket", "club", "event"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition ${
              activeTab === tab
                ? "bg-slate-900 text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {tab}
          </button>
        ))}
        </div>

        <h2 className="mb-3 text-lg font-bold text-slate-900">Pending Requests</h2>

        {items[activeTab].length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">No pending requests</p>
        ) : (
          <div className="space-y-3">
            {items[activeTab].map((item) => (
              <div key={item.id} className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center">
                <div>
                  <p className="text-base font-bold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-600">{item.email}</p>
                </div>

                <div className="flex gap-2">
                  <PrimaryButton onClick={() => handleApprove(item)} className="bg-emerald-600 hover:bg-emerald-700">
                    Approve
                  </PrimaryButton>
                  <GhostButton onClick={() => handleNotApprove(item)} className="border-rose-300 text-rose-700 hover:bg-rose-50">
                    Decline
                  </GhostButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </Surface>

      <Surface>
        <h2 className="mb-3 text-lg font-bold text-slate-900">Approved Items</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100/80 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {approvedItems.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-4 py-4 text-center text-slate-500">No approved items</td>
                </tr>
              ) : (
                approvedItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 font-semibold text-slate-800">{item.name}</td>
                    <td className="px-4 py-3 text-slate-600">{item.email}</td>
                    <td className="px-4 py-3">
                      <Badge tone="emerald">{item.status}</Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Surface>

      {showModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
            <h2 className="mb-2 text-lg font-bold text-slate-900">Decline: {selectedItem?.name}</h2>

            <p className="mb-3 text-sm text-slate-500">{selectedItem?.email}</p>

            <textarea
              className="w-full rounded-xl border border-slate-300 p-2.5 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
              placeholder="Type reason..."
              value={reason}
              maxLength={200}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) {
                  setError(
                    validateReason(e.target.value)
                  );
                }
              }}
            />

            <p className="mt-1 text-sm text-slate-500">{reason.length}/200</p>

            {error && (
              <p className="mt-1 text-sm text-rose-600">{error}</p>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={submitReason}
                disabled={!reason.trim()}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold text-white ${
                  reason.trim()
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "cursor-not-allowed bg-rose-300"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Authorization;
