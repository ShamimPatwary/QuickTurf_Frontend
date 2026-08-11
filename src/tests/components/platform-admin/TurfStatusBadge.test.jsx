import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TurfStatusBadge from "../../../components/platform-admin/TurfStatusBadge";

function futureDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

describe("TurfStatusBadge", () => {
  it("TC80 - shows Suspended badge when status is suspended", () => {
    render(<TurfStatusBadge status="suspended" subscriptionDueDate={futureDate(20)} />);
    expect(screen.getByText("Suspended")).toBeInTheDocument();
  });
  it("TC81 - shows Active badge when status is active and far from expiry", () => {
    render(<TurfStatusBadge status="active" subscriptionDueDate={futureDate(20)} />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });
  it("TC82 - shows 'Expires in Xd' warning when within 5 days of expiry", () => {
    render(<TurfStatusBadge status="active" subscriptionDueDate={futureDate(3)} />);
    expect(screen.getByText(/expires in 3d/i)).toBeInTheDocument();
  });
  it("TC83 - shows 'Expired' when subscription_due_date is in the past", () => {
    render(<TurfStatusBadge status="active" subscriptionDueDate={futureDate(-2)} />);
    expect(screen.getByText("Expired")).toBeInTheDocument();
  });
  it("TC84 - defaults to Active when no subscriptionDueDate is provided", () => {
    render(<TurfStatusBadge status="active" subscriptionDueDate={null} />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });
});
