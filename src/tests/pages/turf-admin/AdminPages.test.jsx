import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { sampleDashboardStats } from "../../mocks/apiMocks";

vi.mock("../../../api/turfAdminApi", () => ({
  getDashboardStats: vi.fn(() => Promise.resolve({ data: {} })),
  getMyTurf: vi.fn(() => Promise.resolve({ data: {} })),
}));

vi.mock("../../../context/TurfAdminAuthContext", () => ({
  useTurfAdminAuth: () => ({ logout: vi.fn() }),
}));

import TurfAdminDashboardPage from "../../../pages/turf-admin/TurfAdminDashboardPage";
import { getDashboardStats } from "../../../api/turfAdminApi";

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("TurfAdminDashboardPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getDashboardStats.mockResolvedValue({ data: sampleDashboardStats });
  });

  it("TC111 - shows loading state initially", () => {
    renderWithRouter(<TurfAdminDashboardPage />);
    expect(screen.getByText(/loading dashboard/i)).toBeInTheDocument();
  });
  it("TC112 - renders total matches stat after load", async () => {
    renderWithRouter(<TurfAdminDashboardPage />);
    await waitFor(() => {
      expect(screen.getByText("Total matches")).toBeInTheDocument();
      expect(screen.getByText("12")).toBeInTheDocument();
    });
  });
  it("TC113 - renders active members stat", async () => {
    renderWithRouter(<TurfAdminDashboardPage />);
    await waitFor(() => expect(screen.getByText("3")).toBeInTheDocument());
  });
  it("TC114 - renders membership discount given stat", async () => {
    renderWithRouter(<TurfAdminDashboardPage />);
    await waitFor(() => {
      expect(screen.getByText("Membership discount given")).toBeInTheDocument();
      expect(screen.getByText("৳400")).toBeInTheDocument();
    });
  });
  it("TC115 - renders pending member approvals stat", async () => {
    renderWithRouter(<TurfAdminDashboardPage />);
    await waitFor(() => expect(screen.getByText("Pending member approvals")).toBeInTheDocument());
  });
  it("TC116 - renders payment status breakdown stats", async () => {
    renderWithRouter(<TurfAdminDashboardPage />);
    await waitFor(() => {
      expect(screen.getByText("Payment: paid")).toBeInTheDocument();
      expect(screen.getByText("Payment: partial")).toBeInTheDocument();
      expect(screen.getByText("Payment: pending")).toBeInTheDocument();
    });
  });
  it("TC117 - renders due amount stat with correct value", async () => {
    renderWithRouter(<TurfAdminDashboardPage />);
    await waitFor(() => expect(screen.getByText("৳4000")).toBeInTheDocument());
  });
  it("TC118 - dashboard page title renders correctly", async () => {
    renderWithRouter(<TurfAdminDashboardPage />);
    await waitFor(() => expect(screen.getByText("Dashboard")).toBeInTheDocument());
  });
  it("TC119 - calls getDashboardStats exactly once on mount", async () => {
    renderWithRouter(<TurfAdminDashboardPage />);
    await waitFor(() => expect(getDashboardStats).toHaveBeenCalledTimes(1));
  });
  it("TC120 - renders completed and cancelled match stats", async () => {
    renderWithRouter(<TurfAdminDashboardPage />);
    await waitFor(() => {
      expect(screen.getByText("Completed")).toBeInTheDocument();
      expect(screen.getByText("Cancelled")).toBeInTheDocument();
    });
  });
});
