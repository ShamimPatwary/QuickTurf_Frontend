/**
 * Changes:
 *  - createTurf now accepts a FormData object (multipart) instead of a plain
 *    JSON payload, so images can be sent together with the turf fields.
 *  - All other functions are unchanged.
 */
import { platformClient } from "./axiosClient";

export const platformAdminLogin = (email, password) => {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);
  return platformClient.post("/api/admin/auth/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

/** Send as multipart/form-data so images can be included. */
export const createTurf = (formData) =>
  platformClient.post("/api/admin/turfs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const listTurfs = () => platformClient.get("/api/admin/turfs");

export const getTurf = (turfId) => platformClient.get(`/api/admin/turfs/${turfId}`);

/** Edit still sends JSON — images are managed via the separate endpoints. */
export const updateTurf = (turfId, data) => platformClient.put(`/api/admin/turfs/${turfId}`, data);

export const deleteTurf = (turfId) => platformClient.delete(`/api/admin/turfs/${turfId}`);

export const updateTurfStatus = (turfId, status, subscriptionDueDate) =>
  platformClient.patch(`/api/admin/turfs/${turfId}/status`, {
    status,
    subscription_due_date: subscriptionDueDate || null,
  });

export const uploadTurfImage = (turfId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return platformClient.post(`/api/admin/turfs/${turfId}/images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteTurfImage = (turfId, imageId) =>
  platformClient.delete(`/api/admin/turfs/${turfId}/images/${imageId}`);

export const listAllBookings = () => platformClient.get("/api/admin/bookings");
