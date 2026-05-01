import type { ReactNode } from "react"

import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { Toaster } from "@/components/ui/sonner"

type CapturedToasterProps = {
  theme?: string
  className?: string
  icons?: Record<string, ReactNode>
  toastOptions?: unknown
  style?: Record<string, string>
}

let capturedProps: CapturedToasterProps | null = null

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark" }),
}))

vi.mock("sonner", () => ({
  Toaster: (props: CapturedToasterProps) => {
    capturedProps = props
    return <div data-testid="sonner" />
  },
}))

describe("Toaster", () => {
  it("renders Sonner with theme from next-themes", () => {
    render(<Toaster />)

    expect(screen.getByTestId("sonner")).toBeInTheDocument()
    expect(capturedProps?.theme).toBe("dark")
  })

  it("passes base className and icons", () => {
    render(<Toaster />)

    expect(capturedProps?.className).toBe("toaster group")
    expect(capturedProps?.icons).toBeDefined()
    expect(capturedProps?.icons?.success).toBeTruthy()
    expect(capturedProps?.icons?.error).toBeTruthy()
  })
})
