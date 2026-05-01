import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NthLetterChallenge } from "@/components/challenges/NthLetterChallenge";
import { describe, it, expect } from "vitest";

type WrapperProps = {
  children: ReactNode;
};

const wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

describe("NthLetterChallenge", () => {
  it("renders default words", () => {
    render(<NthLetterChallenge />, { wrapper });

    expect(screen.getByDisplayValue("yoda")).toBeInTheDocument();
    expect(screen.getByDisplayValue("best")).toBeInTheDocument();
    expect(screen.getByDisplayValue("has")).toBeInTheDocument();
  });

  it("decodes with default words", async () => {
    const user = userEvent.setup();
    render(<NthLetterChallenge />, { wrapper });

    await user.click(screen.getByRole("button", { name: /decode/i }));

    await waitFor(() => {
      expect(screen.getByText(/secret word: yes/i)).toBeInTheDocument();
    });
  });

  it("shows breakdown letters", async () => {
    const user = userEvent.setup();
    render(<NthLetterChallenge />, { wrapper });

    await user.click(screen.getByRole("button", { name: /decode/i }));

    await waitFor(() => {
      expect(screen.getByText("y")).toBeInTheDocument();
      expect(screen.getByText("e")).toBeInTheDocument();
      expect(screen.getByText("s")).toBeInTheDocument();
    });
  });

  it("adds a new word input", async () => {
    const user = userEvent.setup();
    render(<NthLetterChallenge />, { wrapper });

    await user.click(screen.getByRole("button", { name: "+" }));

    const inputs = screen.getAllByPlaceholderText(/word \d+/i);
    expect(inputs).toHaveLength(4);
    expect(inputs[3]).toHaveValue("");
  });

  it("does not allow removing the last word", async () => {
    const user = userEvent.setup();
    render(<NthLetterChallenge />, { wrapper });

    const removeButtons = screen.getAllByRole("button", { name: "x" });

    await user.click(removeButtons[2]);
    await user.click(removeButtons[1]);

    const remainingRemoveButtons = screen.getAllByRole("button", { name: "x" });
    expect(remainingRemoveButtons).toHaveLength(1);
    expect(remainingRemoveButtons[0]).toBeDisabled();
  });

  it("clears result when editing words", async () => {
    const user = userEvent.setup();
    render(<NthLetterChallenge />, { wrapper });

    await user.click(screen.getByRole("button", { name: /decode/i }));

    await waitFor(() => {
      expect(screen.getByText(/secret word: yes/i)).toBeInTheDocument();
    });

    const firstInput = screen.getByDisplayValue("yoda");
    await user.type(firstInput, "s");

    await waitFor(() => {
      expect(screen.queryByText(/secret word: yes/i)).not.toBeInTheDocument();
    });
  });
});
