
import React from "react";
import Button from "../common/Button";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

const paymentColor = { paid: "green", partial: "navy", pending: "red" };
const statusColor  = { upcoming: "navy", completed: "green", cancelled: "red" };

const formatTime = (time) => {
  if (!time) return "";

  const [hour, minute] = time.split(":");
  const h = Number(hour);

  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;

  return `${hour12}:${minute} ${period}`;
};

export default function BookingTable({ bookings, onView }) {
  if (bookings.length === 0) {
    return (
      <EmptyState
        title="No bookings yet"
        description="Bookings made by customers will appear here."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-qt-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-qt-mist text-xs uppercase tracking-wide text-qt-charcoal/60">
          <tr>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Sport</th>
            <th className="px-4 py-3">Time Slot</th>
            <th className="px-4 py-3">Match type</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Created Time</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Due</th>
            <th className="px-4 py-3">Transaction ID</th>
            <th className="px-4 py-3">Match status</th>
            <th className="px-4 py-3">Payment</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-qt-line">
          {bookings.map((b) => (
            <tr key={b.id} className="hover:bg-qt-mist/50">

              {/* Customer */}
              <td className="px-4 py-3">
                <p className="font-medium text-qt-navy">{b.customer_name}</p>
                <p className="text-xs text-qt-charcoal/50">{b.customer_phone}</p>
              </td>

              {/* Sport */}
              <td className="px-4 py-3 capitalize text-qt-charcoal/80">
                {b.sport_name || "—"}
              </td>

              {/* Time Slot */}
              <td className="px-4 py-3 font-mono text-qt-navy whitespace-nowrap">
                {b.time_slot
                  ? `${formatTime(b.time_slot.start_time)} – ${formatTime(b.time_slot.end_time)}`
                  : b.start_time
                  ? `${formatTime(b.start_time)} – ${formatTime(b.end_time)}`
                  : "—"}
              </td>

              {/* Match type */}
              <td className="px-4 py-3 capitalize text-qt-charcoal/70">
                {b.match_type}
              </td>

              {/* Date */}
              <td className="px-4 py-3 text-qt-charcoal/70 whitespace-nowrap">
                {b.booking_date}
              </td>
              
              {/* Created At */}
              <td className="px-4 py-3 text-qt-charcoal/70 whitespace-nowrap">
                {b.created_at
                  ? new Date(b.created_at).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "—"}
              </td>

              {/* Total */}
              <td className="px-4 py-3">৳{b.total_amount}</td>

              {/* Due */}
              <td className="px-4 py-3 font-medium text-qt-red">
                ৳{b.due_amount}
              </td>

              {/* Transaction ID */}
              <td className="px-4 py-3">
                {b.transaction_id ? (
                  <span className="font-mono text-xs text-qt-charcoal/80 bg-qt-mist px-2 py-1 rounded">
                    {b.transaction_id}
                  </span>
                ) : (
                  <span className="text-xs text-qt-charcoal/30">—</span>
                )}
              </td>

              {/* Match status */}
              <td className="px-4 py-3">
                <Badge color={statusColor[b.status]}>{b.status}</Badge>
              </td>

              {/* Payment status */}
              <td className="px-4 py-3">
                <Badge color={paymentColor[b.payment_status]}>
                  {b.payment_status}
                </Badge>
              </td>

              {/* Actions */}
              <td className="px-4 py-3 text-right">
                <Button variant="ghost" onClick={() => onView(b)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}