/**
 * CHANGED FILE: src/components/public/MembershipPurchaseModal.jsx
 * Changes:
 *  - After the user fills the form and clicks Submit, they see two buttons:
 *    1. "Pay via SSLCommerz" → initiates online payment redirect
 *    2. "Pay Manually" → closes the modal (manual bKash/Nagad flow,
 *       transaction ID entered on the form itself)
 */
import React, { useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { initiateMembershipPayment } from "../../api/paymentApi";

export default function MembershipPurchaseModal({
  open,
  onClose,
  membership,
  turfId,
  onSubmit,
  submitting,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount_paid: "",
    transaction_id: "",
  });
  const [step, setStep] = useState("form"); // "form" | "payment"
  const [payingOnline, setPayingOnline] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStep("payment");
  };

  const handlePayOnline = async () => {
    setPayingOnline(true);
    setError("");
    try {
      const res = await initiateMembershipPayment({
        turf_id: turfId,
        membership_id: membership.id,
        customer_name: form.name,
        customer_email: form.email || null,
        customer_phone: form.phone,
      });
      // Also create the member record in pending state before redirect
      await onSubmit({
        ...form,
        amount_paid: membership.price,
        transaction_id: "SSLCommerz-pending",
      });
      window.location.href = res.data.gateway_url;
    } catch (err) {
      setError("Could not initiate online payment. Try manual payment.");
      setPayingOnline(false);
    }
  };

  const handlePayManual = async () => {
    if (!form.amount_paid || !form.transaction_id) {
      setStep("manual");
      return;
    }
    await onSubmit({ ...form, amount_paid: parseFloat(form.amount_paid) });
  };

  const handleClose = () => {
    setStep("form");
    setForm({ name: "", email: "", phone: "", amount_paid: "", transaction_id: "" });
    setError("");
    onClose();
  };

  if (!membership) return null;

  return (
    <Modal open={open} onClose={handleClose} title={`Buy ${membership.name}`}>
      {/* Membership summary */}
      <div className="mb-4 rounded-lg bg-qt-mist px-4 py-3 text-sm">
        <p className="text-qt-charcoal/70">
          {membership.duration_days} days ·{" "}
          {membership.discount_percentage > 0 &&
            `${membership.discount_percentage}% off every booking · `}
          <span className="font-semibold text-qt-green">৳{membership.price}</span>
        </p>
      </div>

      {error && (
        <div className="mb-3 rounded-lg bg-qt-red/10 px-3 py-2 text-sm text-qt-red-dark">{error}</div>
      )}

      {/* ── Step 1: Personal info form ─────────────────────────── */}
      {(step === "form" || step === "manual") && (
        <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
          <Input label="Full name" name="name" value={form.name} onChange={handleChange} required />
          <Input label="Email (optional)" name="email" type="email" value={form.email} onChange={handleChange} />
          <Input
            label="Phone number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+8801XXXXXXXXX"
            required
          />
          <p className="text-xs text-qt-charcoal/50 -mt-2">
            This phone number will be used to automatically apply your discount on future bookings.
          </p>

          {step === "manual" && (
            <>
              <Input
                label="Amount paid (৳)"
                name="amount_paid"
                type="number"
                step="0.01"
                min="0"
                value={form.amount_paid}
                onChange={handleChange}
                required
              />
              <Input
                label="Transaction ID"
                name="transaction_id"
                placeholder="e.g. TXN-BKASH-9981"
                value={form.transaction_id}
                onChange={handleChange}
                required
              />
              <Button type="button" variant="accent" fullWidth onClick={handlePayManual} disabled={submitting}>
                {submitting ? "Submitting..." : "Submit manual payment"}
              </Button>
            </>
          )}

          {step === "form" && (
            <Button type="submit" variant="accent" fullWidth>
              Continue to payment
            </Button>
          )}
        </form>
      )}

      {/* ── Step 2: Choose payment method ─────────────────────── */}
      {step === "payment" && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-qt-charcoal">Choose how to pay:</p>

          {/* Online */}
          <button
            onClick={handlePayOnline}
            disabled={payingOnline}
            className="flex items-center gap-3 rounded-xl border-2 border-qt-navy bg-qt-navy px-4 py-4 text-left text-white hover:bg-qt-navy-light disabled:opacity-60 transition"
          >
            <span className="text-xl">💳</span>
            <div>
              <p className="font-display font-bold">Pay via SSLCommerz</p>
              <p className="text-sm text-white/70">Card, bKash, Nagad, Rocket — secure redirect</p>
            </div>
            {payingOnline && <span className="ml-auto text-sm text-white/60">Redirecting…</span>}
          </button>

          {/* Manual */}
          <button
            onClick={() => setStep("manual")}
            className="flex items-center gap-3 rounded-xl border-2 border-qt-line bg-white px-4 py-4 text-left hover:border-qt-green hover:bg-qt-mist transition"
          >
            <span className="text-xl">🏦</span>
            <div>
              <p className="font-display font-bold text-qt-navy">Pay Manually</p>
              <p className="text-sm text-qt-charcoal/60">Send via bKash/Nagad, then enter your transaction ID</p>
            </div>
          </button>

          <button
            onClick={() => setStep("form")}
            className="text-center text-xs text-qt-charcoal/40 hover:text-qt-charcoal"
          >
            ← Back
          </button>

          <p className="text-center text-xs text-qt-charcoal/50">
            Your membership will be activated once the turf verifies your payment.
          </p>
        </div>
      )}
    </Modal>
  );
}
