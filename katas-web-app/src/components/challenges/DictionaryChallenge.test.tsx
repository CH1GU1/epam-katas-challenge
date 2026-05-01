import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DictionaryChallenge } from "@/components/challenges/DictionaryChallenge";
import { describe, expect, it } from "vitest";

type WrapperProps = {
  children: React.ReactNode;
};

const wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

describe("DictionaryChallenge", () => {
  it("renders inputs and buttons", () => {
    render(<DictionaryChallenge />, { wrapper });

    expect(screen.getByPlaceholderText("Word")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Definition")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search word")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("adds a word successfully", async () => {
    const user = userEvent.setup();
    render(<DictionaryChallenge />, { wrapper });

    await user.type(screen.getByPlaceholderText("Word"), "Apple");
    await user.type(screen.getByPlaceholderText("Definition"), "A fruit");
    await user.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() => {
      expect(screen.getByText("Word added!")).toBeInTheDocument();
    });
  });

  it("looks up a word that exists", async () => {
    const user = userEvent.setup();
    render(<DictionaryChallenge />, { wrapper });

    await user.type(screen.getByPlaceholderText("Search word"), "Apple");
    await user.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(screen.getByText("Found")).toBeInTheDocument();
      expect(screen.getByText("A fruit")).toBeInTheDocument();
    });
  });

  it("shows not found when a word is missing", async () => {
    const user = userEvent.setup();
    render(<DictionaryChallenge />, { wrapper });

    await user.type(screen.getByPlaceholderText("Search word"), "Banana");
    await user.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(screen.getAllByText("Not found").length).toBeGreaterThan(0);
    });
  });

  it("disables add button when inputs are empty", () => {
    render(<DictionaryChallenge />, { wrapper });

    expect(screen.getByRole("button", { name: "Add" })).toBeDisabled();
  });
});
