import React from "react";
import { Link } from "react-router-dom";

export default function SportCategoryGrid({ sports }) {
  return (
    <section className="bg-white py-10 sm:py-16">

      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >

        <h2
          className="
            font-display
            text-xl
            sm:text-2xl
            lg:text-3xl
            font-extrabold
            uppercase
            italic
            tracking-tight
            text-qt-ink
          "
        >
          Choose your sport
        </h2>



        <div
          className="
            mt-6
            sm:mt-8
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
            sm:gap-5
          "
        >

          {sports.map((sport) => (

            <Link
              key={sport.name}
              to={`/book?sport=${sport.name.toLowerCase()}`}
              className="
                group
                relative
                h-48
                sm:h-56
                lg:h-64
                overflow-hidden
                rounded-lg
                bg-qt-navy
              "
            >

              {sport.image ? (

                <img
                  src={sport.image}
                  alt={sport.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    opacity-60
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />

              ) : (

                <div
                  className="
                    h-full
                    w-full
                    opacity-80
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                  style={{
                    background:
                      sport.gradient ||
                      "linear-gradient(135deg, #3CA458 0%, #16225C 100%)",
                  }}
                />

              )}



              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-qt-navy
                  via-qt-navy/30
                  to-transparent
                "
              />



              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-3
                  p-4
                  sm:p-5
                "
              >

                <h3
                  className="
                    font-display
                    text-lg
                    sm:text-xl
                    font-bold
                    uppercase
                    italic
                    text-white
                    truncate
                  "
                >
                  {sport.name}
                </h3>



                <span
                  className="
                    flex
                    h-8
                    w-8
                    sm:h-9
                    sm:w-9
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-qt-green
                    text-sm
                    sm:text-base
                    text-qt-ink
                    transition-transform
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>


              </div>


            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}