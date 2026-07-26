import React from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import { getInvoiceUrl } from "../../api/publicApi";

export default function InvoicePage() {
  const { bookingId } = useParams();
  const { state } = useLocation();
  const booking = state?.booking;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-xl px-6 py-12">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-qt-green/10 text-2xl">
            ✓
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold text-qt-navy">Booking confirmed</h1>
          <p className="mt-2 text-qt-charcoal/60">Booking reference #{bookingId}</p>
        </div>

        {booking && (
          <Card className="mt-8">
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-qt-charcoal/50">Customer</span>
                <span className="font-medium">{booking.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-qt-charcoal/50">Date</span>
                <span className="font-medium">{booking.booking_date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-qt-charcoal/50">Total amount</span>
                <span className="font-medium">৳{booking.total_amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-qt-charcoal/50">Paid</span>
                <span className="font-medium text-qt-green">৳{booking.paid_amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-qt-charcoal/50">Due</span>
                <span className="font-medium text-qt-red">৳{booking.due_amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-qt-charcoal/50">Payment status</span>
                <Badge color="navy">{booking.payment_status}</Badge>
              </div>
            </div>
          </Card>
        )}

        <div className="mt-8 flex flex-col items-center gap-3">
          <a href={getInvoiceUrl(bookingId)} target="_blank" rel="noreferrer">
            <Button variant="accent">Download Invoice (PDF)</Button>
          </a>
          <Link to="/" className="text-sm text-qt-charcoal/60 hover:text-qt-navy">
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
