import React, { useEffect, useState } from "react";
import TurfAdminLayout from "./TurfAdminLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import TimeSlotTable from "../../components/turf-admin/TimeSlotTable";
import { listSports, createTimeSlot, listTimeSlots, updateTimeSlot, deleteTimeSlot } from "../../api/turfAdminApi";

export default function TurfAdminTimeSlotsPage() {
  const [sports, setSports] = useState([]);
  const [selectedSportId, setSelectedSportId] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loadingSports, setLoadingSports] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    listSports().then((res) => {
      setSports(res.data);
      if (res.data.length > 0) setSelectedSportId(res.data[0].id);
      setLoadingSports(false);
    });
  }, []);

  const loadSlots = (sportId) => {
    setLoadingSlots(true);
    listTimeSlots(sportId)
      .then((res) => setSlots(res.data))
      .finally(() => setLoadingSlots(false));
  };

  useEffect(() => {
    if (selectedSportId) loadSlots(selectedSportId);
  }, [selectedSportId]);

  const handleCreate = async (data) => {
    setCreating(true);
    try {
      await createTimeSlot({ ...data, sport_id: selectedSportId });
      loadSlots(selectedSportId);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (slotId) => {
    if (!window.confirm("Delete this time slot?")) return;
    await deleteTimeSlot(slotId);
    loadSlots(selectedSportId);
  };

  const handleToggleActive = async (slot) => {
    await updateTimeSlot(slot.id, { is_active: !slot.is_active });
    loadSlots(selectedSportId);
  };

  if (loadingSports) {
    return (
      <TurfAdminLayout title="Time Slots">
        <Loader label="Loading sports..." />
      </TurfAdminLayout>
    );
  }

  if (sports.length === 0) {
    return (
      <TurfAdminLayout title="Time Slots">
        <EmptyState title="Add a sport first" description="You need at least one sport before configuring time slots." />
      </TurfAdminLayout>
    );
  }

  return (
    <TurfAdminLayout title="Time Slots">
      <div className="mb-5 flex flex-wrap gap-2">
        {sports.map((sport) => (
          <button
            key={sport.id}
            onClick={() => setSelectedSportId(sport.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition-colors ${
              selectedSportId === sport.id ? "bg-qt-green text-white" : "bg-white border border-qt-line text-qt-charcoal hover:bg-qt-mist"
            }`}
          >
            {sport.name}
          </button>
        ))}
      </div>

      {loadingSlots ? (
        <Loader label="Loading time slots..." />
      ) : (
        <TimeSlotTable
          slots={slots}
          onCreate={handleCreate}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
          creating={creating}
        />
      )}
    </TurfAdminLayout>
  );
}
