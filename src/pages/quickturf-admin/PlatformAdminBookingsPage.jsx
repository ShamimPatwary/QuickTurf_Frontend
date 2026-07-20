import React, { useEffect, useState } from "react";
import PlatformAdminLayout from "./PlatformAdminLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Badge from "../../components/common/Badge";
import { listAllBookings } from "../../api/platformAdminApi";

const paymentColor = { paid: "green", partial: "navy", pending: "red" };

export default function PlatformAdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAllBookings()
      .then((res) => setBookings(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PlatformAdminLayout title="All Bookings">
      {loading && <Loader label="Loading bookings..." />}
      {!loading && bookings.length === 0 && (
        <EmptyState title="No bookings yet" description="Bookings from all turfs will appear here." />
      )}
      {!loading && bookings.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-qt-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-qt-mist text-xs uppercase tracking-wide text-qt-charcoal/60">
              <tr>
                <th className="px-4 py-3">Booking ID</th>
                <th className="px-4 py-3">Turf ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-qt-line">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-qt-mist/50">
                  <td className="px-4 py-3 font-mono text-qt-navy">#{b.id}</td>
                  <td className="px-4 py-3 text-qt-charcoal/70">#{b.turf_id}</td>
                  <td className="px-4 py-3 font-medium text-qt-navy">{b.customer_name}</td>
                  <td className="px-4 py-3 text-qt-charcoal/70">{b.booking_date}</td>
                  <td className="px-4 py-3">৳{b.total_amount}</td>
                  <td className="px-4 py-3">
                    <Badge color={paymentColor[b.payment_status]}>{b.payment_status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PlatformAdminLayout>
  );
}
