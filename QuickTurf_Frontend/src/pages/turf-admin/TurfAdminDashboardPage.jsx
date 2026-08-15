import React, { useEffect, useState } from "react";
import TurfAdminLayout from "./TurfAdminLayout";
import Loader from "../../components/common/Loader";
import DashboardStatCard from "../../components/turf-admin/DashboardStatCard";
import DashboardCharts from "../../components/turf-admin/DashboardCharts";
import { getDashboardStats } from "../../api/turfAdminApi";

export default function TurfAdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) {
    return (
      <TurfAdminLayout title="Dashboard">
        <Loader label="Loading dashboard..." />
      </TurfAdminLayout>
    );
  }

  return (
    <TurfAdminLayout title="Dashboard">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <DashboardStatCard label="Total matches" value={stats.total_matches} />
        <DashboardStatCard label="Upcoming" value={stats.upcoming_matches} accent="navy" />
        <DashboardStatCard label="Completed" value={stats.completed_matches} accent="green" />
        <DashboardStatCard label="Cancelled" value={stats.cancelled_matches} accent="red" />

        <DashboardStatCard label="Total match amount" value={`৳${stats.total_match_amount}`} />
        <DashboardStatCard label="Paid amount" value={`৳${stats.paid_amount}`} accent="green" />
        <DashboardStatCard label="Due amount" value={`৳${stats.due_amount}`} accent="red" />
        <DashboardStatCard label="Total revenue" value={`৳${stats.total_revenue}`} accent="green" />

        <DashboardStatCard label="Payment: paid" value={stats.payment_paid} accent="green" />
        <DashboardStatCard label="Payment: partial" value={stats.payment_partial} accent="navy" />
        <DashboardStatCard label="Payment: pending" value={stats.payment_pending} accent="red" />

        <DashboardStatCard label="Membership discount given" value={`৳${stats.total_discount_given}`} accent="green" />
        <DashboardStatCard label="Active members" value={stats.active_members} accent="green" />
        <DashboardStatCard label="Pending member approvals" value={stats.pending_members} accent="red" />
      </div>

      <div className="mt-8">
        <DashboardCharts stats={stats} />
      </div>
    </TurfAdminLayout>
  );
}
