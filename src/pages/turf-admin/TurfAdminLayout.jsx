/**
 * CHANGED FILE: src/pages/turf-admin/TurfAdminLayout.jsx
 * Changes:
 *  - On mount, calls GET /api/turf-admin/my-turf to fetch the turf's
 *    name and first image (used as logo).
 *  - The sidebar header now shows the turf logo (if available) and
 *    turf name instead of the generic "QuickTurf / Turf Admin" text.
 *  - Falls back gracefully when the image isn't set yet.
 */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTurfAdminAuth } from "../../context/TurfAdminAuthContext";
import { getMyTurf } from "../../api/turfAdminApi";

const navItems = [
  { to: "/turf-admin/dashboard",   label: "Dashboard" },
  { to: "/turf-admin/sports",      label: "Sports" },
  { to: "/turf-admin/time-slots",  label: "Time Slots" },
  { to: "/turf-admin/packages",    label: "Packages" },
  { to: "/turf-admin/memberships", label: "Memberships" },
  { to: "/turf-admin/members",     label: "Members" },
  { to: "/turf-admin/bookings",    label: "Bookings" },
  { to: "/turf-admin/settings",    label: "Settings" },
];

export default function TurfAdminLayout({ children, title }) {
  const { logout } = useTurfAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [turf, setTurf] = useState(null);

  useEffect(() => {
    getMyTurf()
      .then((res) => setTurf(res.data))
      .catch(() => {}); // silently ignore if the call fails
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/turf-admin/login");
  };