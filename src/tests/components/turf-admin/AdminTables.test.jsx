import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SportTable from "../../../components/turf-admin/SportTable";
import TimeSlotTable from "../../../components/turf-admin/TimeSlotTable";
import PackageTable from "../../../components/turf-admin/PackageTable";
import MembershipTable from "../../../components/turf-admin/MembershipTable";

const sports = [{ id: 1, name: "football" }, { id: 2, name: "cricket" }];

describe("SportTable", () => {
  it("TC61 - renders existing sports", () => {
    render(<SportTable sports={sports} onCreate={vi.fn()} onDelete={vi.fn()} creating={false} />);
    expect(screen.getByText("football")).toBeInTheDocument();
    expect(screen.getByText("cricket")).toBeInTheDocument();
  });
  it("TC62 - shows empty state when no sports exist", () => {
    render(<SportTable sports={[]} onCreate={vi.fn()} onDelete={vi.fn()} creating={false} />);
    expect(screen.getByText(/no sports yet/i)).toBeInTheDocument();
  });
  it("TC63 - calls onCreate with typed sport name", () => {
    const handleCreate = vi.fn();
    render(<SportTable sports={[]} onCreate={handleCreate} onDelete={vi.fn()} creating={false} />);
    fireEvent.change(screen.getByPlaceholderText(/football, cricket/i), { target: { value: "badminton" } });
    fireEvent.click(screen.getByText("Add sport"));
    expect(handleCreate).toHaveBeenCalledWith("badminton");
  });
  it("TC64 - does not call onCreate with empty input", () => {
    const handleCreate = vi.fn();
    render(<SportTable sports={[]} onCreate={handleCreate} onDelete={vi.fn()} creating={false} />);
    fireEvent.click(screen.getByText("Add sport"));
    expect(handleCreate).not.toHaveBeenCalled();
  });
  it("TC65 - calls onDelete with sport id", () => {
    const handleDelete = vi.fn();
    render(<SportTable sports={sports} onCreate={vi.fn()} onDelete={handleDelete} creating={false} />);
    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});

describe("TimeSlotTable", () => {
  const slots = [{ id: 1, start_time: "18:00:00", end_time: "19:00:00", price: 1000, is_active: true }];
  it("TC66 - renders slot time and price", () => {
    render(<TimeSlotTable slots={slots} onCreate={vi.fn()} onDelete={vi.fn()} onToggleActive={vi.fn()} creating={false} />);
    expect(screen.getByText("18:00–19:00")).toBeInTheDocument();
    expect(screen.getByText("৳1000")).toBeInTheDocument();
  });
  it("TC67 - shows Active badge for active slots", () => {
    render(<TimeSlotTable slots={slots} onCreate={vi.fn()} onDelete={vi.fn()} onToggleActive={vi.fn()} creating={false} />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });
  it("TC68 - shows Inactive badge for inactive slots", () => {
    render(<TimeSlotTable slots={[{ ...slots[0], is_active: false }]} onCreate={vi.fn()} onDelete={vi.fn()} onToggleActive={vi.fn()} creating={false} />);
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });
  it("TC69 - clicking active badge calls onToggleActive", () => {
    const handleToggle = vi.fn();
    render(<TimeSlotTable slots={slots} onCreate={vi.fn()} onDelete={vi.fn()} onToggleActive={handleToggle} creating={false} />);
    fireEvent.click(screen.getByText("Active"));
    expect(handleToggle).toHaveBeenCalledWith(slots[0]);
  });
  it("TC70 - shows empty state when no slots exist", () => {
    render(<TimeSlotTable slots={[]} onCreate={vi.fn()} onDelete={vi.fn()} onToggleActive={vi.fn()} creating={false} />);
    expect(screen.getByText(/no time slots yet/i)).toBeInTheDocument();
  });
});

describe("PackageTable", () => {
  const packages = [{ id: 1, name: "Weekend Pack", description: "4 sessions", price: 3500, sports: [{ id: 1, name: "football" }] }];
  it("TC71 - renders package name and price", () => {
    render(<PackageTable packages={packages} sports={sports} onCreate={vi.fn()} onDelete={vi.fn()} creating={false} />);
    expect(screen.getByText("Weekend Pack")).toBeInTheDocument();
    expect(screen.getByText("৳3500")).toBeInTheDocument();
  });
  it("TC72 - renders sport badges on the package card", () => {
    render(<PackageTable packages={packages} sports={sports} onCreate={vi.fn()} onDelete={vi.fn()} creating={false} />);
    expect(screen.getByText("football")).toBeInTheDocument();
  });
  it("TC73 - submit button disabled when no sports exist yet", () => {
    render(<PackageTable packages={[]} sports={[]} onCreate={vi.fn()} onDelete={vi.fn()} creating={false} />);
    expect(screen.getByText("Add package")).toBeDisabled();
  });
  it("TC74 - toggling a sport chip selects it visually", () => {
    render(<PackageTable packages={[]} sports={sports} onCreate={vi.fn()} onDelete={vi.fn()} creating={false} />);
    const chip = screen.getByText("football");
    fireEvent.click(chip);
    expect(chip.className).toMatch(/qt-green/);
  });
  it("TC75 - calls onDelete with package id", () => {
    const handleDelete = vi.fn();
    render(<PackageTable packages={packages} sports={sports} onCreate={vi.fn()} onDelete={handleDelete} creating={false} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});

describe("MembershipTable", () => {
  const memberships = [{
    id: 1, name: "Gold", description: "VIP access", duration_days: 30,
    price: 2000, discount_percentage: 20, sports: [{ id: 1, name: "football" }],
  }];
  it("TC76 - renders membership name, duration, and price", () => {
    render(<MembershipTable memberships={memberships} sports={sports} onCreate={vi.fn()} onDelete={vi.fn()} creating={false} />);
    expect(screen.getByText("Gold")).toBeInTheDocument();
    expect(screen.getByText("30 days")).toBeInTheDocument();
  });
  it("TC77 - renders discount badge when discount_percentage > 0", () => {
    render(<MembershipTable memberships={memberships} sports={sports} onCreate={vi.fn()} onDelete={vi.fn()} creating={false} />);
    expect(screen.getByText("20% off bookings")).toBeInTheDocument();
  });
  it("TC78 - does not render discount badge when discount is 0", () => {
    render(<MembershipTable memberships={[{ ...memberships[0], discount_percentage: 0 }]} sports={sports} onCreate={vi.fn()} onDelete={vi.fn()} creating={false} />);
    expect(screen.queryByText(/% off bookings/)).not.toBeInTheDocument();
  });
  it("TC79 - calls onDelete with membership id", () => {
    const handleDelete = vi.fn();
    render(<MembershipTable memberships={memberships} sports={sports} onCreate={vi.fn()} onDelete={handleDelete} creating={false} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});
