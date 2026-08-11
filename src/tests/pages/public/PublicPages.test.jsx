import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { sampleTurf, sampleSport, sampleMembership } from "../../mocks/apiMocks";

vi.mock("../../../api/publicApi", () => ({
  getTurfDetail: vi.fn(() => Promise.resolve({ data: {} })),
  listTurfSports: vi.fn(() => Promise.resolve({ data: [] })),
  listAvailableSlots: vi.fn(() => Promise.resolve({ data: [] })),
  listTurfPackages: vi.fn(() => Promise.resolve({ data: [] })),
  listTurfMemberships: vi.fn(() => Promise.resolve({ data: [] })),
  purchaseMembership: vi.fn(() => Promise.resolve({ data: {} })),
  createPublicBooking: vi.fn(() => Promise.resolve({ data: {} })),
  checkMembershipDiscount: vi.fn(() => Promise.resolve({ data: { is_member: false } })),
  getInvoiceUrl: (id) => `http://test/api/invoices/${id}`,
}));

import TurfDetailPage from "../../../pages/public/TurfDetailPage";
import { getTurfDetail, listTurfSports, listTurfMemberships } from "../../../api/publicApi";

function renderWithRoute(ui, path = "/turfs/1") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes><Route path="/turfs/:turfId" element={ui} /></Routes>
    </MemoryRouter>
  );
}

describe("TurfDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getTurfDetail.mockResolvedValue({ data: sampleTurf });
    listTurfSports.mockResolvedValue({ data: [sampleSport] });
    listTurfMemberships.mockResolvedValue({ data: [sampleMembership] });
  });

  it("TC101 - shows loading state initially", () => {
    renderWithRoute(<TurfDetailPage />);
    expect(screen.getByText(/loading turf/i)).toBeInTheDocument();
  });
  it("TC102 - renders turf name after data loads", async () => {
    renderWithRoute(<TurfDetailPage />);
    await waitFor(() => expect(screen.getByText("Green Field Turf")).toBeInTheDocument());
  });
  it("TC103 - renders turf address after data loads", async () => {
    renderWithRoute(<TurfDetailPage />);
    await waitFor(() => expect(screen.getByText(/123 Main Street, Dhaka/)).toBeInTheDocument());
  });
  it("TC104 - renders sport selector with fetched sports", async () => {
    renderWithRoute(<TurfDetailPage />);
    await waitFor(() => expect(screen.getByText("football")).toBeInTheDocument());
  });
  it("TC105 - renders membership section when memberships exist", async () => {
    renderWithRoute(<TurfDetailPage />);
    await waitFor(() => {
      expect(screen.getByText("Memberships")).toBeInTheDocument();
      expect(screen.getByText("Gold Membership")).toBeInTheDocument();
    });
  });
  it("TC106 - Continue to booking button disabled with no slot selected", async () => {
    renderWithRoute(<TurfDetailPage />);
    await waitFor(() => expect(screen.getByText(/continue to booking/i)).toBeDisabled());
  });
  it("TC107 - shows Google Maps link when google_map_link is present", async () => {
    renderWithRoute(<TurfDetailPage />);
    await waitFor(() => {
      const mapLink = screen.getByText(/123 Main Street, Dhaka/).closest("a");
      expect(mapLink).toHaveAttribute("href", sampleTurf.google_map_link);
    });
  });
  it("TC108 - date input defaults to today's date", async () => {
    renderWithRoute(<TurfDetailPage />);
    await waitFor(() => {
      const dateInput = screen.getByLabelText(/date/i);
      expect(dateInput.value).toBe(new Date().toISOString().slice(0, 10));
    });
  });
  it("TC109 - handles turf with no memberships gracefully", async () => {
    listTurfMemberships.mockResolvedValue({ data: [] });
    renderWithRoute(<TurfDetailPage />);
    await waitFor(() => expect(screen.getByText("Green Field Turf")).toBeInTheDocument());
    expect(screen.queryByText("Memberships")).not.toBeInTheDocument();
  });
  it("TC110 - handles turf with no sports gracefully (no crash)", async () => {
    listTurfSports.mockResolvedValue({ data: [] });
    renderWithRoute(<TurfDetailPage />);
    await waitFor(() => expect(screen.getByText("Green Field Turf")).toBeInTheDocument());
  });
});
