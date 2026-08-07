import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { usePlatformAdminAuth } from "../context/PlatformAdminAuthContext";

export default function ProtectedPlatformAdminRoute() {
  const { isAuthenticated } = usePlatformAdminAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
