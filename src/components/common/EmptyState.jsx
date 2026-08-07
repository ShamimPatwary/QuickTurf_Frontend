import React from "react";

export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-qt-line py-14 text-center">
      <h3 className="font-display font-semibold text-qt-navy">{title}</h3>
      {description && <p className="max-w-sm text-sm text-qt-charcoal/60">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
