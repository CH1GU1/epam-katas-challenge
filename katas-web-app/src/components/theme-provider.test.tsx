import type { ReactNode } from "react"

import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { ThemeProvider } from "@/components/theme-provider"

type CapturedThemeProps = {
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  children?: ReactNode
}

let capturedProps: CapturedThemeProps | null = null

vi.mock("next-themes", () => ({
  ThemeProvider: (props: CapturedThemeProps) => {
    capturedProps = props
    return <div data-testid="theme-provider">{props.children}</div>
  },
}))

describe("ThemeProvider", () => {
  it("renders children", () => {
    render(
      <ThemeProvider>
        <span>Inner</span>
      </ThemeProvider>
    )

    expect(screen.getByText("Inner")).toBeInTheDocument()
  })

  it("uses default theme settings", () => {
    render(
      <ThemeProvider>
        <span>Content</span>
      </ThemeProvider>
    )

    expect(capturedProps?.attribute).toBe("class")
    expect(capturedProps?.defaultTheme).toBe("dark")
    expect(capturedProps?.enableSystem).toBe(false)
  })
})
