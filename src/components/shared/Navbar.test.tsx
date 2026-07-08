import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Navbar from "@/components/shared/Navbar";

describe("Navbar", () => {
  it("renders brand name and navigation links", () => {
    render(<Navbar />);

    expect(screen.getByText("গবাদি")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "About Us" })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: "Our Vision" })).toHaveAttribute("href", "#our-vision");
    expect(screen.getByRole("link", { name: /Contact Us/i })).toHaveAttribute("href", "#contact");
  });
});
