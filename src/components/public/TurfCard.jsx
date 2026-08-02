/**
 * CHANGED FILE: src/components/public/TurfCard.jsx
 * Changes:
 *  - Shows turf phone number as a payment number badge on the card
 *  - Clicking the phone number copies it to clipboard (doesn't navigate away)
 *  - Address still navigates to Google Maps when google_map_link is set
 */
import React, { useState } from "react";
import { Link } from "react-router-dom";

function CopyPhone({ phone }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`mt-2 flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors ${
        copied
          ? "border-qt-green bg-qt-green/10 text-qt-green-dark"
          : "border-qt-line bg-qt-mist text-qt-charcoal hover:border-qt-green hover:bg-qt-green/5"
      }`}
    >
      <span className="flex items-center gap-2">
        <span className="text-base">💳</span>
        <span>
          <span className="block text-xs font-semibold uppercase tracking-wide text-qt-charcoal/50">
            Payment number
          </span>
          <span className="font-display font-semibold text-qt-navy">{phone}</span>
        </span>
      </span>
      <span className={`text-xs font-semibold ${copied ? "text-qt-green" : "text-qt-charcoal/40"}`}>
        {copied ? "Copied ✓" : "Copy"}
      </span>
    </button>
  );
}