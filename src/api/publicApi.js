import { publicClient } from "./axiosClient";
import BASE_URL from "./axiosClient";

export const browseTurfs = (sportName) =>
  publicClient.get("/api/public/turfs", { params: sportName ? { sport_name: sportName } : {} });

export const getTurfDetail = (turfId) => publicClient.get(`/api/public/turfs/${turfId}`);

export const listTurfSports = (turfId) => publicClient.get(`/api/public/turfs/${turfId}/sports`);

export const listAvailableSlots = (turfId, sportId, bookingDate) =>
  publicClient.get(`/api/public/turfs/${turfId}/sports/${sportId}/available-slots`, {
    params: { booking_date: bookingDate },
  });

export const createPublicBooking = (data) => publicClient.post("/api/public/bookings", data);

export const checkMembershipDiscount = (turfId, phone, sportId) =>
  publicClient.get("/api/public/bookings/check-discount", {
    params: { turf_id: turfId, phone, sport_id: sportId },
  });

export const listTurfPackages = (turfId, sportId) =>
  publicClient.get(`/api/public/turfs/${turfId}/packages`, {
    params: sportId ? { sport_id: sportId } : {},
  });

export const listTurfMemberships = (turfId) => publicClient.get(`/api/public/turfs/${turfId}/memberships`);

export const purchaseMembership = (turfId, data) =>
  publicClient.post(`/api/public/turfs/${turfId}/memberships/purchase`, data);

export const getInvoiceUrl = (bookingId) => `${BASE_URL}/api/invoices/${bookingId}`;
