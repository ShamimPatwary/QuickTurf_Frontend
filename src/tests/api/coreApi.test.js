import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../api/axiosClient", () => ({
  turfClient: {
    get: vi.fn(() => Promise.resolve({ data: {} })),
    post: vi.fn(() => Promise.resolve({ data: {} })),
    put: vi.fn(() => Promise.resolve({ data: {} })),
    patch: vi.fn(() => Promise.resolve({ data: {} })),
    delete: vi.fn(() => Promise.resolve({ data: {} })),
  },
  publicClient: {
    get: vi.fn(() => Promise.resolve({ data: {} })),
    post: vi.fn(() => Promise.resolve({ data: {} })),
  },
  default: "http://test-api",
}));

import { turfClient, publicClient } from "../../api/axiosClient";
import { getMyTurf, listMembers, updateMemberStatus, addBookingPayment, listSports, createSport, deleteSport } from "../../api/turfAdminApi";
import { listTurfPackages, listTurfMemberships, purchaseMembership, checkMembershipDiscount, browseTurfs, getTurfDetail } from "../../api/publicApi";

describe("turfAdminApi", () => {
  beforeEach(() => vi.clearAllMocks());

  it("TC85 - getMyTurf calls the correct endpoint", () => {
    getMyTurf();
    expect(turfClient.get).toHaveBeenCalledWith("/api/turf-admin/my-turf");
  });
  it("TC86 - listMembers calls the correct endpoint", () => {
    listMembers();
    expect(turfClient.get).toHaveBeenCalledWith("/api/turf-admin/members");
  });
  it("TC87 - updateMemberStatus sends the correct status payload", () => {
    updateMemberStatus(5, "active");
    expect(turfClient.patch).toHaveBeenCalledWith("/api/turf-admin/members/5/status", { status: "active" });
  });
  it("TC88 - addBookingPayment sends amount, method, and transaction_id", () => {
    addBookingPayment(10, 500, "bkash", "TXN-999");
    expect(turfClient.post).toHaveBeenCalledWith(
      "/api/turf-admin/bookings/10/payments",
      { amount: 500, method: "bkash", transaction_id: "TXN-999" }
    );
  });
  it("TC89 - addBookingPayment defaults transaction_id to null when omitted", () => {
    addBookingPayment(11, 300, "cash");
    expect(turfClient.post).toHaveBeenCalledWith(
      "/api/turf-admin/bookings/11/payments",
      { amount: 300, method: "cash", transaction_id: null }
    );
  });
  it("TC90 - listSports calls the correct endpoint", () => {
    listSports();
    expect(turfClient.get).toHaveBeenCalledWith("/api/turf-admin/sports");
  });
  it("TC91 - createSport posts with name payload", () => {
    createSport("cricket");
    expect(turfClient.post).toHaveBeenCalledWith("/api/turf-admin/sports", { name: "cricket" });
  });
  it("TC92 - deleteSport calls delete with correct id in URL", () => {
    deleteSport(7);
    expect(turfClient.delete).toHaveBeenCalledWith("/api/turf-admin/sports/7");
  });
});

describe("publicApi", () => {
  beforeEach(() => vi.clearAllMocks());

  it("TC93 - listTurfPackages calls endpoint with sport_id param", () => {
    listTurfPackages(1, 2);
    expect(publicClient.get).toHaveBeenCalledWith("/api/public/turfs/1/packages", { params: { sport_id: 2 } });
  });
  it("TC94 - listTurfPackages omits sport_id param when not provided", () => {
    listTurfPackages(1);
    expect(publicClient.get).toHaveBeenCalledWith("/api/public/turfs/1/packages", { params: {} });
  });
  it("TC95 - listTurfMemberships calls the correct endpoint", () => {
    listTurfMemberships(3);
    expect(publicClient.get).toHaveBeenCalledWith("/api/public/turfs/3/memberships");
  });
  it("TC96 - purchaseMembership posts to the correct endpoint with payload", () => {
    const payload = { membership_id: 1, name: "Test", phone: "+8801711110001" };
    purchaseMembership(3, payload);
    expect(publicClient.post).toHaveBeenCalledWith("/api/public/turfs/3/memberships/purchase", payload);
  });
  it("TC97 - checkMembershipDiscount sends turf_id, phone, sport_id as params", () => {
    checkMembershipDiscount(1, "+8801711110001", 2);
    expect(publicClient.get).toHaveBeenCalledWith(
      "/api/public/bookings/check-discount",
      { params: { turf_id: 1, phone: "+8801711110001", sport_id: 2 } }
    );
  });
  it("TC98 - browseTurfs calls endpoint with sport_name filter", () => {
    browseTurfs("football");
    expect(publicClient.get).toHaveBeenCalledWith("/api/public/turfs", { params: { sport_name: "football" } });
  });
  it("TC99 - browseTurfs omits sport_name when not provided", () => {
    browseTurfs();
    expect(publicClient.get).toHaveBeenCalledWith("/api/public/turfs", { params: {} });
  });
  it("TC100 - getTurfDetail calls the correct endpoint with turf id", () => {
    getTurfDetail(9);
    expect(publicClient.get).toHaveBeenCalledWith("/api/public/turfs/9");
  });
});
