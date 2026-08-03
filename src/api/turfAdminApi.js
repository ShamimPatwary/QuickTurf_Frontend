/**
 * Changes: Added `getMyTurf` — fetches the turf that belongs to the
 *   currently logged-in turf admin, used for the sidebar name/logo.
 *   All other exports are unchanged from the previous version.
 */
import { turfClient } from "./axiosClient";

export const turfAdminLogin = (email, password) => {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);
  return turfClient.post("/api/turf-admin/auth/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const changeTurfAdminPassword = (oldPassword, newPassword) =>
  turfClient.post("/api/turf-admin/auth/change-password", {
    old_password: oldPassword,
    new_password: newPassword,
  });

// ── NEW: fetch the turf that belongs to the logged-in turf admin ──────────────
export const getMyTurf = () => turfClient.get("/api/turf-admin/my-turf");

// Sports
export const createSport = (name) => turfClient.post("/api/turf-admin/sports", { name });
export const listSports = () => turfClient.get("/api/turf-admin/sports");
export const updateSport = (sportId, name) => turfClient.put(`/api/turf-admin/sports/${sportId}`, { name });
export const deleteSport = (sportId) => turfClient.delete(`/api/turf-admin/sports/${sportId}`);

// Time slots
export const createTimeSlot = (data) => turfClient.post("/api/turf-admin/time-slots", data);
export const listTimeSlots = (sportId) =>
  turfClient.get("/api/turf-admin/time-slots", { params: { sport_id: sportId } });
export const updateTimeSlot = (timeSlotId, data) =>
  turfClient.put(`/api/turf-admin/time-slots/${timeSlotId}`, data);
export const deleteTimeSlot = (timeSlotId) => turfClient.delete(`/api/turf-admin/time-slots/${timeSlotId}`);

// Packages
export const createPackage = (data) => turfClient.post("/api/turf-admin/packages", data);
export const listPackages = () => turfClient.get("/api/turf-admin/packages");
export const updatePackage = (packageId, data) => turfClient.put(`/api/turf-admin/packages/${packageId}`, data);
export const deletePackage = (packageId) => turfClient.delete(`/api/turf-admin/packages/${packageId}`);

// Memberships
export const createMembership = (data) => turfClient.post("/api/turf-admin/memberships", data);
export const listMemberships = () => turfClient.get("/api/turf-admin/memberships");
export const updateMembership = (membershipId, data) =>
  turfClient.put(`/api/turf-admin/memberships/${membershipId}`, data);
export const deleteMembership = (membershipId) => turfClient.delete(`/api/turf-admin/memberships/${membershipId}`);

// Members
export const listMembers = () => turfClient.get("/api/turf-admin/members");
export const getMember = (memberId) => turfClient.get(`/api/turf-admin/members/${memberId}`);
export const updateMemberStatus = (memberId, status) =>
  turfClient.patch(`/api/turf-admin/members/${memberId}/status`, { status });

// Bookings
export const listTurfAdminBookings = () => turfClient.get("/api/turf-admin/bookings");
export const getTurfAdminBooking = (bookingId) => turfClient.get(`/api/turf-admin/bookings/${bookingId}`);
export const updateBooking = (bookingId, data) => turfClient.put(`/api/turf-admin/bookings/${bookingId}`, data);
export const deleteBooking = (bookingId) => turfClient.delete(`/api/turf-admin/bookings/${bookingId}`);
export const addBookingPayment = (bookingId, amount, method, transactionId) =>
  turfClient.post(`/api/turf-admin/bookings/${bookingId}/payments`, {
    amount,
    method,
    transaction_id: transactionId || null,
  });
export const confirmBookingWhatsapp = (bookingId) =>
  turfClient.post(`/api/turf-admin/bookings/${bookingId}/confirm-whatsapp`);

// Dashboard
export const getDashboardStats = () => turfClient.get("/api/turf-admin/dashboard");
