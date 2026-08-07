import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HeroSection({
  video,
  poster,
  image,
  backgroundImages = [],
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaTo
}) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [activeBackground, setActiveBackground] = useState(0);

  const showVideo = video && !videoFailed;
  const showBackgroundSlideshow = backgroundImages.length > 0;

  useEffect(() => {
    if (backgroundImages.length < 2) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveBackground(
        (current) => (current + 1) % backgroundImages.length
      );
    }, 5500);

    return () => window.clearInterval(intervalId);
  }, [backgroundImages.length]);


  return (
    <section
      className="
        relative
        flex
        min-h-[560px]
        h-[85vh]
        sm:h-[90vh]
        lg:h-[92vh]
        w-full
        items-end
        overflow-hidden
        bg-qt-ink
      "
    >

      {showBackgroundSlideshow ? (
        backgroundImages.map((background, index) => (
          <img
            key={background}
            src={background}
            alt=""
            className={`
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-opacity
              duration-1000
              ${
                activeBackground === index
                  ? "opacity-80"
                  : "opacity-0"
              }
            `}
          />
        ))

      ) : showVideo ? (

        <video
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            opacity-70
          "
          autoPlay
          muted
          loop
          playsInline
          poster={poster || image || undefined}
          onError={() => setVideoFailed(true)}
        >
          <source src={video} type="video/mp4" />
        </video>

      ) : image ? (

        <img
          src={image}
          alt=""
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            opacity-70
          "
        />

      ) : (

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_30%_20%,#1b2a6b_0%,#0A0E1F_70%)]
          "
        />

      )}


      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-qt-ink
          via-qt-ink/50
          to-qt-ink/10
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-qt-ink/70
          via-transparent
          to-transparent
        "
      />



      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
          pb-10
          sm:pb-16
          lg:pb-24
        "
      >

        <span
          className="
            inline-flex
            items-center
            gap-2
            rounded-sm
            bg-qt-green
            px-3
            py-1.5
            text-[10px]
            sm:text-xs
            font-bold
            uppercase
            tracking-wider
            text-qt-ink
          "
        >
          {eyebrow}
        </span>



        <h1
          className="
            mt-4
            sm:mt-5
            max-w-3xl
            font-display
            text-3xl
            sm:text-5xl
            lg:text-7xl
            font-extrabold
            uppercase
            italic
            leading-[0.95]
            tracking-tight
            text-white
          "
        >
          {title}
        </h1>



        <p
          className="
            mt-4
            sm:mt-5
            max-w-lg
            text-sm
            sm:text-base
            lg:text-lg
            leading-relaxed
            text-white/70
          "
        >
          {subtitle}
        </p>



        <Link
          to={ctaTo}
          className="
            mt-6
            sm:mt-8
            inline-flex
            items-center
            gap-2
            rounded-sm
            bg-white
            px-5
            sm:px-7
            py-3
            sm:py-3.5
            text-xs
            sm:text-sm
            font-bold
            uppercase
            tracking-wider
            text-qt-ink
            transition-colors
            hover:bg-qt-green
          "
        >
          {ctaLabel}
          <span aria-hidden>
            →
          </span>
        </Link>


      </div>

    </section>
  );
}