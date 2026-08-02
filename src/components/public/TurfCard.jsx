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

export default function TurfCard({ turf }) {
  const image = turf.images && turf.images.length > 0 ? turf.images[0].image_url : null;

  return (
    <Link
      to={`/turfs/${turf.id}`}
      className="group overflow-hidden rounded-xl border border-qt-line bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lg flex flex-col"
    >
      {/* Image */}
      <div className="h-40 w-full bg-qt-mist flex-shrink-0">
        {image ? (
          <img src={image} alt={turf.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-qt-navy/30 font-display font-bold text-2xl">
            QT
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-display font-semibold text-qt-navy group-hover:text-qt-green transition-colors">
          {turf.name}
        </h3>

        {turf.details && (
          <p className="line-clamp-2 text-sm text-qt-charcoal/60">{turf.details}</p>
        )}

        {/* Address — opens Google Maps */}
        {turf.google_map_link ? (
          <a
            href={turf.google_map_link}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs font-medium text-qt-green hover:underline"
          >
            📍 {turf.address}
          </a>
        ) : (
          <p className="text-xs text-qt-charcoal/50">{turf.address}</p>
        )}

        {/* Payment number — copies to clipboard */}
        {turf.phone && <CopyPhone phone={turf.phone} />}
      </div>
    </Link>
  );
}
