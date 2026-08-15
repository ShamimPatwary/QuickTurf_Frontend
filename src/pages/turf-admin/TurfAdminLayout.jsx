/**
 * CHANGED FILE: src/pages/turf-admin/TurfAdminLayout.jsx
 * Changes:
 *  - On mount, calls GET /api/turf-admin/my-turf to fetch the turf's
 *    name and first image (used as logo).
 *  - The sidebar header now shows the turf logo (if available) and
 *    turf name instead of the generic "QuickTurf / Turf Admin" text.
 *  - Falls back gracefully when the image isn't set yet.
 */
import React, { useEffect, useRef, useState } from "react";
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

// Precise active matching so that e.g. /turf-admin/members is NOT treated as
// active when we are on /turf-admin/memberships (and vice-versa).
const isActive = (pathname, to) =>
  pathname === to || pathname.startsWith(to + "/");

export default function TurfAdminLayout({ children, title }) {
  const { logout } = useTurfAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [turf, setTurf] = useState(null);
  const activeNavRef = useRef(null);

  useEffect(() => {
    getMyTurf()
      .then((res) => setTurf(res.data))
      .catch(() => {}); // silently ignore if the call fails
  }, []);

  // Keep the active (highlighted) item visible in the horizontally
  // scrollable mobile nav bar instead of letting it reset to the start.
  useEffect(() => {
    if (activeNavRef.current) {
      activeNavRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [location.pathname]);

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

{/* ── Mobile top bar (turf name only, no sidebar) ─────────── */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between border-b border-qt-line bg-white px-4 py-3 sm:hidden">
        <div className="flex items-center gap-2 min-w-0">
          {logoUrl ? (
            <img src={logoUrl} alt="" className="h-8 w-8 rounded-md object-cover border border-qt-line flex-shrink-0" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-qt-navy text-white text-xs font-bold flex-shrink-0">
              {turf?.name?.[0]?.toUpperCase() ?? "T"}
            </div>
          )}
          <span className="font-display text-sm font-bold text-qt-navy truncate">
            {turf?.name ?? "Turf Admin"}
          </span>
        </div>
        <button onClick={handleLogout} className="text-xs font-medium text-qt-red whitespace-nowrap">
          Log out
        </button>
      </div>

      {/* ── Mobile nav links ────────────────────────────────────── */}
<div className="fixed top-14 left-0 right-0 z-30 flex items-center gap-2 overflow-x-auto border-b border-qt-line bg-white px-4 py-2 sm:hidden">
        {navItems.map((item) => {
          const active = isActive(location.pathname, item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              ref={active ? activeNavRef : null}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "bg-qt-green text-white"
                  : "text-qt-charcoal hover:bg-qt-mist"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* ── Main content ────────────────────────────────────────── */}
      <main className="flex-1 px-6 py-8 pt-28 sm:pt-8 sm:px-10">
        <h1 className="font-display text-2xl font-bold text-qt-navy">{title}</h1>
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}
