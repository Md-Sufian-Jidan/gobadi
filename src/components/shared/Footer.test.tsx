import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "@/components/shared/Footer";

describe("Footer", () => {
  it("renders footer navigation and copyright", () => {
    render(<Footer />);

    expect(screen.getByText("গবাদি")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Footer navigation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About Us" })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: "Our Vision" })).toHaveAttribute("href", "#our-vision");
    expect(screen.getByRole("link", { name: "Contact Us" })).toHaveAttribute("href", "#contact");
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });
});
