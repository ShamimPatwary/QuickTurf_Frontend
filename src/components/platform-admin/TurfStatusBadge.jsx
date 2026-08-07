/**
 * CHANGED FILE: src/components/platform-admin/TurfStatusBadge.jsx
 * Changes:
 *  - Shows "Active" in green when status is active
 *  - Shows "Expires soon" in amber when subscription expires within 5 days
 *  - Shows "Suspended" in red when suspended
 *  - Accepts optional subscriptionDueDate prop for expiry calculation
 */
import React from "react";
import Badge from "../common/Badge";

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function TurfStatusBadge({ status, subscriptionDueDate }) {
  if (status === "suspended") {
    return <Badge color="red">Suspended</Badge>;
  }

  const days = daysUntil(subscriptionDueDate);

  if (days !== null && days <= 5 && days >= 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
        ⚠ Expires in {days}d
      </span>
    );
  }

  if (days !== null && days < 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-qt-red/10 px-2.5 py-1 text-xs font-semibold text-qt-red">
        Expired
      </span>
    );
  }

  return <Badge color="green">Active</Badge>;
}