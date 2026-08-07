import React, { useEffect, useState } from "react";
import TurfAdminLayout from "./TurfAdminLayout";
import Loader from "../../components/common/Loader";
import MembershipTable from "../../components/turf-admin/MembershipTable";
import { createMembership, listMemberships, deleteMembership, listSports } from "../../api/turfAdminApi";

export default function TurfAdminMembershipsPage() {
  const [memberships, setMemberships] = useState([]);
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const loadMemberships = () => {
    setLoading(true);
    Promise.all([listMemberships(), listSports()])
      .then(([membershipsRes, sportsRes]) => {
        setMemberships(membershipsRes.data);
        setSports(sportsRes.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMemberships();
  }, []);

  const handleCreate = async (data) => {
    setCreating(true);
    try {
      await createMembership(data);
      loadMemberships();
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (membershipId) => {
    if (!window.confirm("Delete this membership?")) return;
    await deleteMembership(membershipId);
    loadMemberships();
  };

  return (
    <TurfAdminLayout title="Memberships">
      {loading ? <Loader label="Loading memberships..." /> : (
        <MembershipTable memberships={memberships} sports={sports} onCreate={handleCreate} onDelete={handleDelete} creating={creating} />
      )}
    </TurfAdminLayout>
  );
}
