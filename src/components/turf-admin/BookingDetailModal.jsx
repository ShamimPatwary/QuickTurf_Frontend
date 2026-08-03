import React from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Badge from "../common/Badge";
import { getInvoiceUrl } from "../../api/publicApi";

export default function BookingDetailModal({ booking, open, onClose, onAddPayment, onWhatsapp, onMarkStatus }) {
  if (!booking) return null;

  return (
    <Modal open={open} onClose={onClose} title={`Booking #${booking.id}`} widthClass="max-w-lg">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-qt-charcoal/50">Customer</p>
            <p className="font-medium text-qt-navy">{booking.customer_name}</p>
          </div>
          <div>
            <p className="text-qt-charcoal/50">Phone</p>
            <p className="font-medium text-qt-navy">{booking.customer_phone}</p>
          </div>
          <div>
            <p className="text-qt-charcoal/50">Sport</p>
            <p className="font-medium capitalize text-qt-navy">{booking.sport_name || "—"}</p>
          </div>
          <div>
            <p className="text-qt-charcoal/50">Match type</p>
            <p className="font-medium capitalize text-qt-navy">{booking.match_type}</p>
          </div>
          <div>
            <p className="text-qt-charcoal/50">Date</p>
            <p className="font-medium text-qt-navy">{booking.booking_date}</p>
          </div>
        
          <div>
  <p className="text-qt-charcoal/50">Created At</p>
  <p className="font-medium text-qt-navy">
    {booking.created_at
      ? new Date(booking.created_at).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "—"}
  </p>
</div>

          <div>
            <p className="text-qt-charcoal/50">Status</p>
            <Badge color="navy">{booking.status}</Badge>
          </div>
          <div>
            <p className="text-qt-charcoal/50">Total / Paid / Due</p>
            <p className="font-medium text-qt-navy">
              ৳{booking.total_amount} / ৳{booking.paid_amount} / <span className="text-qt-red">৳{booking.due_amount}</span>
            </p>
          </div>
          <div>
            <p className="text-qt-charcoal/50">Payment status</p>
            <Badge color="green">{booking.payment_status}</Badge>
          </div>
          {booking.discount_amount > 0 && (
            <div>
              <p className="text-qt-charcoal/50">Membership discount</p>
              <p className="font-medium text-qt-green">৳{booking.discount_amount}</p>
            </div>
          )}
          <div>
            <p className="text-qt-charcoal/50">Transaction ID</p>
            <p className="font-medium text-qt-navy">{booking.transaction_id || "—"}</p>
          </div>
        </div>

        {booking.notes && (
          <div>
            <p className="text-qt-charcoal/50 text-sm">Notes</p>
            <p className="text-sm">{booking.notes}</p>
          </div>
        )}

        <div className="h-px bg-qt-line" />

        <div className="flex flex-wrap gap-2">
          <Button variant="accent" onClick={() => onAddPayment(booking)}>
            Add payment
          </Button>
          <Button variant="primary" onClick={() => onWhatsapp(booking)}>
            Send via WhatsApp
          </Button>
          <a href={getInvoiceUrl(booking.id)} target="_blank" rel="noreferrer">
            <Button variant="ghost">Download invoice</Button>
          </a>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={() => onMarkStatus(booking, "completed")}>
            Mark completed
          </Button>
          <Button variant="ghost" onClick={() => onMarkStatus(booking, "cancelled")}>
            Mark cancelled
          </Button>
        </div>
      </div>
    </Modal>
  );
}
