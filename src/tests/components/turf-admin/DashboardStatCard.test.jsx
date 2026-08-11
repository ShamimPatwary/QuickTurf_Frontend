import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardStatCard from "../../../components/turf-admin/DashboardStatCard";

describe("DashboardStatCard", () => {
  it("TC39 - renders label and value", () => {
    render(<DashboardStatCard label="Total matches" value={12} />);
    expect(screen.getByText("Total matches")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });
  it("TC40 - renders currency-formatted string values", () => {
    render(<DashboardStatCard label="Paid amount" value="৳8000" accent="green" />);
    expect(screen.getByText("৳8000")).toBeInTheDocument();
  });
  it("TC41 - applies red accent class for warning stats", () => {
    render(<DashboardStatCard label="Due amount" value="৳4000" accent="red" />);
    expect(screen.getByText("৳4000").className).toMatch(/qt-red/);
  });
  it("TC42 - applies navy accent class by default", () => {
    render(<DashboardStatCard label="Upcoming" value={5} />);
    expect(screen.getByText("5").className).toMatch(/qt-navy/);
  });
});
