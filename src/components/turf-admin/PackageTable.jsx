import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

export default function PackageTable({ packages, sports, onCreate, onDelete, creating }) {
  const [form, setForm] = useState({ name: "", description: "", price: "", sport_ids: [] });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleSport = (sportId) => {
    setForm((prev) => ({
      ...prev,
      sport_ids: prev.sport_ids.includes(sportId)
        ? prev.sport_ids.filter((id) => id !== sportId)
        : [...prev.sport_ids, sportId],
    }));
  };
