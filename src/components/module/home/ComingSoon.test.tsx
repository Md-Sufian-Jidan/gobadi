import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ComingSoon from "@/components/module/home/ComingSoon";

describe("ComingSoon", () => {
  it("renders coming soon headline and platform message", () => {
    render(<ComingSoon />);

    expect(screen.getByRole("heading", { level: 2, name: /Something New Is/i })).toBeInTheDocument();
    expect(screen.getByText("Coming")).toBeInTheDocument();
    expect(screen.getByText("S")).toBeInTheDocument();
    expect(screen.getByText("N")).toBeInTheDocument();
    expect(screen.getByText(/Our new and improved digital livestock platform/i)).toBeInTheDocument();
    expect(screen.getByAltText("Gobadi mobile application dashboard preview")).toBeInTheDocument();
  });
});
