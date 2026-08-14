import React from "react";

export default function StatTicker({ stats }) {
  return (
    <section className="border-y border-white/10 bg-qt-ink-light">

      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
          py-8
          sm:py-10
        "
      >

        <div
          className="
            grid
            grid-cols-2
            gap-6
            sm:gap-8
            lg:grid-cols-4
          "
        >

          {stats.map((stat, i) => (

            <div
              key={i}
              className="
                text-center
                sm:text-left
              "
            >

              <p
                className="
                  font-display
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  font-extrabold
                  italic
                  leading-none
                  text-white
                "
              >
                {stat.value}
              </p>


              <p
                className="
                  mt-1
                  text-[10px]
                  sm:text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-white/40
                "
              >
                {stat.label}
              </p>


            </div>

          ))}

        </div>

      </div>

    </section>
  );
}