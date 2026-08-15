import React, { useEffect, useState } from "react";
import TurfAdminLayout from "./TurfAdminLayout";
import Loader from "../../components/common/Loader";
import SportTable from "../../components/turf-admin/SportTable";
import { createSport, listSports, deleteSport } from "../../api/turfAdminApi";

export default function TurfAdminSportsPage() {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const loadSports = () => {
    setLoading(true);
    listSports()
      .then((res) => setSports(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSports();
  }, []);

  const handleCreate = async (name) => {
    setCreating(true);
    try {
      await createSport(name);
      loadSports();
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (sportId) => {
    if (!window.confirm("Delete this sport? Its time slots will also be removed.")) return;
    await deleteSport(sportId);
    loadSports();
  };

  return (
    <TurfAdminLayout title="Sports">
      {loading ? <Loader label="Loading sports..." /> : (
        <SportTable sports={sports} onCreate={handleCreate} onDelete={handleDelete} creating={creating} />
      )}
    </TurfAdminLayout>
  );
}
