import React from "react";

const formatTime = (time) => {
  if (!time) return "";

  const [hour, minute] = time.split(":");
  const h = Number(hour);

  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;

  return `${hour12}:${minute} ${period}`;
};

export default function SlotPicker({
  slots,
  selectedSlotId,
  onSelect
}) {
  if (!slots || slots.length === 0) {
    return (
      <div
        className="
          rounded-xl
          border
          border-dashed
          border-qt-line
          bg-qt-mist
          py-8
          sm:py-10
          text-center
          px-4
          text-xs
          sm:text-sm
          text-qt-charcoal/50
        "
      >
        No slots configured for this sport yet.
      </div>
    );
  }

  return (
    <div
      className="
        rounded-xl
        bg-qt-navy
        p-3
        sm:p-4
      "
    >

      <div
        className="
          grid
          grid-cols-2
          xs:grid-cols-3
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-2
          sm:gap-2.5
        "
      >

        {slots.map((slot) => {

          const isSelected = slot.id === selectedSlotId;
          const isBooked = slot.is_booked;


          return (
            <button
              key={slot.id}
              disabled={isBooked}
              onClick={() => onSelect(slot.id)}
              className={`
                flex
                flex-col
                items-start
                gap-1
                rounded-lg
                border
                px-2.5
                sm:px-3
                py-2
                sm:py-2.5
                font-mono
                transition-colors
                min-h-[60px]

                ${
                  isBooked
                    ? "cursor-not-allowed border-qt-red/30 bg-qt-red/10 text-qt-red/70"
                    : isSelected
                    ? "border-qt-green bg-qt-green text-white"
                    : "border-white/10 bg-white/5 text-white hover:border-qt-green hover:bg-white/10"
                }
              `}
            >

              <span
                className="
                  text-xs
                  sm:text-sm
                  font-semibold
                  tracking-wide
                  leading-tight
                "
              >
                {formatTime(slot.start_time)}
                {" – "}
                {formatTime(slot.end_time)}
              </span>


              <span
                className={`
                  text-[11px]
                  sm:text-xs
                  ${
                    isBooked
                      ? ""
                      : isSelected
                      ? "text-white/80"
                      : "text-white/50"
                  }
                `}
              >
                {isBooked ? "BOOKED" : `৳${slot.price}`}
              </span>


            </button>
          );
        })}

      </div>



      <div
        className="
          mt-4
          flex
          flex-wrap
          gap-x-4
          gap-y-2
          text-[11px]
          sm:text-xs
          text-white/50
        "
      >

        <span className="flex items-center gap-1.5">
          <span
            className="
              h-2.5
              w-2.5
              rounded-sm
              bg-white/10
              border
              border-white/20
            "
          />
          Available
        </span>


        <span className="flex items-center gap-1.5">
          <span
            className="
              h-2.5
              w-2.5
              rounded-sm
              bg-qt-green
            "
          />
          Selected
        </span>


        <span className="flex items-center gap-1.5">
          <span
            className="
              h-2.5
              w-2.5
              rounded-sm
              bg-qt-red/30
            "
          />
          Booked
        </span>


      </div>

    </div>
  );
}