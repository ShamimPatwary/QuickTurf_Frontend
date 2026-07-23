import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";

const emptyForm = {
  name: "",
  details: "",
  address: "",
  latitude: "",
  longitude: "",
  google_map_link: "",
  turf_admin_email: "",
  turf_admin_password: "",
};

export default function TurfFormModal({ open, onClose, onSubmit, initialData, submitting }) {
  const [form, setForm] = useState(emptyForm);
  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        details: initialData.details || "",
        address: initialData.address || "",
        latitude: initialData.latitude ?? "",
        longitude: initialData.longitude ?? "",
        google_map_link: initialData.google_map_link || "",
        turf_admin_email: "",
        turf_admin_password: "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData, open]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      latitude: form.latitude ? parseFloat(form.latitude) : null,
      longitude: form.longitude ? parseFloat(form.longitude) : null,
    };
    onSubmit(payload);
  };

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Edit Turf" : "Add New Turf"} widthClass="max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Turf name" name="name" value={form.name} onChange={handleChange} required />
        <Input label="Details" name="details" value={form.details} onChange={handleChange} />
        <Input label="Address" name="address" value={form.address} onChange={handleChange} required />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Latitude" name="latitude" type="number" step="0.0001" value={form.latitude} onChange={handleChange} />
          <Input label="Longitude" name="longitude" type="number" step="0.0001" value={form.longitude} onChange={handleChange} />
        </div>
        <Input label="Google Maps link" name="google_map_link" value={form.google_map_link} onChange={handleChange} />

        {!isEdit && (
          <>
            <div className="h-px bg-qt-line my-1" />
            <p className="text-xs font-semibold uppercase tracking-wide text-qt-charcoal/50">
              Turf admin login credentials
            </p>
            <Input
              label="Turf admin email"
              name="turf_admin_email"
              type="email"
              value={form.turf_admin_email}
              onChange={handleChange}
              required
            />
            <Input
              label="Turf admin password"
              name="turf_admin_password"
              type="password"
              value={form.turf_admin_password}
              onChange={handleChange}
              required
            />
          </>
        )}

        <Button type="submit" variant="accent" fullWidth disabled={submitting}>
          {submitting ? "Saving..." : isEdit ? "Save changes" : "Create turf"}
        </Button>
      </form>
    </Modal>
  );
}
