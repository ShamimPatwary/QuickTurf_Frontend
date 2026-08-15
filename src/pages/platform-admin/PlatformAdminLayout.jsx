import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePlatformAdminAuth } from "../../context/PlatformAdminAuthContext";

const navItems = [
  { to: "/admin/turfs", label: "Turfs" },
  { to: "/admin/bookings", label: "Bookings" },
  { to: "/admin/messages", label: "Messages" },
];

// Precise active matching for the nav items.
const isActive = (pathname, to) =>
  pathname === to || pathname.startsWith(to + "/");

export default function PlatformAdminLayout({ children, title }) {
  const { logout } = usePlatformAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const activeNavRef = useRef(null);

  // Keep the active (highlighted) item visible in the horizontally
  // scrollable mobile nav bar instead of letting it reset to the start.
  useEffect(() => {
    if (activeNavRef.current) {
      activeNavRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

return (
    <div className="flex min-h-screen bg-qt-mist">
      <aside className="hidden w-60 flex-col border-r border-qt-line bg-white sm:flex">
        <div className="px-6 py-5">
          <span className="font-display text-lg font-bold text-qt-navy">QuickTurf</span>
          <p className="text-xs text-qt-charcoal/50">Platform Admin</p>
        </div>
        <nav className="flex-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`mb-1 block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                location.pathname.startsWith(item.to)
                  ? "bg-qt-navy text-white"
                  : "text-qt-charcoal hover:bg-qt-mist"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button onClick={handleLogout} className="mx-3 mb-5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-qt-red hover:bg-qt-red/10">
          Log out
        </button>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between border-b border-qt-line bg-white px-4 py-3 sm:hidden">
        <Link to="/admin/turfs" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-qt-navy">
            <span className="h-3 w-3 rounded-sm bg-qt-green" />
          </span>
          <span className="font-display text-sm font-bold text-qt-navy">QuickTurf</span>
        </Link>
        <button onClick={handleLogout} className="text-xs font-medium text-qt-red">
          Log out
        </button>
      </div>

{/* Mobile nav links */}
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
                  ? "bg-qt-navy text-white"
                  : "text-qt-charcoal hover:bg-qt-mist"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <main className="flex-1 px-6 py-8 pt-28 sm:px-10 sm:pt-8">
        <h1 className="font-display text-2xl font-bold text-qt-navy">{title}</h1>
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}
