import React, { useRef } from "react";

export default function NewsCardRow({ title, items }) {
  const scrollRef = useRef(null);

  const scrollBy = (amount) => {
    scrollRef.current?.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-qt-ink py-10 sm:py-14">

      <div className="
        mx-auto
        max-w-7xl
        px-4
        sm:px-6
        lg:px-8
      ">

        <div className="
          flex
          items-center
          justify-between
          gap-4
        ">

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
              text-white
            "
          >
            {title}
          </h2>


          <div className="
            hidden
            gap-2
            sm:flex
          ">

            <button
              onClick={() => scrollBy(-360)}
              aria-label="Scroll left"
              className="
                flex
                h-9
                w-9
                sm:h-10
                sm:w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                text-white
                hover:bg-white/10
                transition-colors
              "
            >
              ←
            </button>


            <button
              onClick={() => scrollBy(360)}
              aria-label="Scroll right"
              className="
                flex
                h-9
                w-9
                sm:h-10
                sm:w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                text-white
                hover:bg-white/10
                transition-colors
              "
            >
              →
            </button>

          </div>

        </div>



        <div
          ref={scrollRef}
          className="
            mt-5
            sm:mt-6
            flex
            gap-4
            sm:gap-5
            overflow-x-auto
            pb-3
            scrollbar-hide
            snap-x
            snap-mandatory
          "
          style={{
            scrollbarWidth: "none",
          }}
        >

          {items.map((item, i) => (

            <article
              key={i}
              className="
                group
                relative
                h-72
                sm:h-80
                w-[260px]
                sm:w-72
                md:w-80
                flex-shrink-0
                snap-start
                overflow-hidden
                rounded-lg
                bg-qt-ink-light
              "
            >

              {item.image ? (

                <img
                  src={item.image}
                  alt=""
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
                    h-full
                    w-full
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                  style={{
                    background:
                      item.gradient ||
                      "linear-gradient(135deg, #16225C 0%, #0A0E1F 100%)",
                  }}
                />

              )}



              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-qt-ink
                  via-qt-ink/20
                  to-transparent
                "
              />



              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  p-4
                  sm:p-5
                "
              >

                <span
                  className="
                    text-[10px]
                    sm:text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-qt-green
                  "
                >
                  {item.tag}
                </span>


                <h3
                  className="
                    mt-1.5
                    sm:mt-2
                    font-display
                    text-base
                    sm:text-lg
                    font-bold
                    leading-tight
                    text-white
                  "
                >
                  {item.heading}
                </h3>

              </div>


            </article>

          ))}

        </div>

      </div>

    </section>
  );
}