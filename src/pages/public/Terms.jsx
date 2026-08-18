import React from "react";
import DarkFooter from "../../components/common/DarkFooter";
import DarkNavbar from "../../components/common/DarkNavbar";


export default function Terms() {

  return (

    <div className="min-h-screen flex flex-col bg-white">


      {/* Navbar */}
      <DarkNavbar />



      {/* Content */}
      <main className="flex-1 px-6 pt-32 pb-20">


        <div className="mx-auto max-w-4xl">


          <h1 className="text-4xl font-extrabold text-qt-navy">
            Terms & <span className="text-qt-green">Conditions</span>
          </h1>



          <p className="mt-5 text-gray-600">
            Please read these terms carefully before using QuickTurf.
            By accessing our platform, you agree to follow these terms.
          </p>




          <div className="mt-10 space-y-6 text-gray-600">



            <section>

              <h2 className="text-xl font-bold text-qt-navy">
                1. Use of Platform
              </h2>

              <p className="mt-2 leading-relaxed">
                QuickTurf provides a platform for users to discover
                sports grounds and make turf bookings. Users must use
                the platform responsibly and follow all guidelines.
              </p>

            </section>





            <section>

              <h2 className="text-xl font-bold text-qt-navy">
                2. Account Information
              </h2>

              <p className="mt-2 leading-relaxed">
                Users are responsible for providing accurate and
                up-to-date information during registration and booking.
                Account details should not be shared with others.
              </p>

            </section>





            <section>

              <h2 className="text-xl font-bold text-qt-navy">
                3. Booking Policy
              </h2>

              <p className="mt-2 leading-relaxed">
                All bookings depend on turf availability and operator
                policies. Users should verify booking details before
                confirming reservations.
              </p>

            </section>





            <section>

              <h2 className="text-xl font-bold text-qt-navy">
                4. Payments & Refunds
              </h2>

              <p className="mt-2 leading-relaxed">
                Payments and refunds are handled according to the
                policies of QuickTurf and individual turf operators.
                Additional charges may apply depending on booking rules.
              </p>

            </section>





            <section>

              <h2 className="text-xl font-bold text-qt-navy">
                5. Service Updates
              </h2>

              <p className="mt-2 leading-relaxed">
                QuickTurf reserves the right to modify, improve, or
                update platform features and policies when necessary.
              </p>

            </section>





            <section>

              <h2 className="text-xl font-bold text-qt-navy">
                6. Contact
              </h2>

              <p className="mt-2 leading-relaxed">
                If you have questions regarding these Terms &
                Conditions, please contact us:
              </p>

              <p className="mt-2 font-medium text-qt-green">
                support@quickturf.com
              </p>

            </section>



          </div>


        </div>


      </main>




      {/* Footer */}
      <DarkFooter />


    </div>

  );

}