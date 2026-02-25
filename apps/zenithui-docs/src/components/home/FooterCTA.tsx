"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Star } from "lucide-react"
import { useHomeTheme, THEME_TRANSITION } from "../../lib/homeTheme"
import { MOTION, containerVariants, itemVariants } from "../../lib/homeMotion"

export default function FooterCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })
  const THEME = useHomeTheme()
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    fetch("https://api.github.com/repos/ChanduBobbili/ZenithUi")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch")
        return res.json()
      })
      .then((data) => setStars(data.stargazers_count))
      .catch(() => setStars(null))
  }, [])

  return (
    <section
      className="relative flex w-full flex-col items-center justify-center overflow-hidden border-t px-6 py-32"
      style={{
        backgroundColor: THEME.bg.page,
        borderColor: THEME.border.default,
        transition: THEME_TRANSITION,
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: THEME.gradient.subtle }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 60%)",
        }}
      />

      <motion.div
        ref={ref}
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={itemVariants}
          className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl"
          style={{ color: THEME.text.primary, transition: THEME_TRANSITION }}
        >
          Start building with ZenithUi
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-xl text-xl"
          style={{ color: THEME.text.secondary, transition: THEME_TRANSITION }}
        >
          Free. Open source. No strings attached.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mb-8 flex flex-col items-center gap-4 sm:flex-row"
        >
          <motion.a
            target="_blank"
            rel="noopener noreferrer"
            href="/docs"
            className="flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white lg:text-lg"
            style={{ backgroundColor: THEME.accent.primary }}
            whileHover={{ scale: 1.05, boxShadow: THEME.shadow.glow }}
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

        {stars !== null && (
          <motion.a
            variants={itemVariants}
            href="https://github.com/ChanduBobbili/ZenithUi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
            style={{
              borderColor: THEME.border.default,
              color: THEME.text.secondary,
              backgroundColor: THEME.bg.card,
              transition: THEME_TRANSITION,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span>★ {stars.toLocaleString()} Stars on GitHub</span>
          </motion.a>
        )}
      </motion.div>
    </section>
  )
}
