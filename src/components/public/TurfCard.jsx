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
      className={`
        mt-2
        flex
        w-full
        items-center
        justify-between
        gap-2
        rounded-lg
        border
        px-3
        py-2
        text-xs
        sm:text-sm
        transition-colors

        ${
          copied
            ? "border-qt-green bg-qt-green/10 text-qt-green-dark"
            : "border-qt-line bg-qt-mist text-qt-charcoal hover:border-qt-green hover:bg-qt-green/5"
        }
      `}
    >

      <span className="flex items-center gap-2 min-w-0">

        <span className="text-sm sm:text-base">
          💳
        </span>


        <span className="min-w-0">

          <span
            className="
              block
              text-[10px]
              sm:text-xs
              font-semibold
              uppercase
              tracking-wide
              text-qt-charcoal/50
            "
          >
            Payment number
          </span>


          <span
            className="
              block
              truncate
              font-display
              text-sm
              sm:text-base
              font-semibold
              text-qt-navy
            "
          >
            {phone}
          </span>

        </span>

      </span>


      <span
        className={`
          flex-shrink-0
          text-[10px]
          sm:text-xs
          font-semibold
          ${
            copied
              ? "text-qt-green"
              : "text-qt-charcoal/40"
          }
        `}
      >
        {copied ? "Copied ✓" : "Copy"}
      </span>


    </button>
  );
}



export default function TurfCard({ turf }) {

  const image =
    turf.images && turf.images.length > 0
      ? turf.images[0].image_url
      : null;


  return (
    <Link
      to={`/turfs/${turf.id}`}
      className="
        group
        flex
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-qt-line
        bg-white
        shadow-card
        transition
        hover:-translate-y-0.5
        hover:shadow-lg
      "
    >

      {/* Image */}
      <div
        className="
          h-36
          sm:h-40
          w-full
          flex-shrink-0
          bg-qt-mist
        "
      >

        {image ? (

          <img
            src={image}
            alt={turf.name}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />

        ) : (

          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              text-xl
              sm:text-2xl
              font-display
              font-bold
              text-qt-navy/30
            "
          >
            QT
          </div>

        )}

      </div>



      {/* Content */}
      <div
        className="
          flex
          flex-1
          flex-col
          gap-2
          p-3
          sm:p-4
        "
      >

        <h3
          className="
            font-display
            text-sm
            sm:text-base
            font-semibold
            text-qt-navy
            group-hover:text-qt-green
            transition-colors
          "
        >
          {turf.name}
        </h3>



        {turf.details && (
          <p
            className="
              line-clamp-2
              text-xs
              sm:text-sm
              leading-relaxed
              text-qt-charcoal/60
            "
          >
            {turf.details}
          </p>
        )}




        {/* Address */}
        {turf.google_map_link ? (

          <a
            href={turf.google_map_link}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="
              flex
              items-start
              gap-1
              text-xs
              font-medium
              text-qt-green
              hover:underline
              leading-relaxed
            "
          >
            📍 {turf.address}
          </a>

        ) : (

          <p
            className="
              text-xs
              leading-relaxed
              text-qt-charcoal/50
            "
          >
            {turf.address}
          </p>

        )}




        {/* Payment number */}
        {turf.phone && (
          <CopyPhone phone={turf.phone} />
        )}


      </div>

    </Link>
  );
}