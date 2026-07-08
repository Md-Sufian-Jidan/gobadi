import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ResuableTitleDescription from "@/components/shared/ResuableTitleDescription";

describe("ResuableTitleDescription", () => {
  it("renders subtitle, title, and description", () => {
    render(
      <ResuableTitleDescription
        subTitle="ABOUT US"
        title="Who we are"
        description="Platform description"
      />
    );

    expect(screen.getByText("ABOUT US")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Who we are" })).toBeInTheDocument();
    expect(screen.getByText("Platform description")).toBeInTheDocument();
  });

  it("aligns content to the left when requested", () => {
    const { container } = render(
      <ResuableTitleDescription
        subTitle="OUR VISION"
        title="Vision title"
        description="Vision description"
        align="left"
      />
    );

    expect(container.firstChild).toHaveClass("items-start", "text-left");
  });
});
