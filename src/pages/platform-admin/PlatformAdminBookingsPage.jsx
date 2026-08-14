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
        <div className="rounded-xl border border-qt-line bg-white">
          {/* ── Mobile card list ─────────────────────────────────── */}
          <div className="divide-y divide-qt-line sm:hidden bg-white">
            {bookings.map((b) => (
              <div key={b.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-qt-navy text-sm">#{b.id}</p>
                    <p className="mt-0.5 font-medium text-qt-navy break-words">{b.customer_name}</p>
                    <p className="mt-0.5 text-xs text-qt-charcoal/70">Turf #{b.turf_id}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Badge color={paymentColor[b.payment_status]}>{b.payment_status}</Badge>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2 text-sm">
                  <span className="text-qt-charcoal/70">{b.booking_date}</span>
                  <span className="font-semibold text-qt-navy">৳{b.total_amount}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Desktop table ────────────────────────────────────── */}
          <table className="hidden min-w-[640px] w-full text-left text-sm sm:table">
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
