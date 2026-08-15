import React from "react";
import { motion } from "framer-motion";
import DarkFooter from "../../components/common/DarkFooter";
import DarkNavbar from "../../components/common/DarkNavbar";

export default function HowItWorks() {

  const steps = [
    [
      "1",
      "Find a Turf",
      "Browse available football, cricket and sports grounds near you."
    ],
    [
      "2",
      "Choose Time",
      "Select your preferred date and available time slot."
    ],
    [
      "3",
      "Book & Play",
      "Confirm your booking and enjoy your game without hassle."
    ]
  ];


  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Navbar */}
      <DarkNavbar />


      {/* Content */}
      <main className="flex-1 px-6 pt-32 pb-20">


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl"
        >


          <h1 className="text-4xl font-extrabold text-qt-navy">
            How <span className="text-qt-green">QuickTurf</span> Works
          </h1>


          <p className="mt-5 max-w-2xl text-gray-600">
            Booking your favorite sports ground is simple.
            Follow these three easy steps and get ready to play.
          </p>



          <div className="mt-10 grid gap-6 md:grid-cols-3">


            {steps.map(([num, title, text]) => (

              <motion.div
                key={num}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md"
              >


                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-qt-green font-bold text-qt-ink">
                  {num}
                </div>


                <h3 className="mt-5 font-bold text-qt-navy">
                  {title}
                </h3>


                <p className="mt-2 text-sm leading-relaxed text-gray-500">
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