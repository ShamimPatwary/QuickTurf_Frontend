import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DarkNavbar from "../../components/common/DarkNavbar";
import DarkFooter from "../../components/common/DarkFooter";
import HeroSection from "../../components/public/HeroSection";

import heroImage from "../../assets/illustrations/hero-night-pitch.svg";
import footballImage from "../../assets/illustrations/sport-football.svg";
import cricketImage from "../../assets/illustrations/sport-cricket.svg";
import turfPitchPhoto from "../../assets/photos/quickturf-turf-pitch.jpg";
import heroFootballTurf from "../../assets/photos/hero-football-turf.webp";
import heroCricketTurf from "../../assets/photos/hero-cricket-turf.webp";
import newsDashboard from "../../assets/illustrations/news-dashboard.svg";
import phoneScreen from "../../assets/photos/phonescreen5.png";

const heroVideo = new URL("../../assets/video/hero.mp4", import.meta.url).href;

const FEATURES = [
  { icon: "clock", title: "Real-Time Booking", text: "See live availability across all venues. Book your slot in 30 seconds. No calls. No waiting." },
  { icon: "share", title: "SharePlay", text: "Split costs instantly with your squad. Everyone pays their share through the app. Fair, fast, hassle-free." },
  { icon: "medal", title: "Tournament Tracking", text: "Join or host tournaments with live fixtures, scores, and standings. Track every match in real-time." },
  { icon: "pulse", title: "Team Management", text: "Organize your squad, manage rosters, and keep everyone aligned, all from one dashboard." },
  { icon: "trophy", title: "Team Rankings", text: "Compete, climb, and see where your team stands. Track wins, stats, and performance." },
  { icon: "calendar", title: "Smart Pricing", text: "Dynamic pricing ensures you get the best rates based on demand and availability." },
  { icon: "ticket", title: "QuickTurf Tickets", text: "Book and manage event tickets for tournaments, matches, and sports experiences." },
  { icon: "sports", title: "Sports Items Marketplace", text: "Shop for sports equipment, gear, and merchandise directly through the app." },
];

const STEPS = [
  { number: "01", title: "Find a turf", text: "Browse football and cricket venues near you." },
  { number: "02", title: "Choose your time", text: "Check availability and select the slot that works." },
  { number: "03", title: "Confirm booking", text: "Secure your game online with clear payment details." },
  { number: "04", title: "Get in the game", text: "Share the booking with your squad and show up ready." },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function SectionHeading({ eyebrow, title, copy, centered = false }) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-qt-green-dark">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-qt-ink sm:text-5xl">{title}</h2>
      {copy && <p className="mt-4 text-base leading-7 text-qt-charcoal/70">{copy}</p>}
    </div>
  );
}

function FeatureIcon({ name }) {
  const paths = {
    clock: <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></>,
    share: <><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" /></>,
    medal: <><path d="m8 3 4 7 4-7M8 3h8" /><circle cx="12" cy="15" r="5" /><path d="m10 15 1.4 1.4L14.5 13" /></>,
    pulse: <path d="M3 12h3l2-7 4 14 2-7h4" />,
    trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3M12 13v4M9 20h6" /></>,
    calendar: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M4 10h16M15 15h3M17 13v4" /></>,
    ticket: <><path d="M5 5h14v4a2 2 0 0 0 0 4v4H5v-4a2 2 0 0 0 0-4V5Z" /><path d="M12 7v2M12 11v2M12 15v2" /></>,
    sports: <><path d="m8 6 8 12M16 6 8 18M5 9h14M5 15h14" /><circle cx="12" cy="12" r="9" /></>,
  };

  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">{paths[name]}</svg>;
}

