import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function DarkFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-qt-ink">

      {/* Background glow */}
      <div className="absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-qt-green/20 blur-3xl" />


      <div className="relative mx-auto max-w-7xl px-6 py-10">


        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:flex-row"
        >

          <div>
            <h3 className="text-xl font-bold text-white">
              Ready to play?
            </h3>

            <p className="mt-1 text-xs text-white/50">
              Find your favorite turf and book your match today.
            </p>
          </div>


          <Link
            to="/book"
            className="rounded-lg bg-qt-green px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-qt-ink transition hover:bg-white hover:scale-105"
          >
            Book a Turf
          </Link>

        </motion.div>



        {/* Footer Content */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">


          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >

            <h2 className="text-xl font-extrabold uppercase text-white">
              Quick<span className="text-qt-green">Turf</span>
            </h2>


            <p className="mt-3 text-xs leading-relaxed text-white/50">
              Your all-in-one turf booking platform.
              Discover, book, and play football, cricket,
              and more.
            </p>


            {/* Social */}
            <div className="mt-4 flex gap-2">

              {[
                {
                  name: "Facebook",
                  url: "https://facebook.com",
                },
                {
                  name: "Instagram",
                  url: "https://instagram.com",
                },
                {
                  name: "X",
                  url: "https://x.com",
                },
              ].map((item) => (

                <motion.a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="rounded-full border border-white/10 px-2.5 py-1.5 text-[11px] text-white/60 transition hover:bg-qt-green hover:text-qt-ink"
                >
                  {item.name}
                </motion.a>

              ))}

            </div>


          </motion.div>




          {/* Players */}
          <FooterColumn
            title="Players"
            links={[
              ["Book Now", "/book"],
              ["Browse Turfs", "/turfs"],
              ["Membership", "/membership"],
            ]}
          />




          {/* Operators */}
          <FooterColumn
            title="Operators"
            links={[
              ["Turf Admin", "/turf-admin/login"],
              ["QuickTurf Admin", "/admin/login"],
            ]}
          />




          {/* Company */}
          <FooterColumn
            title="Company"
            links={[
              ["About Us", "/about"],
              ["How It Works", "/how-it-works"],
              ["Contact Us", "/contact"],
            ]}
          />




          {/* Contact */}
          <div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">
              Contact
            </h4>


            <div className="mt-4 space-y-2 text-xs text-white/60">

              <p>
                📍 Dhaka, Bangladesh
              </p>

              <p>
                ✉ support@quickturf.com
              </p>

              <p>
                ☎ +880 1234-567890
              </p>

            </div>

          </div>


        </div>




        {/* Bottom */}
        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/10 pt-4 text-[11px] text-white/30 sm:flex-row">

          <p>
            © {new Date().getFullYear()} QuickTurf. All rights reserved.
          </p>


          <div className="flex gap-5">

            <Link
              to="/privacy"
              className="hover:text-white"
            >
              Privacy Policy
            </Link>


            <Link
              to="/terms"
              className="hover:text-white"
            >
              Terms
            </Link>

          </div>


        </div>


      </div>

    </footer>
  );
}




function FooterColumn({ title, links }) {

  return (

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >

      <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">
        {title}
      </h4>


      <ul className="mt-4 space-y-2 text-xs text-white/60">

        {links.map(([name, path]) => (

          <li key={path}>

            <Link
              to={path}
              className="inline-block transition hover:translate-x-1 hover:text-white"
            >
              → {name}
            </Link>

          </li>

        ))}

      </ul>


    </motion.div>

  );
}