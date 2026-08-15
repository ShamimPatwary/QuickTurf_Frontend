import React from "react";
import DarkFooter from "../../components/common/DarkFooter";
import DarkNavbar from "../../components/common/DarkNavbar";


export default function PrivacyPolicy() {

  return (

    <div className="min-h-screen flex flex-col bg-white">


      {/* Navbar */}
      <DarkNavbar />



      {/* Content */}
      <main className="flex-1 px-6 pt-32 pb-20">


        <div className="mx-auto max-w-4xl">


          <h1 className="text-4xl font-extrabold text-qt-navy">
            Privacy <span className="text-qt-green">Policy</span>
          </h1>



          <p className="mt-5 text-gray-600">
            Your privacy is important to us. This policy explains how
            QuickTurf collects, uses, and protects your information.
          </p>




          <div className="mt-10 space-y-6 text-gray-600">


            <section>
              <h2 className="text-xl font-bold text-qt-navy">
                1. Information We Collect
              </h2>

              <p className="mt-2 leading-relaxed">
                We collect information such as your name, phone number,
                email address, account details, and booking information
                to provide and improve our turf booking services.
              </p>
            </section>





            <section>
              <h2 className="text-xl font-bold text-qt-navy">
                2. How We Use Your Information
              </h2>

              <p className="mt-2 leading-relaxed">
                Your information is used to process bookings,
                communicate with users, manage accounts, and improve
                the overall QuickTurf experience.
              </p>
            </section>





            <section>
              <h2 className="text-xl font-bold text-qt-navy">
                3. Data Protection
              </h2>

              <p className="mt-2 leading-relaxed">
                We take reasonable security measures to protect your
                personal information from unauthorized access,
                modification, or disclosure.
              </p>
            </section>





            <section>
              <h2 className="text-xl font-bold text-qt-navy">
                4. Information Sharing
              </h2>

              <p className="mt-2 leading-relaxed">
                QuickTurf does not sell or share your personal
                information with unauthorized third parties.
                Information may only be shared when required to
                provide our services or comply with legal obligations.
              </p>
            </section>





            <section>
              <h2 className="text-xl font-bold text-qt-navy">
                5. Contact Us
              </h2>

              <p className="mt-2 leading-relaxed">
                If you have any questions about this Privacy Policy,
                contact us at:
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