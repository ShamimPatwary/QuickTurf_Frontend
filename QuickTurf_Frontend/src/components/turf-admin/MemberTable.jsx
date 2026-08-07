import React from "react";
import Button from "../common/Button";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

const statusColor = { pending: "navy", active: "green", rejected: "red", expired: "gray" };

export default function MemberTable({ members, onApprove, onReject }) {
  if (members.length === 0) {
    return <EmptyState title="No membership purchases yet" description="Customer membership purchases will appear here for approval." />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-qt-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-qt-mist text-xs uppercase tracking-wide text-qt-charcoal/60">
          <tr>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Amount paid</th>
            <th className="px-4 py-3">Transaction ID</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Expires</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-qt-line">
          {members.map((m) => (
            <tr key={m.id} className="hover:bg-qt-mist/50">
              <td className="px-4 py-3">
                <p className="font-medium text-qt-navy">{m.name}</p>
                <p className="text-xs text-qt-charcoal/50">{m.email || "—"}</p>
              </td>
              <td className="px-4 py-3 text-qt-charcoal/70">{m.phone}</td>
              <td className="px-4 py-3">৳{m.amount_paid}</td>
              <td className="px-4 py-3 font-mono text-xs text-qt-charcoal/70">{m.transaction_id}</td>
              <td className="px-4 py-3">
                <Badge color={statusColor[m.status]}>{m.status}</Badge>
              </td>
              <td className="px-4 py-3 text-xs text-qt-charcoal/60">
                {m.expires_at ? new Date(m.expires_at).toLocaleDateString() : "—"}
              </td>
              <td className="px-4 py-3 text-right">
                {m.status === "pending" && (
                  <div className="flex justify-end gap-2">
                    <Button variant="accent" onClick={() => onApprove(m)}>
                      Approve
                    </Button>
                    <Button variant="danger" onClick={() => onReject(m)}>
                      Reject
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
