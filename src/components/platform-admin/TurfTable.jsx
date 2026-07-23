import React from "react";
import Button from "../common/Button";
import TurfStatusBadge from "./TurfStatusBadge";

export default function TurfTable({ turfs, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-qt-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-qt-mist text-xs uppercase tracking-wide text-qt-charcoal/60">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Address</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Subscription due</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-qt-line">
          {turfs.map((turf) => (
            <tr key={turf.id} className="hover:bg-qt-mist/50">
              <td className="px-4 py-3 font-medium text-qt-navy">{turf.name}</td>
              <td className="px-4 py-3 text-qt-charcoal/70">{turf.address}</td>
              <td className="px-4 py-3">
                <TurfStatusBadge status={turf.status} />
              </td>
              <td className="px-4 py-3 text-qt-charcoal/70">
                {turf.subscription_due_date ? new Date(turf.subscription_due_date).toLocaleDateString() : "—"}
              </td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
