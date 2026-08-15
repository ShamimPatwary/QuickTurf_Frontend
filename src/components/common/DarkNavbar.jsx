import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function DarkNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const isHomePage = location.pathname === "/";

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const darkNavbar = isHomePage && !scrolled;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-qt-ink/95 backdrop-blur border-b border-white/10 shadow-lg"
          : isHomePage
          ? "bg-gradient-to-b from-qt-ink/80 to-transparent"
          : "bg-white border-b border-gray-200 shadow-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6 py-5">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <Link
            to="/"
            className={`text-xl font-bold uppercase tracking-wider ${
              darkNavbar || scrolled
                ? "text-white"
                : "text-qt-navy"
            }`}
          >
            Quick<span className="text-qt-green">Turf</span>
          </Link>
        </motion.div>

        {/* Navigation (desktop) */}
        <nav
          className={`ml-auto hidden items-center gap-10 text-xs font-bold uppercase tracking-wider lg:flex ${
            darkNavbar || scrolled
              ? "text-white/70"
              : "text-qt-navy/70"
          }`}
        >
          <motion.div whileHover={{ y: -2 }}>
            <Link to="/turfs" className="transition-colors hover:text-qt-green">
              Turfs
            </Link>
          </motion.div>
        </nav>

        {/* Book Now Button (desktop) */}
        <motion.div
          className="ml-10 hidden sm:block"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/book"
            className="
              rounded-sm
              bg-qt-green
              px-5
              py-2.5
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-qt-ink
              transition
              hover:bg-white
            "
          >
            Book Now
          </Link>
        </motion.div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className={`ml-auto flex h-10 w-10 items-center justify-center rounded-md lg:hidden ${
            darkNavbar || scrolled
              ? "text-white hover:bg-white/10"
              : "text-qt-navy hover:bg-qt-mist"
          }`}
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="h-6 w-6">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="h-6 w-6">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className={`overflow-hidden border-t lg:hidden ${
              darkNavbar || scrolled
                ? "border-white/10 bg-qt-ink/95 backdrop-blur"
                : "border-qt-line bg-white"
            }`}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
              <Link
                to="/turfs"
                className={`rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                  darkNavbar || scrolled
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-qt-navy hover:bg-qt-mist"
                }`}
              >
                Turfs
              </Link>
              <Link
                to="/book"
                className={`rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                  darkNavbar || scrolled
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-qt-navy hover:bg-qt-mist"
                }`}
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
