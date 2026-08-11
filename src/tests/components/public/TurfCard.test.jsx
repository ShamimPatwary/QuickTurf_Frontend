import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TurfCard from "../../../components/public/TurfCard";
import { sampleTurf } from "../../mocks/apiMocks";

function renderCard(turf) {
  return render(<MemoryRouter><TurfCard turf={turf} /></MemoryRouter>);
}

describe("TurfCard", () => {
  it("TC16 - renders turf name and address", () => {
    renderCard(sampleTurf);
    expect(screen.getByText("Green Field Turf")).toBeInTheDocument();
    expect(screen.getByText(/123 Main Street, Dhaka/)).toBeInTheDocument();
  });
  it("TC17 - renders the turf image when available", () => {
    renderCard(sampleTurf);
    expect(screen.getByAltText("Green Field Turf")).toHaveAttribute("src", sampleTurf.images[0].image_url);
  });
  it("TC18 - shows fallback placeholder when no images exist", () => {
    renderCard({ ...sampleTurf, images: [] });
    expect(screen.getByText("QT")).toBeInTheDocument();
  });
  it("TC19 - shows payment number and copies to clipboard on click", () => {
    renderCard(sampleTurf);
    expect(screen.getByText("+8801711111111")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Copy"));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("+8801711111111");
  });
  it("TC20 - does not render payment number section when turf has no phone", () => {
    renderCard({ ...sampleTurf, phone: null });
    expect(screen.queryByText("Payment number")).not.toBeInTheDocument();
  });
});
