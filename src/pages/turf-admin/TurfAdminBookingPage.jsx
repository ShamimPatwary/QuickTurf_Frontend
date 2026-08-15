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









