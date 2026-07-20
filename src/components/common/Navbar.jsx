import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-qt-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-qt-navy">
            <span className="h-3 w-3 rounded-sm bg-qt-green" />
          </span>
          <span className="font-display text-lg font-bold text-qt-navy">QuickTurf</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-qt-charcoal">
          <Link to="/book" className="hover:text-qt-green transition-colors">
            Book Now
          </Link>
          <Link to="/turf-admin/login" className="hover:text-qt-green transition-colors">
            Turf Admin
          </Link>
          <Link
            to="/admin/login"
            className="rounded-lg bg-qt-navy px-4 py-2 text-white hover:bg-qt-navy-light transition-colors"
          >
            QuickTurf Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
