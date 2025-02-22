"use client"

import { cn } from "@/lib/utils"
import { TypewriterEffect } from "../ui/typewriter-effect"

const words = [
  {
    text: "ZenithUi",
    className: "text-sky-800 dark:text-sky-800",
  },
  {
    text: "is",
  },
  {
    text: "React",
  },
  {
    text: "component",
  },
  {
    text: "library",
  },
  {
    text: "offering",
  },
  {
    text: "a",
  },
  {
    text: "collection",
  },
  {
    text: "of",
  },
  {
    text: "accessible",
  },
  {
    text: "and",
  },
  {
    text: "customizable",
  },
  {
    text: "UI",
  },
  {
    text: "components.",
  },
]

export default function Hero() {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-2",
        "mx-auto w-[99%] overflow-hidden rounded-sm bg-gradient-to-t from-sky-500 to-cyan-300",
      )}
      style={{
        height: "calc(100vh - var(--nextra-navbar-height))",
      }}
    >
      {/* <div className="absolute left-1/2 top-1/2 h-[1080px] w-3/4 -translate-x-1/2 rounded-full bg-slate-50/10"></div> */}
      <TypewriterEffect
        words={words}
        className="max-w-3/4"
      />
    </div>
  )
}
