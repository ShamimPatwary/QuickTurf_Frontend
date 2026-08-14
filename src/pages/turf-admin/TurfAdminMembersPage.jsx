import React, { useEffect, useState } from "react";
import TurfAdminLayout from "./TurfAdminLayout";
import Loader from "../../components/common/Loader";
import MemberTable from "../../components/turf-admin/MemberTable";
import { listMembers, updateMemberStatus } from "../../api/turfAdminApi";

export default function TurfAdminMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMembers = () => {
    setLoading(true);
    listMembers()
      .then((res) => setMembers(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleApprove = async (member) => {
    await updateMemberStatus(member.id, "active");
    loadMembers();
  };

  const handleReject = async (member) => {
    if (!window.confirm(`Reject membership purchase from ${member.name}?`)) return;
    await updateMemberStatus(member.id, "rejected");
    loadMembers();
  };

  return (
    <TurfAdminLayout title="Memberships - Purchases">
      {loading ? (
        <Loader label="Loading membership purchases..." />
      ) : (
        <MemberTable members={members} onApprove={handleApprove} onReject={handleReject} />
      )}
    </TurfAdminLayout>
  );
}
