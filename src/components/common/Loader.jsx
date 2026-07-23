import React from "react";

export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-qt-charcoal/70">
      <div className="h-8 w-8 rounded-full border-3 border-qt-line border-t-qt-green animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
