import React from "react";

export default function Modal({ open, onClose, title, children, widthClass = "max-w-md" }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-qt-navy/40 backdrop-blur-sm p-4">
      <div className={`w-full ${widthClass} rounded-xl bg-white shadow-xl border border-qt-line`}>
        <div className="flex items-center justify-between border-b border-qt-line px-5 py-4">
          <h3 className="font-display font-semibold text-qt-navy">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-qt-charcoal transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
