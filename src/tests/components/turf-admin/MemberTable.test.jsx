import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MemberTable from "../../../components/turf-admin/MemberTable";

const pendingMember = {
  id: 1, name: "New Member", email: "member@test.com", phone: "+8801811110001",
  amount_paid: 2000, transaction_id: "TXN-PURCHASE-001", status: "pending", expires_at: null,
};
const activeMember = {
  id: 2, name: "Active Member", email: "active@test.com", phone: "+8801811110002",
  amount_paid: 2000, transaction_id: "TXN-PURCHASE-002", status: "active",
  expires_at: "2026-12-31T00:00:00Z",
};

describe("MemberTable", () => {
  it("TC55 - renders member name, phone, and transaction id", () => {
    render(<MemberTable members={[pendingMember]} onApprove={vi.fn()} onReject={vi.fn()} />);
    expect(screen.getByText("New Member")).toBeInTheDocument();
    expect(screen.getByText("TXN-PURCHASE-001")).toBeInTheDocument();
  });
  it("TC56 - shows Approve/Reject buttons only for pending members", () => {
    render(<MemberTable members={[pendingMember]} onApprove={vi.fn()} onReject={vi.fn()} />);
    expect(screen.getByText("Approve")).toBeInTheDocument();
    expect(screen.getByText("Reject")).toBeInTheDocument();
  });
  it("TC57 - does not show Approve/Reject for already-active members", () => {
    render(<MemberTable members={[activeMember]} onApprove={vi.fn()} onReject={vi.fn()} />);
    expect(screen.queryByText("Approve")).not.toBeInTheDocument();
  });
  it("TC58 - clicking Approve calls onApprove with the member", () => {
    const handleApprove = vi.fn();
    render(<MemberTable members={[pendingMember]} onApprove={handleApprove} onReject={vi.fn()} />);
    fireEvent.click(screen.getByText("Approve"));
    expect(handleApprove).toHaveBeenCalledWith(pendingMember);
  });
  it("TC59 - clicking Reject calls onReject with the member", () => {
    const handleReject = vi.fn();
    render(<MemberTable members={[pendingMember]} onApprove={vi.fn()} onReject={handleReject} />);
    fireEvent.click(screen.getByText("Reject"));
    expect(handleReject).toHaveBeenCalledWith(pendingMember);
  });
  it("TC60 - shows empty state when no members exist", () => {
    render(<MemberTable members={[]} onApprove={vi.fn()} onReject={vi.fn()} />);
    expect(screen.getByText(/no membership purchases yet/i)).toBeInTheDocument();
  });
});
