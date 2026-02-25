"use client"

import { useHomeTheme, THEME_TRANSITION } from "@/lib/homeTheme"
import HeroSection from "@/components/home/HeroSection"
import StatsBar from "@/components/home/StatsBar"
import ComponentShowcase from "@/components/home/ComponentShowcase"
import FeaturePillars from "@/components/home/FeaturePillars"
import FooterCTA from "@/components/home/FooterCTA"
import ThemeToggleButton from "@/components/home/ThemeToggleButton"

export default function IndexPage() {
  const THEME = useHomeTheme()

  return (
    <div
      className="flex min-h-screen flex-col font-sans selection:bg-indigo-500/30"
      style={{
        backgroundColor: THEME.bg.page,
        color: THEME.text.primary,
        transition: THEME_TRANSITION,
      }}
    >
      <ThemeToggleButton />
      <HeroSection />
      <StatsBar />
      <ComponentShowcase />
      <FeaturePillars />
      {/* <QuickStart /> */}
      <FooterCTA />
    </div>
  )
}
