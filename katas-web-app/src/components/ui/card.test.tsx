import { render, screen } from "@testing-library/react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { describe, it, expect } from "vitest";

describe("Card", () => {
  it("renders the card container", () => {
    const { container } = render(
      <Card>
        <div>Content</div>
      </Card>,
    );

    const card = container.firstElementChild;
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveAttribute("data-size", "default");
  });

  it("supports size variant", () => {
    render(<Card size="sm">Small</Card>);

    const card = screen.getByText("Small").closest("div");
    expect(card).toHaveAttribute("data-size", "sm");
  });

  it("renders header pieces", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
      </Card>,
    );

    expect(screen.getByText("Title")).toHaveAttribute(
      "data-slot",
      "card-title",
    );
    expect(screen.getByText("Description")).toHaveAttribute(
      "data-slot",
      "card-description",
    );
    expect(screen.getByText("Action")).toHaveAttribute(
      "data-slot",
      "card-action",
    );
  });

  it("renders content and footer", () => {
    render(
      <Card>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByText("Body")).toHaveAttribute(
      "data-slot",
      "card-content",
    );
    expect(screen.getByText("Footer")).toHaveAttribute(
      "data-slot",
      "card-footer",
    );
  });
});
