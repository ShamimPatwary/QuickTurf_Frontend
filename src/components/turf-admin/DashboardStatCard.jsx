import React from "react";

export default function DashboardStatCard({
  label,
  value,
  accent = "navy"
}) {

  const accents = {
    navy: "text-qt-navy",
    green: "text-qt-green",
    red: "text-qt-red",
  };


  return (
    <div
      className="
        rounded-xl
        border
        border-qt-line
        bg-white
        p-4
        sm:p-5
        shadow-card
      "
    >

      <p
        className="
          text-[10px]
          sm:text-xs
          font-medium
          uppercase
          tracking-wide
          text-qt-charcoal/50
          truncate
        "
      >
        {label}
      </p>


      <p
        className={`
          mt-1.5
          sm:mt-2
          font-display
          text-xl
          sm:text-2xl
          font-bold
          ${accents[accent]}
        `}
      >
        {value}
      </p>


    </div>
  );
}