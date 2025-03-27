"use client"

import { cn } from "@/lib/utils"
import { TypewriterEffect } from "../ui/typewriter-effect"
import Link from "next/link"

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
        "relative flex flex-col items-center justify-center gap-10",
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
      <Link
        href="/docs"
        className={cn(
          "rounded-md border-2 px-10 py-3 shadow-lg transition-transform duration-500 ease-in-out hover:scale-105 active:animate-ping",
          "hover:shadow-3xl border-sky-600/50 shadow-sky-500 hover:bg-sky-800 hover:text-white",
          "dark:hover:shadow-3xl dark:border-sky-600/50 dark:bg-sky-950 dark:shadow-sky-500 dark:hover:bg-sky-200 dark:hover:text-sky-800",
        )}
      >
        Get Started
      </Link>
    </div>
  )
}
