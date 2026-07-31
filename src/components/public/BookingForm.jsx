import React, { useEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { checkMembershipDiscount } from "../../api/publicApi";

const MATCH_TYPES = ["friendly", "practice", "tournament", "league"];

export default function BookingForm({ slotPrice, turfId, sportId, onSubmit, submitting }) {
  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    paid_amount: "",
    notes: "",
    match_type: "friendly",
    transaction_id: "",
  });
  const [discount, setDiscount] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    const phone = form.customer_phone.trim();
    if (phone.length < 8 || !turfId || !sportId) {
      setDiscount(null);
      return;
    }
    const timeout = setTimeout(() => {
      checkMembershipDiscount(turfId, phone, sportId)
        .then((res) => setDiscount(res.data.is_member ? res.data : null))
        .catch(() => setDiscount(null));
    }, 500);
    return () => clearTimeout(timeout);
  }, [form.customer_phone, turfId, sportId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      paid_amount: form.paid_amount ? parseFloat(form.paid_amount) : 0,
    });
  };

  const discountedPrice = discount
    ? Math.max(slotPrice - (slotPrice * discount.discount_percentage) / 100, 0)
    : slotPrice;
  const due = discountedPrice && form.paid_amount ? Math.max(discountedPrice - parseFloat(form.paid_amount || 0), 0) : discountedPrice;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Full name" name="customer_name" value={form.customer_name} onChange={handleChange} required />
      <Input
        label="Phone number"
        name="customer_phone"
        value={form.customer_phone}
        onChange={handleChange}
        placeholder="+8801XXXXXXXXX"
        required
      />

      {discount && (
        <div className="rounded-lg bg-qt-green/10 px-4 py-3 text-sm text-qt-green-dark">
          🎉 {discount.membership_name} member — {discount.discount_percentage}% discount applied automatically
        </div>
      )}

      <Input
        label="Email (optional)"
        name="customer_email"
        type="email"
        value={form.customer_email}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-qt-charcoal">Match type</label>
        <select
          name="match_type"
          value={form.match_type}
          onChange={handleChange}
          className="rounded-lg border border-qt-line px-3.5 py-2.5 text-sm capitalize focus:ring-2 focus:ring-qt-green focus:border-qt-green outline-none transition"
        >
          {MATCH_TYPES.map((type) => (
            <option key={type} value={type} className="capitalize">
              {type}
            </option>
          ))}
        </select>
      </div>

      <Input
        label={`Paid amount (total: ৳${discountedPrice ?? 0})`}
        name="paid_amount"
        type="number"
        step="0.01"
        min="0"
        value={form.paid_amount}
        onChange={handleChange}
        placeholder="0"
      />