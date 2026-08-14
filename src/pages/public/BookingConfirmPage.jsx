/**
 * CHANGED FILE: src/pages/public/BookingConfirmPage.jsx
 *
 * Changes:
 *  - Receives state from BookingPaymentInfoPage (same state shape)
 *  - Shows a reminder of the turf phone number at the top so user
 *    can still reference it while filling the transaction ID
 *  - Transaction ID field is now first and required (user just paid)
 *  - SSLCommerz online pay button still available as alternative
 */
import React, { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import BookingForm from "../../components/public/BookingForm";
import DarkNavbar from "../../components/common/DarkNavbar";
import DarkFooter from "../../components/common/DarkFooter";
import { createPublicBooking } from "../../api/publicApi";
import { initiateBookingPayment } from "../../api/paymentApi";
import { getInvoiceUrl } from "../../api/publicApi";

export default function BookingConfirmPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [payingOnline, setPayingOnline] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);

  if (!state || !state.slot) {
    return <Navigate to="/book" replace />;
  }

  const { turf, sportId, sportName, bookingDate, slot } = state;


  const formatTime = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");

    const h = Number(hour);
    const period = h >= 12 ? "PM" : "AM";

    const hour12 = h % 12 || 12;

    return `${hour12}:${minute} ${period}`;
  };

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
      setBooking(res.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Could not complete booking. The slot may already be taken."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayOnline = async () => {
    setPayingOnline(true);
    setError("");
    try {
      const res = await initiateBookingPayment(booking.id);
      window.location.href = res.data.gateway_url;
    } catch {
      setError("Could not initiate online payment. Please try manual payment.");
      setPayingOnline(false);
    }
  };

  const handleViewInvoice = () => {
    navigate(`/invoice/${booking.id}`, { state: { booking } });
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}
      <DarkNavbar />
      <main className="mt-20 flex-1 mx-auto w-full max-w-2xl px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-qt-navy">
          {booking ? "Booking Confirmed!" : "Confirm Your Booking"}
        </h1>

        {/* Slot summary */}
        <Card className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="font-display font-semibold text-qt-navy">{turf.name}</p>
              <p className="text-qt-charcoal/60 capitalize">
                {sportName || "Sport"} · {bookingDate}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono font-semibold text-qt-navy">
                {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
              </p>
              <p className="font-display font-bold text-qt-green">৳{slot.price}</p>
            </div>
          </div>
        </Card>

        {/* Step indicator */}
        <div className="mt-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-qt-green/30 text-qt-green-dark text-xs">✓</span>
          <span className="text-qt-charcoal/40">Pay the amount</span>
          <span className="flex-1 h-px bg-qt-line" />
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-qt-green text-white text-xs">2</span>
          <span className="text-qt-green">Confirm booking</span>
        </div>

        {/* Turf phone reminder (only shown if no booking yet and phone exists) */}
        {!booking && turf.phone && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-qt-line bg-qt-mist px-4 py-3 text-sm">
            <span className="text-xl">💳</span>
            <div>
              <p className="text-qt-charcoal/60">Paid to</p>
              <p className="font-display font-bold text-qt-navy">{turf.phone}</p>
            </div>
            <p className="ml-auto text-xs text-qt-charcoal/40">
              Enter your Transaction ID below
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg bg-qt-red/10 px-4 py-3 text-sm text-qt-red-dark">
            {error}
          </div>
        )}

        {/* ── Step 2a: Booking form ─────────────────────────────── */}
        {!booking && (
          <Card className="mt-5">
            <BookingForm
              slotPrice={slot.price}
              turfId={turf.id}
              sportId={sportId}
              onSubmit={handleSubmit}
              submitting={submitting}
            />
          </Card>
        )}

        {/* ── Step 2b: After booking created ───────────────────── */}
        {booking && (
          <Card className="mt-5">
            <div className="flex flex-col gap-4">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-qt-green/10 text-3xl">
                  ✓
                </div>
                <h2 className="font-display font-bold text-qt-navy text-lg">
                  Booking #{booking.id} created
                </h2>
                <p className="mt-1 text-sm text-qt-charcoal/60">
                  Total ৳{booking.total_amount} · Paid ৳{booking.paid_amount} · Due{" "}
                  <span className="font-semibold text-qt-red">৳{booking.due_amount}</span>
                </p>
              </div>

              <div className="h-px bg-qt-line" />



              <Button variant="accent" fullWidth onClick={handleViewInvoice}>
                View booking & download invoice
              </Button>

              {/*<a
                href={getInvoiceUrl(booking.id)}
                target="_blank"
                rel="noreferrer"
                className="text-center text-sm text-qt-green hover:underline"
              >
                Download invoice PDF
              </a> */}

            </div>
          </Card>
        )}
      </main>
      {/* <Footer /> */ }
      <DarkFooter />
    </div>
  );
}