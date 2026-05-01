import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ShoppingChallenge } from "@/components/challenges/ShoppingChallenge";
import { describe, it, expect } from "vitest";

type WrapperProps = {
  children: ReactNode;
};

const wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

describe("ShoppingChallenge", () => {
  it("renders catalog items", () => {
    render(<ShoppingChallenge />, { wrapper });

    expect(screen.getByLabelText(/socks - \$5/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/shoes - \$60/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sweater - \$30/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hat - \$15/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gloves - \$20/i)).toBeInTheDocument();
  });

  it("disables calculate button with no items selected", () => {
    render(<ShoppingChallenge />, { wrapper });

    expect(
      screen.getByRole("button", { name: /calculate total/i }),
    ).toBeDisabled();
  });

  it("selects items and calculates total", async () => {
    const user = userEvent.setup();
    render(<ShoppingChallenge />, { wrapper });

    await user.click(screen.getByLabelText(/socks - \$5/i));
    await user.click(screen.getByLabelText(/shoes - \$60/i));
    await user.click(screen.getByRole("button", { name: /calculate total/i }));

    await waitFor(() => {
      expect(screen.getByText(/total: \$70\.85/i)).toBeInTheDocument();
    });
  });

  it("shows subtotal, tax, and total after calculating", async () => {
    const user = userEvent.setup();
    render(<ShoppingChallenge />, { wrapper });

    await user.click(screen.getByLabelText(/socks - \$5/i));
    await user.click(screen.getByLabelText(/shoes - \$60/i));
    await user.click(screen.getByRole("button", { name: /calculate total/i }));

    await waitFor(() => {
      expect(screen.getByText(/subtotal: \$65\.00/i)).toBeInTheDocument();
      expect(screen.getByText(/tax applied: \$5\.85/i)).toBeInTheDocument();
      expect(screen.getByText(/total: \$70\.85/i)).toBeInTheDocument();
    });
  });

  it("updates tax label when slider changes", async () => {
    const user = userEvent.setup();
    render(<ShoppingChallenge />, { wrapper });

    const slider = screen.getByRole("slider");
    slider.focus();

    await user.keyboard("{ArrowRight}");

    await waitFor(() => {
      expect(screen.getByText(/tax: 10%/i)).toBeInTheDocument();
    });
  });
});
