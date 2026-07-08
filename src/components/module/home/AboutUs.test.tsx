import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutUs from "@/components/module/home/AboutUs";

describe("AboutUs", () => {
  it("renders about section content and gallery images", () => {
    render(<AboutUs />);

    expect(document.getElementById("about")).toBeInTheDocument();
    expect(screen.getByText("ABOUT US")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Who we are" })).toBeInTheDocument();
    expect(screen.getByAltText("Farmer smiling holding a fluffy lamb")).toBeInTheDocument();
    expect(screen.getByAltText("Veterinarian examining cows inside a barn")).toBeInTheDocument();
    expect(screen.getByAltText("Farmer holding white turkey poultry")).toBeInTheDocument();
  });
});
