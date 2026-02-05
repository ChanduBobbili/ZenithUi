"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight, Github } from "lucide-react"
import { TypewriterEffect } from "../ui/typewriter-effect"
import { motion } from "framer-motion"

const typewriterWords = [
  { text: "accessible,", className: "text-sky-800 dark:text-sky-100" },
  { text: "customizable" },
  { text: "React" },
  { text: "components." },
]

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl px-4 py-14 sm:gap-8 sm:py-20",
        "mx-auto w-[99%]",
        "bg-gradient-to-br from-sky-500 via-cyan-400 to-teal-400",
        "dark:from-sky-800 dark:via-cyan-900 dark:to-sky-950",
        "shadow-xl shadow-sky-500/20 dark:shadow-sky-900/30",
      )}
      style={{
        minHeight: "calc(70vh - var(--nextra-navbar-height))",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.4),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.08),transparent)]" />
      <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:gap-8">
        <h1 className="text-4xl font-bold tracking-tight text-sky-900 drop-shadow-sm sm:text-5xl md:text-6xl dark:text-white">
          ZenithUi
        </h1>
        <div className="min-h-[2.5rem] sm:min-h-[2rem]">
          <TypewriterEffect
            words={typewriterWords}
            className="max-w-3xl text-center text-base font-medium text-sky-800 sm:text-lg dark:text-sky-100"
          />
        </div>
        <p className="max-w-xl text-sm text-sky-700 sm:text-base dark:text-sky-200/90">
          Day picker, time picker, toasts, lightbox, and FAB — production-ready
          components for your app.
        </p>
        <div className="flex min-h-[44px] flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs"
            className={cn(
              "group/cta relative flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:scale-105",
              "bg-sky-900 text-white hover:bg-sky-800 dark:bg-white dark:text-sky-900 dark:hover:bg-sky-100",
            )}
          >
            {/* Animated gradient border */}
            <span
              className="absolute inset-[-2px] -z-10 rounded-[14px] bg-[length:200%_200%] opacity-100 transition-opacity group-hover/cta:opacity-100"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #0ea5e9, #06b6d4, #14b8a6, #0ea5e9)",
                animation: "gradient-border-spin 3s linear infinite",
              }}
            />
            <span className="absolute inset-[2px] z-0 rounded-[10px] bg-sky-900 group-hover/cta:bg-sky-800 dark:bg-white dark:group-hover/cta:bg-sky-100" />
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <ArrowRight
                className="size-4"
                aria-hidden
              />
            </span>
          </Link>
          <a
            href="https://github.com/ChanduBobbili/ZenithUi"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-xl border-2 border-sky-800/50 bg-white/90 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-all hover:scale-105 hover:bg-white dark:border-sky-200/50 dark:bg-sky-950/50 dark:text-sky-100 dark:hover:bg-sky-900/70",
            )}
          >
            <Github
              className="size-5"
              aria-hidden
            />
            GitHub
          </a>
        </div>
      </div>
    </motion.section>
  )
}
