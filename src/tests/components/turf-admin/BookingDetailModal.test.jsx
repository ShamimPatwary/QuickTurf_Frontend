import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingDetailModal from "../../../components/turf-admin/BookingDetailModal";
import { sampleBooking } from "../../mocks/apiMocks";

describe("BookingDetailModal", () => {
  it("TC43 - renders nothing when booking is null", () => {
    const { container } = render(
      <BookingDetailModal booking={null} open={true} onClose={vi.fn()}
        onAddPayment={vi.fn()} onWhatsapp={vi.fn()} onMarkStatus={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });
  it("TC44 - renders booking id, sport, and match type", () => {
    render(<BookingDetailModal booking={sampleBooking} open={true} onClose={vi.fn()}
      onAddPayment={vi.fn()} onWhatsapp={vi.fn()} onMarkStatus={vi.fn()} />);
    expect(screen.getByText("Booking #1")).toBeInTheDocument();
    expect(screen.getByText("football")).toBeInTheDocument();
    expect(screen.getByText("friendly")).toBeInTheDocument();
  });
  it("TC45 - renders transaction ID", () => {
    render(<BookingDetailModal booking={sampleBooking} open={true} onClose={vi.fn()}
      onAddPayment={vi.fn()} onWhatsapp={vi.fn()} onMarkStatus={vi.fn()} />);
    expect(screen.getByText("TXN-BKASH-1234")).toBeInTheDocument();
  });
  it("TC46 - clicking Add payment calls onAddPayment with the booking", () => {
    const handleAddPayment = vi.fn();
    render(<BookingDetailModal booking={sampleBooking} open={true} onClose={vi.fn()}
      onAddPayment={handleAddPayment} onWhatsapp={vi.fn()} onMarkStatus={vi.fn()} />);
    fireEvent.click(screen.getByText("Add payment"));
    expect(handleAddPayment).toHaveBeenCalledWith(sampleBooking);
  });
  it("TC47 - clicking Mark completed calls onMarkStatus with completed", () => {
    const handleMarkStatus = vi.fn();
    render(<BookingDetailModal booking={sampleBooking} open={true} onClose={vi.fn()}
      onAddPayment={vi.fn()} onWhatsapp={vi.fn()} onMarkStatus={handleMarkStatus} />);
    fireEvent.click(screen.getByText("Mark completed"));
    expect(handleMarkStatus).toHaveBeenCalledWith(sampleBooking, "completed");
  });
  it("TC48 - clicking Mark cancelled calls onMarkStatus with cancelled", () => {
    const handleMarkStatus = vi.fn();
    render(<BookingDetailModal booking={sampleBooking} open={true} onClose={vi.fn()}
      onAddPayment={vi.fn()} onWhatsapp={vi.fn()} onMarkStatus={handleMarkStatus} />);
    fireEvent.click(screen.getByText("Mark cancelled"));
    expect(handleMarkStatus).toHaveBeenCalledWith(sampleBooking, "cancelled");
  });
  it("TC49 - clicking Send via WhatsApp calls onWhatsapp with the booking", () => {
    const handleWhatsapp = vi.fn();
    render(<BookingDetailModal booking={sampleBooking} open={true} onClose={vi.fn()}
      onAddPayment={vi.fn()} onWhatsapp={handleWhatsapp} onMarkStatus={vi.fn()} />);
    fireEvent.click(screen.getByText("Send via WhatsApp"));
    expect(handleWhatsapp).toHaveBeenCalledWith(sampleBooking);
  });
  it("TC50 - shows discount amount when discount_amount > 0", () => {
    render(<BookingDetailModal booking={{ ...sampleBooking, discount_amount: 150 }} open={true} onClose={vi.fn()}
      onAddPayment={vi.fn()} onWhatsapp={vi.fn()} onMarkStatus={vi.fn()} />);
    expect(screen.getByText("৳150")).toBeInTheDocument();
  });
});
