"use client"

import ComponentStrip from "@/components/hero/component-strip"
import FeaturesSection from "@/components/hero/features-section"
import Hero from "@/components/hero/hero"
import InstallSnippet from "@/components/hero/install-snippet"
import OpenSourceSection from "@/components/hero/open-source-section"

export default function IndexPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <InstallSnippet />
      <ComponentStrip />
      <FeaturesSection />
      <OpenSourceSection />
    </div>
  )
}
