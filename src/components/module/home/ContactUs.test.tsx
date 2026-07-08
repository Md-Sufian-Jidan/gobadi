import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactUs from "@/components/module/home/ContactUs";

describe("ContactUs", () => {
  it("renders contact details and form fields", () => {
    render(<ContactUs />);

    expect(document.getElementById("contact")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /Let's stay connected/i })).toBeInTheDocument();
    expect(screen.getByText("ceo.gobaadi@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("+8801911418977")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send Message/i })).toBeInTheDocument();
    expect(screen.getByText("Follow Us On")).toBeInTheDocument();
  });
});
