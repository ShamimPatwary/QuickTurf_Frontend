import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useTurfAdminAuth } from "../context/TurfAdminAuthContext";

export default function ProtectedTurfAdminRoute() {
  const { isAuthenticated } = useTurfAdminAuth();
  if (!isAuthenticated) return <Navigate to="/turf-admin/login" replace />;
  return <Outlet />;
}
