import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePlatformAdminAuth } from "../../context/PlatformAdminAuthContext";

const navItems = [
  { to: "/admin/turfs", label: "Turfs" },
  { to: "/admin/bookings", label: "Bookings" },
];

export default function PlatformAdminLayout({ children, title }) {
  const { logout } = usePlatformAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

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

      <main className="flex-1 px-6 py-8 sm:px-10">
        <h1 className="font-display text-2xl font-bold text-qt-navy">{title}</h1>
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}
