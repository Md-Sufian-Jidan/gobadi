import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OurVission from "@/components/module/home/OurVission";

describe("OurVission", () => {
  it("renders vision features and image collage", () => {
    render(<OurVission />);

    expect(document.getElementById("our-visions")).toBeInTheDocument();
    expect(screen.getByText("OUR VISIONS")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Empowering Smarter Animal Care Through AI" })
    ).toBeInTheDocument();
    expect(screen.getByText("Animal Care Ecosystem")).toBeInTheDocument();
    expect(screen.getByText("Doctor Consultation Network")).toBeInTheDocument();
    expect(screen.getByText("AI-Powered Insights & Marketplace")).toBeInTheDocument();
    expect(screen.getByAltText("Veterinarian checking cow")).toBeInTheDocument();
  });
});
