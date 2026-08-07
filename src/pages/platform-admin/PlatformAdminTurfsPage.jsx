/**
 * CHANGED FILE: src/pages/platform-admin/PlatformAdminTurfsPage.jsx
 * Changes: handleSubmit now receives (jsonPayload, formData) from the modal
 *   and picks the right API call for create vs edit.
 */
import React, { useEffect, useState } from "react";
import PlatformAdminLayout from "./PlatformAdminLayout";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import TurfTable from "../../components/platform-admin/TurfTable";
import TurfFormModal from "../../components/platform-admin/TurfFormModal";
import { createTurf, listTurfs, updateTurf, deleteTurf, updateTurfStatus } from "../../api/platformAdminApi";

export default function PlatformAdminTurfsPage() {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTurf, setEditingTurf] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadTurfs = () => {
    setLoading(true);
    listTurfs()
      .then((res) => setTurfs(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTurfs();
  }, []);

  const handleCreateClick = () => {
    setEditingTurf(null);
    setModalOpen(true);
  };

  const handleEdit = (turf) => {
    setEditingTurf(turf);
    setModalOpen(true);
  };

  /**
   * Modal calls onSubmit(jsonPayload, formData).
   * For create: jsonPayload is null, formData is a FormData (multipart).
   * For edit:   jsonPayload is a plain object, formData is null.
   */
  const handleSubmit = async (jsonPayload, formData) => {
    setSubmitting(true);
    try {
      if (editingTurf) {
        const { turf_admin_email, turf_admin_password, ...updateData } = jsonPayload;
        await updateTurf(editingTurf.id, updateData);
      } else {
        await createTurf(formData);
      }
      setModalOpen(false);
      loadTurfs();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (turf) => {
    if (!window.confirm(`Delete turf "${turf.name}"? This cannot be undone.`)) return;
    await deleteTurf(turf.id);
    loadTurfs();
  };

  const handleToggleStatus = async (turf) => {
    const newStatus = turf.status === "active" ? "suspended" : "active";
    await updateTurfStatus(turf.id, newStatus);
    loadTurfs();
  };

  return (
    <PlatformAdminLayout title="Turfs">
      <div className="mb-5 flex justify-end">
        <Button variant="accent" onClick={handleCreateClick}>
          + Add Turf
        </Button>
      </div>

      {loading && <Loader label="Loading turfs..." />}
      {!loading && turfs.length === 0 && (
        <EmptyState title="No turfs yet" description="Add your first turf to get started." />
      )}
      {!loading && turfs.length > 0 && (
        <TurfTable turfs={turfs} onEdit={handleEdit} onDelete={handleDelete} onToggleStatus={handleToggleStatus} />
      )}

      <TurfFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingTurf}
        submitting={submitting}
      />
    </PlatformAdminLayout>
  );
}
