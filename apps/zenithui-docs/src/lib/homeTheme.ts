"use client"

import { useTheme } from "nextra-theme-docs"
import { useState, useEffect } from "react"

export interface HomeTheme {
  bg: {
    page: string
    card: string
    subtle: string
    glass: string
  }
  border: {
    default: string
    hover: string
    accent: string
  }
  text: {
    primary: string
    secondary: string
    muted: string
  }
  accent: {
    primary: string
    secondary: string
    success: string
    warning: string
  }
  gradient: {
    hero: string
    subtle: string
    text: string
    glow: string
    shimmer: string
  }
  code: {
    bg: string
    border: string
    text: string
    keyword: string
    string: string
    comment: string
    variable: string
  }
  shadow: {
    card: string
    glow: string
    hover: string
  }
}

export const DARK_THEME: HomeTheme = {
  bg: {
    page: "#0a0a0a",
    card: "#111111",
    subtle: "#1a1a1a",
    glass: "rgba(255,255,255,0.04)",
  },
  border: {
    default: "rgba(255,255,255,0.08)",
    hover: "rgba(255,255,255,0.16)",
    accent: "rgba(99,102,241,0.45)",
  },
  text: {
    primary: "#fafafa",
    secondary: "#a1a1aa",
    muted: "#52525b",
  },
  accent: {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
  },
  gradient: {
    hero: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
    subtle:
      "linear-gradient(180deg, rgba(99,102,241,0.10) 0%, transparent 100%)",
    text: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
    glow: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)",
    shimmer:
      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
  },
  code: {
    bg: "#0d0d0d",
    border: "rgba(255,255,255,0.06)",
    text: "#e2e8f0",
    keyword: "#818cf8",
    string: "#34d399",
    comment: "#52525b",
    variable: "#f9a8d4",
  },
  shadow: {
    card: "0 4px 24px rgba(0,0,0,0.4)",
    glow: "0 0 32px rgba(99,102,241,0.2)",
    hover: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
  },
}

export const LIGHT_THEME: HomeTheme = {
  bg: {
    page: "#ffffff",
    card: "#f8f8f8",
    subtle: "#f0f0f0",
    glass: "rgba(0,0,0,0.02)",
  },
  border: {
    default: "rgba(0,0,0,0.08)",
    hover: "rgba(0,0,0,0.16)",
    accent: "rgba(99,102,241,0.35)",
  },
  text: {
    primary: "#09090b",
    secondary: "#71717a",
    muted: "#a1a1aa",
  },
  accent: {
    primary: "#4f46e5",
    secondary: "#7c3aed",
    success: "#059669",
    warning: "#d97706",
  },
  gradient: {
    hero: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #0891b2 100%)",
    subtle:
      "linear-gradient(180deg, rgba(99,102,241,0.06) 0%, transparent 100%)",
    text: "linear-gradient(90deg, #4f46e5, #7c3aed, #0891b2)",
    glow: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.10) 0%, transparent 70%)",
    shimmer:
      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
  },
  code: {
    bg: "#f4f4f5",
    border: "rgba(0,0,0,0.06)",
    text: "#1e293b",
    keyword: "#4f46e5",
    string: "#059669",
    comment: "#a1a1aa",
    variable: "#be185d",
  },
  shadow: {
    card: "0 2px 12px rgba(0,0,0,0.06)",
    glow: "0 0 32px rgba(99,102,241,0.10)",
    hover: "0 8px 32px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)",
  },
}

export function useHomeTheme(): HomeTheme {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR and initial hydration, always return DARK_THEME
  // to ensure server/client HTML match. After mount, use resolvedTheme.
  if (!mounted) return DARK_THEME

  return resolvedTheme === "dark" ? DARK_THEME : LIGHT_THEME
}

/** CSS transition string for smooth theme switching */
export const THEME_TRANSITION =
  "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
