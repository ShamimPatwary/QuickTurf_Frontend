/**
 * Changes:
 *  - Added `phone` field
 *  - Added image file picker (multi-select, shown during Create only — for
 *    Edit, images are managed via the separate image endpoints already in place)
 *  - onSubmit now receives a FormData so the router can send multipart
 */
import React, { useEffect, useRef, useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";

const emptyForm = {
  name: "",
  details: "",
  address: "",
  phone: "",
  latitude: "",
  longitude: "",
  google_map_link: "",
  turf_admin_email: "",
  turf_admin_password: "",
};

export default function TurfFormModal({ open, onClose, onSubmit, initialData, submitting }) {
  const [form, setForm] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileRef = useRef(null);
  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        details: initialData.details || "",
        address: initialData.address || "",
        phone: initialData.phone || "",
        latitude: initialData.latitude ?? "",
        longitude: initialData.longitude ?? "",
        google_map_link: initialData.google_map_link || "",
        turf_admin_email: "",
        turf_admin_password: "",
      });
    } else {
      setForm(emptyForm);
      setImageFiles([]);
      setPreviews([]);
    }
  }, [initialData, open]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (idx) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      // Edit: send plain JSON (images managed separately)
      const payload = { ...form };
      if (payload.latitude) payload.latitude = parseFloat(payload.latitude);
      if (payload.longitude) payload.longitude = parseFloat(payload.longitude);
      onSubmit(payload, null);
    } else {
      // Create: send multipart FormData so images go with the turf
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("address", form.address);
      if (form.details) fd.append("details", form.details);
      if (form.phone) fd.append("phone", form.phone);
      if (form.latitude) fd.append("latitude", form.latitude);
      if (form.longitude) fd.append("longitude", form.longitude);
      if (form.google_map_link) fd.append("google_map_link", form.google_map_link);
      fd.append("turf_admin_email", form.turf_admin_email);
      fd.append("turf_admin_password", form.turf_admin_password);
      imageFiles.forEach((f) => fd.append("images", f));
      onSubmit(null, fd);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Edit Turf" : "Add New Turf"} widthClass="max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto pr-1">
        <Input label="Turf name" name="name" value={form.name} onChange={handleChange} required />
        <Input label="Details" name="details" value={form.details} onChange={handleChange} />
        <Input label="Address" name="address" value={form.address} onChange={handleChange} required />
        <Input label="Phone number" name="phone" value={form.phone} onChange={handleChange} placeholder="+8801XXXXXXXXX" />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Latitude" name="latitude" type="number" step="0.0001" value={form.latitude} onChange={handleChange} />
          <Input label="Longitude" name="longitude" type="number" step="0.0001" value={form.longitude} onChange={handleChange} />
        </div>
        <Input label="Google Maps link" name="google_map_link" value={form.google_map_link} onChange={handleChange} />

        {!isEdit && (
          <>
            <div className="h-px bg-qt-line" />
            <p className="text-xs font-semibold uppercase tracking-wide text-qt-charcoal/50">Turf admin credentials</p>
            <Input label="Turf admin email" name="turf_admin_email" type="email" value={form.turf_admin_email} onChange={handleChange} required />
            <Input label="Turf admin password" name="turf_admin_password" type="password" value={form.turf_admin_password} onChange={handleChange} required />

            <div className="h-px bg-qt-line" />
            <p className="text-xs font-semibold uppercase tracking-wide text-qt-charcoal/50">Turf images (optional)</p>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="rounded-lg border-2 border-dashed border-qt-line px-4 py-5 text-sm text-qt-charcoal/50 hover:border-qt-green hover:text-qt-green transition-colors text-center"
            >
              Click to upload images (multiple allowed)
            </button>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />

            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {previews.map((src, i) => (
                  <div key={i} className="relative group">
                    <img src={src} alt="" className="h-20 w-full rounded-lg object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 hidden group-hover:flex h-5 w-5 items-center justify-center rounded-full bg-qt-red text-white text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <Button type="submit" variant="accent" fullWidth disabled={submitting}>
          {submitting ? "Saving..." : isEdit ? "Save changes" : "Create turf"}
        </Button>
      </form>
    </Modal>
  );
}