function AnimatedStat({ target, suffix = "", label, icon }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setHasStarted(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setHasStarted(true),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    const element = ref.current;
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return undefined;

    const duration = 1150;
    const startedAt = performance.now();
    let frameId;

    const update = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [hasStarted, target]);

  const iconClass = {
    green: "bg-qt-green text-white",
    blue: "bg-blue-500 text-white",
    amber: "bg-amber-400 text-white",
    purple: "bg-purple-500 text-white",
  }[icon?.tone];

  return (
    <div ref={ref} className="rounded-2xl bg-white p-6 shadow-card sm:p-7">
      {icon && <span className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl ${iconClass}`}><FeatureIcon name={icon.name} /></span>}
      <p className={`${icon ? "mt-5" : ""} font-display text-3xl font-extrabold tracking-tight text-qt-ink sm:text-4xl`}>
        {value.toLocaleString()}{suffix}
      </p>
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hasStarted ? 0.65 : 0, y: hasStarted ? 0 : 4 }}
        transition={{ delay: 0.25, duration: 0.35 }}
        className="mt-1 text-[11px] font-bold uppercase tracking-wider text-qt-ink"
      >
        {label}
      </motion.p>
    </div>
  );
}

export default function HomePageV2() {
  return (
    <div className="overflow-hidden bg-white font-body">
      <DarkNavbar />

      <motion.div initial="hidden" animate="visible" variants={reveal}>
        <HeroSection
          video={heroVideo}
          poster={heroImage}
          image={heroImage}
          backgroundImages={[heroFootballTurf, heroCricketTurf]}
          eyebrow="QuickTurf booking"
          title="Your game starts here."
          subtitle="Discover nearby turfs, see live slots, and get your next football or cricket match booked without the phone calls."
          ctaLabel="Find a turf"
          ctaTo="/book"
        />
      </motion.div>
            <section className="bg-qt-mist py-20 sm:py-28">
              <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="mx-auto w-full max-w-[600px]">
          <img
          src={phoneScreen}
          alt="QuickTurf"
          className="w-full rounded-3xl border border-white/20 object-contain shadow-2xl"
        />
      </motion.div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-qt-green-dark">QuickTurf community</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight text-qt-ink sm:text-5xl">Growing Bangladesh&apos;s Sports Network <span className="text-qt-green-dark">QuickTurf</span></h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-qt-charcoal/70">With real-time availability, secure payments, and simple booking, we make it easy to focus on what matters—your game.</p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <AnimatedStat target={500} suffix="+" label="Turfs listed" icon={{ name: "ticket", tone: "green" }} />
              <AnimatedStat target={20000} suffix="+" label="Matches booked" icon={{ name: "share", tone: "blue" }} />
              <AnimatedStat target={2} suffix="+" label="Sports supported" icon={{ name: "trophy", tone: "amber" }} />
              <AnimatedStat target={24} suffix="/7" label="Online booking" icon={{ name: "pulse", tone: "purple" }} />
            </div>
          </div>
        </div>
      </section>

      <motion.section className="py-20 sm:py-28" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          <div className="overflow-hidden rounded-[2rem] bg-qt-mist shadow-card">
            <img src={turfPitchPhoto} alt="QuickTurf football pitch" className="h-full min-h-[310px] w-full object-cover" />
          </div>
          <div>
            <SectionHeading
              eyebrow="Play more, plan less"
              title="Sports booking should feel as easy as getting your team together."
              copy="QuickTurf puts live availability, clear pricing, and a simple booking flow in one place—so you can spend less time coordinating and more time playing."
            />
            <Link to="/turfs" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-qt-green-dark transition hover:gap-3">
              Explore all turfs <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section className="bg-qt-forest py-20 sm:py-28" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={reveal}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              <span className="block">Why Players Choose</span>
              <span className="mt-1 block text-center text-qt-green">QuickTurf</span>
            </h2>
            <p className="mt-3 text-sm text-white/55 sm:text-base">One app. Real-time availability. Instant booking. Fair payments. Zero hassle.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {FEATURES.map((feature, index) => (
              <motion.article key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.055 }} whileHover={{ y: -6, scale: 1.01 }} className="min-h-[220px] rounded-2xl bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.13)] sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-qt-mist text-qt-ink"><FeatureIcon name={feature.icon} /></span>
                <h3 className="mt-5 font-display text-lg font-extrabold tracking-tight text-qt-ink">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-qt-charcoal/80">{feature.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="py-20 sm:py-28" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={reveal}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Pick your game" title="The pitch is waiting." copy="Choose your sport, find a venue, and lock in a time." />
            <Link to="/book" className="inline-flex shrink-0 items-center justify-center rounded-full bg-qt-ink px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white transition hover:bg-qt-green-dark">Book a slot</Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { name: "Football", image: footballImage, description: "Five-a-side, seven-a-side, and floodlit evening games." },
              { name: "Cricket", image: cricketImage, description: "Nets and pitches for practice sessions and match days." },
            ].map((sport) => (
              <Link key={sport.name} to={`/book?sport=${sport.name.toLowerCase()}`} className="group relative min-h-[330px] overflow-hidden rounded-[2rem] bg-qt-ink">
                <img src={sport.image} alt={sport.name} className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-qt-ink via-qt-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 sm:p-9">
                  <div><h3 className="font-display text-4xl font-extrabold text-white">{sport.name}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-white/70">{sport.description}</p></div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-qt-green text-xl text-qt-ink transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="bg-qt-ink py-20 sm:py-28" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={reveal}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.22em] text-qt-green">Book in minutes</p><h2 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">From idea to kick-off in four quick steps.</h2><Link to="/book" className="mt-8 inline-flex rounded-full bg-qt-green px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-qt-ink transition hover:bg-white">Start booking</Link></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {STEPS.map((step) => (<article key={step.number} className="rounded-2xl border border-white/10 bg-white/5 p-6"><p className="font-display text-2xl font-extrabold text-qt-green">{step.number}</p><h3 className="mt-8 font-display text-xl font-bold text-white">{step.title}</h3><p className="mt-2 text-sm leading-6 text-white/60">{step.text}</p></article>))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-20 sm:py-28" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
        <div className="mx-auto max-w-7xl px-6"><div className="relative overflow-hidden rounded-[2rem] bg-qt-green px-7 py-14 sm:px-14 sm:py-20"><img src={newsDashboard} alt="" className="pointer-events-none absolute right-0 top-0 h-full w-1/2 object-cover opacity-20 mix-blend-multiply" /><div className="relative max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[0.22em] text-qt-ink/60">For turf owners</p><h2 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight text-qt-ink sm:text-5xl">Turn every open slot into a chance to play.</h2><p className="mt-5 max-w-xl leading-7 text-qt-ink/75">Bring your venue online and manage bookings, time slots, members, and payments from one focused dashboard.</p><Link to="/turf-admin/login" className="mt-8 inline-flex rounded-full bg-qt-ink px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white transition hover:bg-white hover:text-qt-ink">Manage your turf</Link></div></div></div>
      </motion.section>

      <DarkFooter />
    </div>
  );
}
