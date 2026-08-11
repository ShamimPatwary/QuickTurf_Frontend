import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentFormModal from "../../../components/turf-admin/PaymentFormModal";

describe("PaymentFormModal", () => {
  it("TC51 - renders amount, method, and transaction id fields", () => {
    render(<PaymentFormModal open={true} onClose={vi.fn()} onSubmit={vi.fn()} submitting={false} />);
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/method/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/transaction id/i)).toBeInTheDocument();
  });
  it("TC52 - does not submit when amount is empty", () => {
    const handleSubmit = vi.fn();
    render(<PaymentFormModal open={true} onClose={vi.fn()} onSubmit={handleSubmit} submitting={false} />);
    fireEvent.click(screen.getByText("Record payment"));
    expect(handleSubmit).not.toHaveBeenCalled();
  });
  it("TC53 - submits amount, method, and transaction id correctly", () => {
    const handleSubmit = vi.fn();
    render(<PaymentFormModal open={true} onClose={vi.fn()} onSubmit={handleSubmit} submitting={false} />);
    fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: "500" } });
    fireEvent.change(screen.getByLabelText(/method/i), { target: { value: "bkash" } });
    fireEvent.change(screen.getByLabelText(/transaction id/i), { target: { value: "TXN-001" } });
    fireEvent.click(screen.getByText("Record payment"));
    expect(handleSubmit).toHaveBeenCalledWith(500, "bkash", "TXN-001");
  });
  it("TC54 - shows loading text while submitting", () => {
    render(<PaymentFormModal open={true} onClose={vi.fn()} onSubmit={vi.fn()} submitting={true} />);
    expect(screen.getByText("Saving...")).toBeInTheDocument();
  });
});
