import React, { useEffect, useState } from "react";

import TurfAdminLayout from "./TurfAdminLayout";
import Loader from "../../components/common/Loader";
import BookingTable from "../../components/turf-admin/BookingTable";
import BookingDetailModal from "../../components/turf-admin/BookingDetailModal";
import PaymentFormModal from "../../components/turf-admin/PaymentFormModal";

import {
  listTurfAdminBookings,
  getTurfAdminBooking,
  addBookingPayment,
  confirmBookingWhatsapp,
  updateBooking,
} from "../../api/turfAdminApi";


export default function TurfAdminBookingsPage() {

  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [detailOpen, setDetailOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);


  // ============================
  // FILTER STATES
  // ============================

  const today = new Date();

  const [filterType, setFilterType] = useState("month");


  const [selectedMonth, setSelectedMonth] = useState(
    `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}`
  );


  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  const [matchStatusFilter, setMatchStatusFilter] =
    useState("all");


  const [paymentStatusFilter, setPaymentStatusFilter] =
    useState("all");


  const [error, setError] = useState("");





  // ============================
  // LOAD BOOKINGS
  // ============================

  const loadBookings = () => {

    setLoading(true);


    listTurfAdminBookings()

      .then((res) => {

        setBookings(res.data);

      })

      .finally(() => {

        setLoading(false);

      });

  };




  useEffect(() => {

    loadBookings();

  }, []);

   
  
  
  
  
  // ============================
  // APPLY FILTER AUTOMATICALLY
  // ============================


  useEffect(() => {

    applyFilters();

  }, [
    bookings,
    filterType,
    selectedMonth,
    startDate,
    endDate,
    matchStatusFilter,
    paymentStatusFilter
  ]);







  // ============================
  // FILTER FUNCTION
  // ============================


  const applyFilters = () => {


    let result = [...bookings];



    // MONTH FILTER

    if(filterType === "month") {


      result = result.filter((booking)=>{


        if(!booking.booking_date)
          return false;


        return (
          booking.booking_date.slice(0,7)
          === selectedMonth
        );


      });


    }
    
    
    
    
    // CUSTOM DATE FILTER


    if(
      filterType === "custom" &&
      startDate &&
      endDate
    ) {


      result = result.filter((booking)=>{


        return (

          booking.booking_date >= startDate &&

          booking.booking_date <= endDate

        );


      });


    }






    // MATCH STATUS


    if(matchStatusFilter !== "all") {


      result = result.filter((booking)=>

        booking.status === matchStatusFilter

      );


    }







    // PAYMENT STATUS


    if(paymentStatusFilter !== "all") {


      result = result.filter((booking)=>

        booking.payment_status === paymentStatusFilter

      );


    }




    setFilteredBookings(result);


  };









  // ============================
  // FILTER HANDLERS
  // ============================


  const handleFilterType = (e)=>{


    setFilterType(e.target.value);

    setError("");

  };





  const handleCustomApply = ()=>{


    if(!startDate || !endDate){


      setError(
        "Please select both start date and end date"
      );


      return;

    }



    if(endDate < startDate){


      setError(
        "End date cannot be before start date"
      );


      return;

    }



    setError("");

    applyFilters();


  };



  
  
  
  
  
  // ============================
  // BOOKING ACTIONS
  // ============================


  const handleView = (booking)=>{


    setSelectedBooking(booking);

    setDetailOpen(true);


  };





  const refreshSelected = async(id)=>{


    const res =
      await getTurfAdminBooking(id);


    setSelectedBooking(res.data);


    loadBookings();


  };





  const handleAddPayment = ()=>{


    setPaymentOpen(true);


  };





  const handlePaymentSubmit =
    async(
      amount,
      method,
      transactionId
    )=>{


    setSubmitting(true);


    try {


      await addBookingPayment(

        selectedBooking.id,

        amount,

        method || null,

        transactionId || null

      );



      setPaymentOpen(false);



      await refreshSelected(
        selectedBooking.id
      );


    }

    finally {


      setSubmitting(false);


    }


  };






  const handleWhatsapp =
    async(booking)=>{


      const res =
        await confirmBookingWhatsapp(
          booking.id
        );


      window.open(
        res.data.whatsapp_link,
        "_blank"
      );


    };






  const handleMarkStatus =
    async(
      booking,
      status
    )=>{


      await updateBooking(

        booking.id,

        {
          status
        }

      );


      await refreshSelected(
        booking.id
      );


    };



     
    
    
    
    
return (

    <TurfAdminLayout title="Bookings">


      {/* ================= FILTER ================= */}


      {/* ================= FILTER ================= */}

<div
  className="
  mb-6
  rounded-xl
  border
  border-qt-line
  bg-white
  p-5
  "
>

<div
    className="
    flex
    flex-col
    sm:flex-row
    flex-wrap
    items-stretch
    sm:items-center
    justify-between
    gap-4
    "
  >


{/* LEFT SIDE FILTERS */}

    <div
      className="
      flex
      flex-col
      sm:flex-row
      flex-wrap
      items-stretch
      sm:items-center
      gap-3
      sm:gap-4
      w-full
      sm:w-auto
      "
    >


{/* FILTER TYPE */}

      <select
        value={filterType}
        onChange={handleFilterType}
        className="
        rounded-lg
        border
        px-3
        py-2
        w-full
        sm:w-auto
        bg-white
        "
      >

        <option value="month">
          Filter By Month
        </option>

        <option value="custom">
          Custom Date Range
        </option>

      </select>




      {/* MONTH FILTER */}

      {
        filterType === "month" && (

<input
            type="month"
            value={selectedMonth}
            onChange={(e)=>
              setSelectedMonth(e.target.value)
            }
            className="
            rounded-lg
            border
            px-3
            py-2
            w-full
            sm:w-auto
            bg-white
            "
          />

        )
      }





      {/* CUSTOM DATE FILTER */}

      {
        filterType === "custom" && (

          <>

<input
              type="date"
              value={startDate}
              onChange={(e)=>
                setStartDate(e.target.value)
              }
              className="
              rounded-lg
              border
              px-3
              py-2
              flex-1
              min-w-[130px]
              bg-white
              "
            />


            <span className="text-gray-400">
              to
            </span>


            <input
              type="date"
              value={endDate}
              onChange={(e)=>
                setEndDate(e.target.value)
              }
              className="
              rounded-lg
              border
              px-3
              py-2
              flex-1
              min-w-[130px]
              bg-white
              "
            />


          </>

        )
      }






      {/* MATCH STATUS */}

<select
        value={matchStatusFilter}
        onChange={(e)=>
          setMatchStatusFilter(e.target.value)
        }
        className="
        rounded-lg
        border
        px-3
        py-2
        w-full
        sm:w-auto
        bg-white
        "
      >

        <option value="all">
          All Match Status
        </option>

        <option value="upcoming">
          Upcoming
        </option>

        <option value="completed">
          Completed
        </option>

        <option value="cancelled">
          Cancelled
        </option>


      </select>







      {/* PAYMENT STATUS */}

<select
        value={paymentStatusFilter}
        onChange={(e)=>
          setPaymentStatusFilter(e.target.value)
        }
        className="
        rounded-lg
        border
        px-3
        py-2
        w-full
        sm:w-auto
        bg-white
        "
      >

        <option value="all">
          All Payment
        </option>

        <option value="paid">
          Full Payment
        </option>

        <option value="partial">
          Partial Payment
        </option>

        <option value="pending">
          Pending Payment
        </option>


      </select>



    </div>







    {/* RIGHT SIDE APPLY BUTTON */}

    {
      filterType === "custom" && (

<button

          onClick={handleCustomApply}

          className="
          rounded-lg
          bg-qt-green
          px-6
          py-2
          text-white
          whitespace-nowrap
          w-full
          sm:w-auto
          "

        >

          Apply

        </button>

      )
    }



  </div>






  {
    error && (

      <p
        className="
        mt-3
        text-sm
        text-red-600
        "
      >

        {error}

      </p>

    )
  }





  <p
    className="
    mt-3
    text-sm
    text-gray-500
    "
  >

    Showing {filteredBookings.length} bookings

  </p>



</div>







      {
        loading ?

        <Loader label="Loading bookings..." />

        :

        <BookingTable

          bookings={filteredBookings}

          onView={handleView}

        />

      }







      <BookingDetailModal

        booking={selectedBooking}

        open={detailOpen}

        onClose={()=>
          setDetailOpen(false)
        }

        onAddPayment={handleAddPayment}

        onWhatsapp={handleWhatsapp}

        onMarkStatus={handleMarkStatus}

      />







      <PaymentFormModal

        open={paymentOpen}

        onClose={()=>
          setPaymentOpen(false)
        }

        onSubmit={handlePaymentSubmit}

        submitting={submitting}

      />



    </TurfAdminLayout>

  );

}























