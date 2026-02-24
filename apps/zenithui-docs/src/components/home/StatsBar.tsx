"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useHomeTheme, THEME_TRANSITION } from "../../lib/homeTheme"
import { containerVariants, itemVariants } from "../../lib/homeMotion"

interface StatItemProps {
  label: string
  prefix?: string
  suffix?: string
  value?: number
}

function StatItem({ label, prefix = "", suffix = "", value }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })
  const THEME = useHomeTheme()

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    duration: 2000,
  })

  useEffect(() => {
    if (isInView && value !== undefined) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    if (value === undefined) return
    return springValue.on("change", (latest) => {
      if (numRef.current) {
        numRef.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`
      }
    })
  }, [springValue, prefix, suffix, value])

  return (
    <motion.div
      ref={ref}
      className="flex shrink-0 grow flex-col items-center justify-center px-4 py-6"
      variants={itemVariants}
      style={{ transition: THEME_TRANSITION }}
    >
      <div
        className="mb-2 text-3xl font-bold tracking-tight"
        style={{ color: THEME.text.primary, transition: THEME_TRANSITION }}
      >
        {value !== undefined ? (
          <span ref={numRef}>
            {prefix}0{suffix}
          </span>
        ) : (
          <span>{label}</span>
        )}
      </div>
      {value !== undefined && (
        <div
          className="text-sm font-medium tracking-wide"
          style={{ color: THEME.text.secondary, transition: THEME_TRANSITION }}
        >
          {label}
        </div>
      )}
    </motion.div>
  )
}

export default function StatsBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })
  const THEME = useHomeTheme()

  return (
    <section
      className="relative z-10 w-full border-y"
      style={{
        backgroundColor: THEME.bg.subtle,
        borderColor: THEME.border.default,
        transition: THEME_TRANSITION,
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          className="grid grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0"
          style={{ borderColor: THEME.border.default }}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <StatItem
            value={6}
            suffix="+"
            label="Components"
          />
          <StatItem label="TypeScript First" />
          <StatItem label="MIT License" />
          <StatItem label="Accessible" />
        </motion.div>
      </div>
    </section>
  )
}
