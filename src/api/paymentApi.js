 /**
 * SSLCommerz payment initiation calls.
 */

import { publicClient } from "./axiosClient";

/** Initiate SSLCommerz payment for a booking. Returns { gateway_url, tran_id } */
export const initiateBookingPayment = (bookingId) =>
  publicClient.post(`/api/payment/initiate/booking/${bookingId}`);

/** Initiate SSLCommerz payment for a membership purchase. Returns { gateway_url, tran_id } */
export const initiateMembershipPayment = (data) =>
  publicClient.post("/api/payment/initiate/membership", data);
