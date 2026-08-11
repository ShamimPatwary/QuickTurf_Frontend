import React from "react";

export default function SportSelector({
  sports,
  selectedSportId,
  onSelect
}) {
  if (!sports || sports.length === 0) return null;

  return (
    <div
      className="
        flex
        flex-wrap
        gap-2
        sm:gap-2.5
      "
    >

      {sports.map((sport) => {

        const active = sport.id === selectedSportId;

        return (
          <button
            key={sport.id}
            onClick={() => onSelect(sport.id)}
            className={`
              rounded-full
              px-3
              sm:px-4
              py-1.5
              sm:py-2
              text-xs
              sm:text-sm
              font-semibold
              capitalize
              transition-colors
              whitespace-nowrap

              ${
                active
                  ? "bg-qt-green text-white"
                  : "bg-qt-mist text-qt-charcoal hover:bg-qt-line"
              }
            `}
          >
            {sport.name}
          </button>
        );

      })}

    </div>
  );
}