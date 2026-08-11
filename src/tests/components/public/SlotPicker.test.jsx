import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SlotPicker from "../../../components/public/SlotPicker";

const availableSlot = { id: 1, start_time: "18:00:00", end_time: "19:00:00", price: 1000, is_booked: false };
const bookedSlot = { id: 2, start_time: "19:00:00", end_time: "20:00:00", price: 1200, is_booked: true };

describe("SlotPicker", () => {
  it("TC21 - renders available slot with time and price", () => {
    render(<SlotPicker slots={[availableSlot]} selectedSlotId={null} onSelect={vi.fn()} />);
    expect(screen.getByText("18:00–19:00")).toBeInTheDocument();
    expect(screen.getByText("৳1000")).toBeInTheDocument();
  });
  it("TC22 - booked slot is disabled and shows BOOKED label", () => {
    render(<SlotPicker slots={[bookedSlot]} selectedSlotId={null} onSelect={vi.fn()} />);
    expect(screen.getByText("19:00–20:00").closest("button")).toBeDisabled();
    expect(screen.getByText("BOOKED")).toBeInTheDocument();
  });
  it("TC23 - clicking an available slot calls onSelect with its id", () => {
    const handleSelect = vi.fn();
    render(<SlotPicker slots={[availableSlot]} selectedSlotId={null} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText("18:00–19:00").closest("button"));
    expect(handleSelect).toHaveBeenCalledWith(1);
  });
  it("TC24 - shows empty state message when no slots are configured", () => {
    render(<SlotPicker slots={[]} selectedSlotId={null} onSelect={vi.fn()} />);
    expect(screen.getByText(/no slots configured/i)).toBeInTheDocument();
  });
});
