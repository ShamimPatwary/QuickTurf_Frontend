import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingTable from "../../../components/turf-admin/BookingTable";
import { sampleBooking } from "../../mocks/apiMocks";

describe("BookingTable", () => {
  it("TC31 - renders customer name and phone", () => {
    render(<BookingTable bookings={[sampleBooking]} onView={vi.fn()} />);
    expect(screen.getByText("Karim Rahman")).toBeInTheDocument();
    expect(screen.getByText("+8801711110001")).toBeInTheDocument();
  });
  it("TC32 - renders sport name column", () => {
    render(<BookingTable bookings={[sampleBooking]} onView={vi.fn()} />);
    expect(screen.getByText("football")).toBeInTheDocument();
  });
  it("TC33 - renders transaction ID column", () => {
    render(<BookingTable bookings={[sampleBooking]} onView={vi.fn()} />);
    expect(screen.getByText("TXN-BKASH-1234")).toBeInTheDocument();
  });
  it("TC34 - shows dash when transaction ID is missing", () => {
    render(<BookingTable bookings={[{ ...sampleBooking, transaction_id: null }]} onView={vi.fn()} />);
    expect(screen.getAllByText("—").length).toBeGreaterThan(0);
  });
  it("TC35 - clicking View button calls onView with the booking", () => {
    const handleView = vi.fn();
    render(<BookingTable bookings={[sampleBooking]} onView={handleView} />);
    fireEvent.click(screen.getByText("View"));
    expect(handleView).toHaveBeenCalledWith(sampleBooking);
  });
  it("TC36 - shows empty state when there are no bookings", () => {
    render(<BookingTable bookings={[]} onView={vi.fn()} />);
    expect(screen.getByText(/no bookings yet/i)).toBeInTheDocument();
  });
  it("TC37 - renders match status badge", () => {
    render(<BookingTable bookings={[sampleBooking]} onView={vi.fn()} />);
    expect(screen.getByText("upcoming")).toBeInTheDocument();
  });
  it("TC38 - renders payment status badge", () => {
    render(<BookingTable bookings={[sampleBooking]} onView={vi.fn()} />);
    expect(screen.getByText("partial")).toBeInTheDocument();
  });
});
