"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Copy, ChevronDown, Github } from "lucide-react"
import { useHomeTheme, THEME_TRANSITION } from "../../lib/homeTheme"
import { MOTION } from "../../lib/homeMotion"
import AnimatedBackground from "./AnimatedBackground"

const INSTALL_CMD = "npm install @zenithui/day-picker"

export default function HeroSection() {
  const THEME = useHomeTheme()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_CMD)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: MOTION.smooth },
  }

  return (
    <section
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center"
      style={{ backgroundColor: THEME.bg.page, transition: THEME_TRANSITION }}
    >
      <AnimatedBackground />

      <motion.div
        className="relative z-10 flex max-w-4xl flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge with continuous shimmer */}
        <motion.div
          variants={itemVariants}
          className="relative mb-8 inline-flex items-center gap-2 overflow-hidden rounded-full border px-4 py-1.5 text-sm font-medium"
          style={{
            borderColor: THEME.border.default,
            backgroundColor: THEME.bg.subtle,
            transition: THEME_TRANSITION,
          }}
        >
          {/* Shimmer sweep — continuous infinite loop */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: THEME.gradient.shimmer,
              borderRadius: "inherit",
            }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "linear",
              repeatDelay: 0.8,
            }}
          />
          <span
            className="relative z-10 flex items-center gap-1.5"
            style={{
              color: THEME.text.secondary,
              transition: THEME_TRANSITION,
            }}
          >
            <span className="text-yellow-400">⚡</span> Now with FAB Component
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-6 space-y-2 text-6xl font-extrabold tracking-tight md:text-8xl">
          <motion.h1
            variants={itemVariants}
            style={{
              backgroundImage: THEME.gradient.text,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              transition: THEME_TRANSITION,
            }}
          >
            Build Beautiful
          </motion.h1>
          <motion.h1
            variants={itemVariants}
            style={{ color: THEME.text.primary, transition: THEME_TRANSITION }}
          >
            React Interfaces
          </motion.h1>
          <motion.h1
            variants={itemVariants}
            style={{
              color: THEME.text.secondary,
              transition: THEME_TRANSITION,
            }}
          >
            Without the Struggle.
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-2xl text-lg sm:text-xl lg:text-2xl"
          style={{ color: THEME.text.secondary, transition: THEME_TRANSITION }}
        >
          ZenithUi is a collection of accessible, customizable React components.
          Drop in, style it, ship it.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          variants={itemVariants}
          className="mb-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <motion.a
            target="_blank"
            rel="noopener noreferrer"
            href="/docs"
            className="flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white lg:text-lg"
            style={{ backgroundColor: THEME.accent.primary }}
            whileHover={{
              scale: 1.05,
              boxShadow: THEME.shadow.glow,
            }}
            whileTap={{ scale: 0.95 }}
            transition={MOTION.spring}
          >
            Get Started &rarr;
          </motion.a>
          <motion.a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ChanduBobbili/ZenithUi"
            className="flex items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-base font-semibold lg:text-lg"
            style={{
              color: THEME.text.primary,
              borderColor: THEME.border.default,
              backgroundColor: THEME.bg.glass,
              transition: THEME_TRANSITION,
            }}
            whileHover={{ scale: 1.05, backgroundColor: THEME.bg.subtle }}
            whileTap={{ scale: 0.95 }}
            transition={MOTION.spring}
          >
            <Github className="h-5 w-5" /> GitHub ↗
          </motion.a>
        </motion.div>

        {/* Install Strip */}
        <motion.div
          variants={itemVariants}
          className="mx-auto flex w-full max-w-sm items-center gap-4 rounded-xl border px-4 py-3 font-mono text-sm"
          style={{
            backgroundColor: THEME.code.bg,
            borderColor: THEME.code.border,
            transition: THEME_TRANSITION,
          }}
        >
          <span
            style={{ color: THEME.text.muted }}
            className="select-none"
          >
            $
          </span>
          <span
            className="flex-1 text-left"
            style={{ color: THEME.code.text }}
          >
            {INSTALL_CMD}
          </span>
          <motion.button
            onClick={handleCopy}
            className="rounded-md p-1.5"
            style={{ backgroundColor: THEME.bg.glass }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Copy install command"
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={MOTION.spring}
                >
                  <Check className="h-4 w-4 text-emerald-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={MOTION.spring}
                >
                  <Copy
                    className="h-4 w-4"
                    style={{ color: THEME.text.secondary }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown
            className="h-6 w-6"
            style={{ color: THEME.text.muted }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
