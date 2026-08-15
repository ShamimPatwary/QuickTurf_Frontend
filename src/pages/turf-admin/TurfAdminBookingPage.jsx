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
























