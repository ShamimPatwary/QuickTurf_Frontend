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

   const logoUrl = turf?.images?.[0]?.image_url ?? null;

  return (
    <div className="flex min-h-screen bg-qt-mist">
      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className="hidden w-60 flex-col border-r border-qt-line bg-white sm:flex">

        {/* Turf identity block */}
        <div className="flex items-center gap-3 border-b border-qt-line px-4 py-4">
          {/* Logo / avatar */}
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={turf?.name ?? "Turf logo"}
              className="h-10 w-10 rounded-lg object-cover flex-shrink-0 border border-qt-line"
            />
          ) : (
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-qt-navy text-white text-sm font-bold">
              {turf?.name?.[0]?.toUpperCase() ?? "T"}
            </div>
          )}

          {/* Turf name */}
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold text-qt-navy leading-tight">
              {turf?.name ?? "Loading…"}
            </p>
            <p className="text-xs text-qt-charcoal/50">Turf Admin</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 pt-3">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`mb-1 block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                location.pathname == item.to
                  ? "bg-qt-green text-white"
                  : "text-qt-charcoal hover:bg-qt-mist"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mx-3 mb-5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-qt-red hover:bg-qt-red/10"
        >
          Log out
        </button>
      </aside>
