import React, { useState } from "react";
import {
  useLocation,
  useNavigate,
  Navigate
} from "react-router-dom";

import DarkNavbar from "../../components/common/DarkNavbar";
import DarkFooter from "../../components/common/DarkFooter";



const formatTime = (time) => {

  if (!time) return "";

  const [hour, minute] = time.split(":");

  const h = Number(hour);

  const period = h >= 12 ? "PM" : "AM";

  const hour12 = h % 12 || 12;

  return `${hour12}:${minute} ${period}`;

};





export default function BookingPaymentInfoPage() {


  const { state } = useLocation();

  const navigate = useNavigate();


  const [copied, setCopied] = useState(false);





  if (!state || !state.turf) {

    return <Navigate to="/turfs" replace />;

  }





  const {

    turf,

    sportId,

    bookingDate,

    slot,

    membership,

    package: selectedPackage,

    paymentType

  } = state;







  const paymentAmount =

    paymentType === "membership"

      ? membership.price

      :

    paymentType === "package"

      ? selectedPackage.price

      :

      slot.price;








  const handleCopy = () => {


    if (turf.phone) {


      navigator.clipboard.writeText(turf.phone);


      setCopied(true);



      setTimeout(() => {

        setCopied(false);

      }, 2500);


    }


  };








  const handleContinue = () => {


    // Membership flow

    if (paymentType === "membership") {


      navigate("/membership/confirm", {

        state

      });


      return;

    }






    // Package flow

    if (paymentType === "package") {


      navigate("/package/confirm", {

        state

      });


      return;

    }







    // Turf booking flow

    navigate(`/turfs/${turf.id}/book`, {

      state

    });


  };









  return (

<div className="min-h-screen flex flex-col bg-white">

      <DarkNavbar />





      <main className="mt-20 flex-1 mx-auto w-full max-w-xl px-6 py-12">






        {/* Booking / Purchase Summary */}


        <div className="rounded-xl border border-qt-line bg-white p-4">


          <div className="flex items-center justify-between text-sm">



            <div>



              <p className="font-display font-bold text-qt-navy">


                {

                  paymentType === "membership"

                    ? membership.name

                    :

                  paymentType === "package"

                    ? selectedPackage.name

                    :

                    turf.name

                }


              </p>





              <p className="text-qt-charcoal/60 capitalize">


                {

                  paymentType === "membership"

                    ? "Membership purchase"

                    :

                  paymentType === "package"

                    ? "Package purchase"

                    :

                    `${state.sportName || "Sport"} · ${bookingDate}`

                }


              </p>



            </div>






            <div className="text-right">


              {
                paymentType === "booking" && (

                  <p className="font-mono font-semibold text-qt-navy">

                    {formatTime(slot.start_time)}
                    {" – "}
                    {formatTime(slot.end_time)}

                  </p>

                )
              }




              <p className="font-display font-bold text-qt-green">

                ৳{paymentAmount}

              </p>



            </div>



          </div>


        </div>


        {/* Step Indicator */}


        <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide">


          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-qt-green text-white text-xs">

            1

          </span>



          <span className="text-qt-green">

            Pay the amount

          </span>




          <span className="flex-1 h-px bg-qt-line" />





          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-qt-line text-qt-charcoal/40 text-xs">

            2

          </span>




          <span className="text-qt-charcoal/40">

            Confirm

          </span>



        </div>









        {/* Payment Card */}



        {
          turf.phone ? (


            <div className="mt-6 rounded-2xl border-2 border-qt-green bg-qt-green/5 p-6">





              <div className="flex items-center gap-3 mb-4">


                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-qt-green text-white text-xl">

                  💳

                </span>





                <div>


                  <p className="font-display font-bold text-qt-navy text-lg">

                    Pay to {turf.name}

                  </p>




                  <p className="text-sm text-qt-charcoal/60">

                    Send ৳{paymentAmount} to this number

                  </p>


                </div>



              </div>







              <p className="text-xs font-bold uppercase tracking-wider text-qt-charcoal/50 mb-2">

                bKash · Nagad · Rocket

              </p>






<div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                <div className="flex-1 rounded-xl border-2 border-qt-green bg-white px-4 sm:px-5 py-4 min-w-0">

                  <p className="font-display text-xl sm:text-3xl font-extrabold tracking-wide text-qt-navy break-all">

                    {turf.phone}

                  </p>

                </div>







                <button


                  onClick={handleCopy}


                  className={`flex-shrink-0 rounded-xl px-5 py-4 text-sm font-bold transition-colors ${

                    copied

                    ? "bg-qt-green text-white"

                    :

                    "bg-qt-navy text-white hover:bg-qt-navy-light"

                  }`}


                >

                  {copied ? "Copied ✓" : "Copy"}


                </button>



              </div>








              <div className="mt-4 rounded-lg bg-white border border-qt-line p-3 text-sm text-qt-charcoal/70">


                <p className="font-semibold text-qt-navy mb-1">

                  How to pay:

                </p>





                <ol className="list-decimal list-inside space-y-1">


                  <li>

                    Open bKash / Nagad / Rocket

                  </li>



                  <li>

                    Send

                    <strong>

                      {" "}minimum 500 of tk {paymentAmount}

                    </strong>

                    {" "}to

                    <strong>

                      {" "}{turf.phone}

                    </strong>

                  </li>




                  <li>

                    Save your

                    <strong>

                      {" "}Transaction ID

                    </strong>

                  </li>




                  <li>

                    Click the button below and continue

                  </li>


                </ol>


              </div>





            </div>


          )

          :



          (

            <div className="mt-6 rounded-2xl border border-qt-line bg-qt-mist p-6 text-center text-sm text-qt-charcoal/60">

              <p>

                Contact the turf directly to confirm payment details.

              </p>


            </div>

          )

        }









        {/* Continue Button */}


        <button


          onClick={handleContinue}


          className="mt-6 w-full rounded-xl bg-qt-green py-4 text-center font-display font-bold text-white text-lg hover:bg-qt-green-dark transition-colors"


        >

          I have paid — Continue →

        </button>







        <p className="mt-3 text-center text-xs text-qt-charcoal/40">

          You will enter your Transaction ID on the next page to confirm your payment.

        </p>




      </main>






      <DarkFooter />



    </div>

  );

}