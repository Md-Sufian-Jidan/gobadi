import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "@/components/module/home/Hero";

describe("Hero", () => {
  it("renders the main headline and launch callout", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { level: 1, name: /Where Livestock Meets Intelligence/i })).toBeInTheDocument();
    expect(screen.getByText(/STAY/i)).toBeInTheDocument();
    expect(screen.getByText(/Tuned/i)).toBeInTheDocument();
    expect(screen.getByText("We are about to")).toBeInTheDocument();
    expect(screen.getByText("Launch")).toBeInTheDocument();
    expect(
      screen.getByText(/AI-powered digital platform transforming the livestock eco-system/i)
    ).toBeInTheDocument();
  });
});
