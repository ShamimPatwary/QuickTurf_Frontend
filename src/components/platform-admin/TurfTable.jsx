/**
 * CHANGED FILE: src/components/platform-admin/TurfTable.jsx
 * Changes:
 *  - Subscription due date column now shows days remaining
 *  - Passes subscriptionDueDate to TurfStatusBadge for expiry warnings
 *  - Rows with expiry within 5 days get a subtle amber background highlight
 */
import React from "react";
import Button from "../common/Button";
import TurfStatusBadge from "./TurfStatusBadge";

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function ExpiryCell({ dateStr }) {
  if (!dateStr) return <span className="text-qt-charcoal/30">—</span>;

  const days = daysUntil(dateStr);
  const date = new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });

  if (days < 0) {
    return (
      <span className="text-qt-red text-xs font-semibold">
        {date}
        <span className="ml-1 text-qt-red/60">(expired)</span>
      </span>
    );
  }

  if (days <= 5) {
    return (
      <span className="text-amber-600 text-xs font-semibold">
        {date}
        <span className="ml-1 text-amber-500">({days}d left)</span>
      </span>
    );
  }

  return (
    <span className="text-qt-charcoal/70 text-xs">
      {date}
      <span className="ml-1 text-qt-charcoal/40">({days}d left)</span>
    </span>
  );
}

export default function TurfTable({ turfs, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-qt-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-qt-mist text-xs uppercase tracking-wide text-qt-charcoal/60">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Address</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Subscription expires</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-qt-line">
          {turfs.map((turf) => {
            const days = daysUntil(turf.subscription_due_date);
            const rowWarning = days !== null && days <= 5 && days >= 0 && turf.status === "active";
            const rowExpired = days !== null && days < 0 && turf.status === "active";

            return (
              <tr
                key={turf.id}
                className={
                  rowExpired
                    ? "bg-qt-red/5 hover:bg-qt-red/10"
                    : rowWarning
                    ? "bg-amber-50 hover:bg-amber-100"
                    : "hover:bg-qt-mist/50"
                }
              >
                {/* Name */}
                <td className="px-4 py-3 font-medium text-qt-navy">
                  {turf.name}
                </td>

                {/* Phone */}
                <td className="px-4 py-3 text-qt-charcoal/70">
                  {turf.phone || "—"}
                </td>

                {/* Address */}
                <td className="px-4 py-3 text-qt-charcoal/70 max-w-xs truncate">
                  {turf.address}
                </td>

                {/* Status badge */}
                <td className="px-4 py-3">
                  <TurfStatusBadge
                    status={turf.status}
                    subscriptionDueDate={turf.subscription_due_date}
                  />
                </td>

                {/* Expiry */}
                <td className="px-4 py-3">
                  <ExpiryCell dateStr={turf.subscription_due_date} />
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => onEdit(turf)}>
                      Edit
                    </Button>
                    <Button
                      variant={turf.status === "active" ? "danger" : "accent"}
                      onClick={() => onToggleStatus(turf)}
                    >
                      {turf.status === "active" ? "Suspend" : "Activate"}
                    </Button>
                    <Button variant="ghost" onClick={() => onDelete(turf)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}