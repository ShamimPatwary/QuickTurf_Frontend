import React, { useEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { checkMembershipDiscount } from "../../api/publicApi";

const MATCH_TYPES = ["friendly", "practice", "tournament", "league"];

export default function BookingForm({
  slotPrice,
  turfId,
  sportId,
  onSubmit,
  submitting,
}) {
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
  const [errors, setErrors] = useState({});


const handleChange = (e) => {
  const { name, value } = e.target;

  // Name validation
  if (name === "customer_name") {
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }
  }


  // Phone validation
  if (name === "customer_phone") {
    if (!/^\d*$/.test(value)) {
      return;
    }
  }


  // Paid amount validation
  if (name === "paid_amount") {
    if (!/^\d*\.?\d*$/.test(value)) {
      return;
    }

    const paid = Number(value);

    if (paid > discountedPrice) {
      setErrors((prev) => ({
        ...prev,
        paid_amount: `Paid amount cannot exceed ৳${discountedPrice}`,
      }));
    } 
    else if (paid < 500 && value !== "") {
      setErrors((prev) => ({
        ...prev,
        paid_amount: "Minimum payment is ৳500",
      }));
    } 
    else {
      setErrors((prev) => ({
        ...prev,
        paid_amount: "",
      }));
    }
  }


  setForm({
    ...form,
    [name]: value,
  });


  if (name !== "paid_amount") {
    setErrors({
      ...errors,
      [name]: "",
    });
  }
};


  useEffect(() => {
    const phone = form.customer_phone.trim();

    if (phone.length < 8 || !turfId || !sportId) {
      setDiscount(null);
      return;
    }


    const timeout = setTimeout(() => {
      checkMembershipDiscount(turfId, phone, sportId)
        .then((res) =>
          setDiscount(res.data.is_member ? res.data : null)
        )
        .catch(() => setDiscount(null));

    }, 500);


    return () => clearTimeout(timeout);

  }, [form.customer_phone, turfId, sportId]);



  const discountedPrice = discount
    ? Math.max(
        slotPrice -
          (slotPrice * discount.discount_percentage) / 100,
        0
      )
    : slotPrice;



  const due =
    discountedPrice && form.paid_amount
      ? Math.max(
          discountedPrice - parseFloat(form.paid_amount || 0),
          0
        )
      : discountedPrice;



  const validateForm = () => {
    let newErrors = {};


    // Name
    if (!form.customer_name.trim()) {
      newErrors.customer_name = "Name is required";
    }


    if (!/^[a-zA-Z\s]+$/.test(form.customer_name)) {
      newErrors.customer_name =
        "Name can contain only letters";
    }



    // Phone
    if (!form.customer_phone) {
      newErrors.customer_phone =
        "Phone number is required";
    }


    if (!/^\d+$/.test(form.customer_phone)) {
      newErrors.customer_phone =
        "Phone number must contain only numbers";
    }



    // Paid amount
    const paid = Number(form.paid_amount);


    if (!form.paid_amount) {
      newErrors.paid_amount =
        "Paid amount is required";
    }


    if (paid < 500) {
      newErrors.paid_amount =
        "Minimum payment is ৳500";
    }


    if (paid > discountedPrice) {
      newErrors.paid_amount =
        `Paid amount cannot exceed ৳${discountedPrice}`;
    }



    // Transaction ID
    if (!form.transaction_id.trim()) {
      newErrors.transaction_id =
        "Transaction ID is required";
    }


    setErrors(newErrors);


    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = (e) => {
    e.preventDefault();


    if (!validateForm()) {
      return;
    }


    onSubmit({
      ...form,
      paid_amount: parseFloat(form.paid_amount),
    });

  };



  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >

      <div>
        <Input
          label="Full name"
          name="customer_name"
          value={form.customer_name}
          onChange={handleChange}
          required
        />

        {errors.customer_name && (
          <p className="text-xs text-red-500 mt-1">
            {errors.customer_name}
          </p>
        )}
      </div>



      <div>
        <Input
          label="Phone number"
          name="customer_phone"
          value={form.customer_phone}
          onChange={handleChange}
          placeholder="01XXXXXXXX"
          required
        />

        {errors.customer_phone && (
          <p className="text-xs text-red-500 mt-1">
            {errors.customer_phone}
          </p>
        )}
      </div>



      {discount && (
        <div className="rounded-lg bg-qt-green/10 px-4 py-3 text-sm text-qt-green-dark">
          🎉 {discount.membership_name} member —
          {" "}
          {discount.discount_percentage}% discount applied automatically
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
        <label className="text-sm font-medium text-qt-charcoal">
          Match type
        </label>

        <select
          name="match_type"
          value={form.match_type}
          onChange={handleChange}
          className="rounded-lg border border-qt-line px-3.5 py-2.5 text-sm capitalize"
        >
          {MATCH_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>



      <div>
        <Input
          label={`Paid amount (total: ৳${discountedPrice})`}
          name="paid_amount"
          type="number"
          step="0.01"
          min="500"
          max={discountedPrice}
          value={form.paid_amount}
          onChange={handleChange}
          placeholder="Minimum ৳500"
          required
        />

        {errors.paid_amount && (
          <p className="text-xs text-red-500 mt-1">
            {errors.paid_amount}
          </p>
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
          <p className="text-xs text-red-500 mt-1">
            {errors.transaction_id}
          </p>
        )}
      </div>




      <div>
        <label className="text-sm font-medium text-qt-charcoal">
          Notes (optional)
        </label>

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-lg border border-qt-line px-3.5 py-2.5"
        />
      </div>




      <div className="flex items-center justify-between rounded-lg bg-qt-mist px-4 py-3 text-sm">
        <span className="text-qt-charcoal/60">
          Due amount
        </span>

        <span className="font-display font-semibold text-qt-red">
          ৳{due ?? 0}
        </span>
      </div>



      <Button
        type="submit"
        variant="accent"
        fullWidth
        disabled={submitting}
      >
        {submitting
          ? "Confirming booking..."
          : "Confirm Booking"}
      </Button>


    </form>
  );
}