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