import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "../../../components/public/BookingForm";

vi.mock("../../../api/publicApi", () => ({
  checkMembershipDiscount: vi.fn(() => Promise.resolve({ data: { is_member: false } })),
}));

describe("BookingForm", () => {
  beforeEach(() => vi.clearAllMocks());

  it("TC25 - renders name, phone, and match type fields", () => {
    render(<BookingForm slotPrice={1000} turfId={1} sportId={1} onSubmit={vi.fn()} submitting={false} />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/match type/i)).toBeInTheDocument();
  });

  it("TC26 - shows due amount equal to slot price when nothing paid yet", () => {
    render(<BookingForm slotPrice={1000} turfId={1} sportId={1} onSubmit={vi.fn()} submitting={false} />);
    expect(screen.getByText("৳1000")).toBeInTheDocument();
  });

  it("TC27 - updates due amount when paid amount is entered", () => {
    render(<BookingForm slotPrice={1000} turfId={1} sportId={1} onSubmit={vi.fn()} submitting={false} />);
    fireEvent.change(screen.getByPlaceholderText("0"), { target: { value: "400" } });
    expect(screen.getByText("৳600")).toBeInTheDocument();
  });

  it("TC28 - calls onSubmit with form data when submitted", () => {
    const handleSubmit = vi.fn();
    render(<BookingForm slotPrice={1000} turfId={1} sportId={1} onSubmit={handleSubmit} submitting={false} />);
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Karim" } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: "+8801711110001" } });
    fireEvent.click(screen.getByText("Confirm Booking"));
    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ customer_name: "Karim", customer_phone: "+8801711110001" })
    );
  });

  it("TC29 - disables submit button and shows loading text while submitting", () => {
    render(<BookingForm slotPrice={1000} turfId={1} sportId={1} onSubmit={vi.fn()} submitting={true} />);
    expect(screen.getByText(/confirming booking/i)).toBeDisabled();
  });

  it("TC30 - notes field accepts multiline text", () => {
    render(<BookingForm slotPrice={1000} turfId={1} sportId={1} onSubmit={vi.fn()} submitting={false} />);
    const notes = screen.getByRole("textbox", { name: "" }) || document.querySelector("textarea");
    fireEvent.change(notes, { target: { value: "Please prepare extra balls" } });
    expect(notes.value).toBe("Please prepare extra balls");
  });
});
