import React, { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Card from "../../components/common/Card";
import BookingForm from "../../components/public/BookingForm";
import { createPublicBooking } from "../../api/publicApi";

export default function BookingConfirmPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!state || !state.slot) {
    return <Navigate to="/book" replace />;
  }

  const { turf, sportId, bookingDate, slot } = state;

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await createPublicBooking({
        turf_id: turf.id,
        sport_id: sportId,
        time_slot_id: slot.id,
        booking_date: bookingDate,
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email || null,
        paid_amount: formData.paid_amount,
        notes: formData.notes || null,
        match_type: formData.match_type || "friendly",
        transaction_id: formData.transaction_id || null,
      });
      navigate(`/invoice/${res.data.id}`, { state: { booking: res.data } });
    } catch (err) {
      setError(err.response?.data?.detail || "Could not complete booking. The slot may already be taken.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-2xl px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-qt-navy">Confirm Booking</h1>

        <Card className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="font-display font-semibold text-qt-navy">{turf.name}</p>
              <p className="text-qt-charcoal/60">{bookingDate}</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-semibold text-qt-navy">
                {slot.start_time?.slice(0, 5)}–{slot.end_time?.slice(0, 5)}
              </p>
              <p className="text-qt-green font-semibold">৳{slot.price}</p>
            </div>
          </div>
        </Card>

        <Card className="mt-6">
          {error && (
            <div className="mb-4 rounded-lg bg-qt-red/10 px-4 py-3 text-sm text-qt-red-dark">{error}</div>
          )}
          <BookingForm
            slotPrice={slot.price}
            turfId={turf.id}
            sportId={sportId}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </Card>
      </main>
      <Footer />
    </div>
  );
}
