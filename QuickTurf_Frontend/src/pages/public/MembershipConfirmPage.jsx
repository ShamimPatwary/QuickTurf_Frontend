/**
 * Membership Confirm Page
 * Shows after the BookingPaymentInfoPage for a membership purchase.
 * User submits name, phone, email, amount paid, and transaction ID.
 * On success it calls purchaseMembership and shows a confirmation.
 */
import React, { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import DarkNavbar from "../../components/common/DarkNavbar";
import DarkFooter from "../../components/common/DarkFooter";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { purchaseMembership } from "../../api/publicApi";

export default function MembershipConfirmPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount_paid: "",
    transaction_id: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  if (!state || !state.turf || !state.membership) {
    return <Navigate to="/turfs" replace />;
  }

  const { turf, membership } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
    }

    if (name === "amount_paid") {
      if (!/^\d*\.?\d*$/.test(value)) return;
    }

    setForm({ ...form, [name]: value });

    if (name !== "amount_paid") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      newErrors.name = "Name can contain only letters";
    }

    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(form.phone)) {
      newErrors.phone = "Phone number must contain only numbers";
    }

    const paid = Number(form.amount_paid);

    if (!form.amount_paid) {
      newErrors.amount_paid = "Amount paid is required";
    }

    if (paid < membership.price) {
      newErrors.amount_paid = `Amount must be at least ৳${membership.price}`
    }

    if (paid > membership.price) {
      newErrors.amount_paid = `Amount cannot exceed ৳${membership.price}`;
    }

    if (!form.transaction_id.trim()) {
      newErrors.transaction_id = "Transaction ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    setError("");

    try {
      await purchaseMembership(turf.id, {
        membership_id: membership.id,
        name: form.name,
        email: form.email || null,
        phone: form.phone,
        amount_paid: parseFloat(form.amount_paid),
        transaction_id: form.transaction_id,
      });
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Could not complete the membership purchase. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <DarkNavbar />
      <main className="mt-20 flex-1 mx-auto w-full max-w-2xl px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-qt-navy">
          {success ? "Membership Purchased!" : "Confirm Your Membership"}
        </h1>

        {/* Membership summary */}
        <Card className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="font-display font-semibold text-qt-navy">{membership.name}</p>
              <p className="text-qt-charcoal/60 capitalize">Membership purchase</p>
            </div>
            <div className="text-right">
              <p className="font-display font-bold text-qt-green">৳{membership.price}</p>
            </div>
          </div>
        </Card>

        {/* Step indicator */}
        <div className="mt-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-qt-green/30 text-qt-green-dark text-xs">✓</span>
          <span className="text-qt-charcoal/40">Pay the amount</span>
          <span className="flex-1 h-px bg-qt-line" />
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-qt-green text-white text-xs">2</span>
          <span className="text-qt-green">Confirm membership</span>
        </div>

        {/* Turf phone reminder */}
        {!success && turf.phone && (
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

        {/* ── Step 2a: Membership form ─────────────────────────── */}
        {!success && (
          <Card className="mt-5">
            <form onSubmit={handleSubmit} className="w-full max-w-full flex flex-col gap-4 px-2 sm:px-0">

              <div>
                <Input
                  label="Full name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Input
                  label="Phone number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXX"
                  required
                />
                {errors.phone && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>

              <Input
                label="Email (optional)"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />

              <div>
                <Input
                  label={`Amount paid (total: ৳${membership.price})`}
                  name="amount_paid"
                  type="number"
                  step="0.01"
                  min="500"
                  max={membership.price}
                  value={form.amount_paid}
                  onChange={handleChange}
                  placeholder="Amount to be paid full"
                  required
                />
                {errors.amount_paid && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.amount_paid}</p>
                )}
              </div>

              <div>
                <Input
                  label="Transaction ID (bKash/Nagad/Rocket)"
                  name="transaction_id"
                  placeholder="TXN-BKASH-9981"
                  value={form.transaction_id}
                  onChange={handleChange}
                  required
                />
                {errors.transaction_id && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.transaction_id}</p>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 rounded-lg bg-qt-mist px-3 sm:px-4 py-3 text-sm">
                <span className="text-qt-charcoal/60">Membership price</span>
                <span className="font-display font-semibold text-qt-green">৳{membership.price}</span>
              </div>

              <Button
                type="submit"
                variant="accent"
                fullWidth
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Confirm Membership"}
              </Button>

            </form>
          </Card>
        )}

        {/* ── Step 2b: After membership purchased ──────────────── */}
        {success && (
          <Card className="mt-5">
            <div className="flex flex-col gap-4">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-qt-green/10 text-3xl">
                  ✓
                </div>
                <h2 className="font-display font-bold text-qt-navy text-lg">
                  {membership.name} purchased
                </h2>
                <p className="mt-1 text-sm text-qt-charcoal/60">
                  Paid ৳{form.amount_paid} · It will be activated once the turf verifies your payment.
                </p>
              </div>

              <div className="h-px bg-qt-line" />

              <Button variant="accent" fullWidth onClick={() => navigate(`/turfs/${turf.id}`)}>
                Back to turf
              </Button>
            </div>
          </Card>
        )}

      </main>
      <DarkFooter />
    </div>
  );
}
