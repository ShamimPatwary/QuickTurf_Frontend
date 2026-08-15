import React from "react";
import { motion } from "framer-motion";
import DarkNavbar from "../../components/common/DarkNavbar";
import DarkFooter from "../../components/common/DarkFooter";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Navbar */}
      <DarkNavbar />


      {/* Page Content */}
      <main className="flex-1 px-6 pt-32 pb-20">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl"
        >

          <h1 className="text-4xl font-extrabold text-qt-navy">
            About <span className="text-qt-green">QuickTurf</span>
          </h1>


          <p className="mt-6 text-gray-600 leading-relaxed">
            QuickTurf is a modern turf booking platform designed to make
            finding and reserving sports grounds simple and convenient.
            Whether you want to play football, cricket, or other sports,
            QuickTurf helps you discover available turfs and book your
            preferred time slot instantly.
          </p>


          <div className="mt-10 grid gap-6 md:grid-cols-3">

            {[
              [
                "Easy Booking",
                "Reserve your favorite turf in just a few clicks."
              ],
              [
                "Verified Turfs",
                "Connect with trusted turf operators."
              ],
              [
                "Better Experience",
                "Spend less time searching and more time playing."
              ]
            ].map(([title, text]) => (

              <motion.div
                key={title}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md"
              >

                <h3 className="font-bold text-qt-navy">
                  {title}
                </h3>


                <p className="mt-2 text-sm text-gray-500">
                  {text}
                </p>


              </motion.div>

            ))}

          </div>


        </motion.div>

      </main>


      {/* Footer */}
      <DarkFooter />


    </div>
  );
}