import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-qt-line bg-qt-mist">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-qt-charcoal/60 sm:flex-row">
        <p>© {new Date().getFullYear()} QuickTurf. Book your turf in minutes.</p>
        <p>Football · Cricket · and more</p>
      </div>
    </footer>
  );
}
