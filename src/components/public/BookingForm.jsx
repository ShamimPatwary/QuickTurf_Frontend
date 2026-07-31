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