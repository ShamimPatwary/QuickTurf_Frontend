export const sampleTurf = {
  id: 1, name: "Green Field Turf", details: "A great place to play football and cricket.",
  address: "123 Main Street, Dhaka", phone: "+8801711111111",
  latitude: 23.81, longitude: 90.41, google_map_link: "https://maps.google.com/?q=23.81,90.41",
  status: "active", subscription_due_date: "2026-12-31T00:00:00Z",
  images: [
    { id: 1, image_url: "https://example.com/turf1.jpg" },
    { id: 2, image_url: "https://example.com/turf2.jpg" },
  ],
};

export const sampleSport = { id: 1, turf_id: 1, name: "football" };

export const sampleSlot = {
  id: 1, start_time: "18:00:00", end_time: "19:00:00", price: 1000, is_booked: false,
};

export const sampleBooking = {
  id: 1, turf_id: 1, sport_id: 1, sport_name: "football", time_slot_id: 1,
  customer_name: "Karim Rahman", customer_phone: "+8801711110001", customer_email: null,
  booking_date: "2026-10-01", notes: null, match_type: "friendly",
  total_amount: 1000, discount_amount: 0, paid_amount: 500, due_amount: 500,
  transaction_id: "TXN-BKASH-1234", status: "upcoming", payment_status: "partial",
  created_at: "2026-09-01T10:00:00Z",
};

export const sampleMembership = {
  id: 1, turf_id: 1, name: "Gold Membership", description: "20% off every booking",
  duration_days: 30, price: 2000, discount_percentage: 20, is_active: true,
  sports: [{ id: 1, name: "football" }],
};

export const sampleDashboardStats = {
  total_matches: 12, total_match_amount: 12000, paid_amount: 8000, due_amount: 4000,
  upcoming_matches: 5, completed_matches: 6, cancelled_matches: 1,
  payment_paid: 6, payment_partial: 4, payment_pending: 2,
  total_revenue: 8000, total_discount_given: 400, active_members: 3, pending_members: 1,
};
