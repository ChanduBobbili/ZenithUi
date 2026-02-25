"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accessibility, Paintbrush, Zap, Code2 } from "lucide-react"
import { useHomeTheme, THEME_TRANSITION } from "../../lib/homeTheme"
import { MOTION, containerVariants, itemVariants } from "../../lib/homeMotion"

const features = [
  {
    icon: Accessibility,
    emoji: "♿",
    title: "Accessible",
    description: "WAI-ARIA compliant. Built for all users.",
  },
  {
    icon: Paintbrush,
    emoji: "🎨",
    title: "Customizable",
    description: "CSS variables + Tailwind-ready theming.",
  },
  {
    icon: Zap,
    emoji: "📦",
    title: "Lightweight",
    description: "Tree-shakeable. Import only what you need.",
  },
  {
    icon: Code2,
    emoji: "🔷",
    title: "TypeScript",
    description: "Full types and IntelliSense across every component.",
  },
]

export default function FeaturePillars() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })
  const THEME = useHomeTheme()

  return (
    <section
      className="relative z-10 flex w-full flex-col items-center px-6 py-24"
      style={{ backgroundColor: THEME.bg.page, transition: THEME_TRANSITION }}
    >
      <motion.div
        ref={ref}
        className="mx-auto w-full max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          variants={itemVariants}
          className="mb-16 text-center"
        >
          <h2
            className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl"
            style={{ color: THEME.text.primary, transition: THEME_TRANSITION }}
          >
            Why ZenithUi?
          </h2>
          <p
            className="mx-auto max-w-xl text-lg"
            style={{
              color: THEME.text.secondary,
              transition: THEME_TRANSITION,
            }}
          >
            Accessible, lightweight, and built for modern React applications.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx.toString()}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                borderColor: THEME.border.accent,
                boxShadow: THEME.shadow.glow,
              }}
              transition={MOTION.snappy}
              className="relative flex flex-col rounded-2xl border p-6"
              style={{
                backgroundColor: THEME.bg.card,
                borderColor: THEME.border.default,
                transition: THEME_TRANSITION,
              }}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 shadow-xl">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3
                className="mb-3 text-xl font-bold"
                style={{
                  color: THEME.text.primary,
                  transition: THEME_TRANSITION,
                }}
              >
                {feature.title}
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{
                  color: THEME.text.secondary,
                  transition: THEME_TRANSITION,
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
