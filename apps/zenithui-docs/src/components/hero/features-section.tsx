"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  CheckCircle2,
  Palette,
  Code2,
  Package,
  type LucideIcon,
} from "lucide-react"
import { motion } from "framer-motion"
import { SectionWrapper } from "./section-wrapper"

const POPPED_Z = 50

const CARD_OFFSET_X = 56
const CARD_OFFSET_Y = 24
const CARD_WIDTH = 200
const CARD_HEIGHT = 140

const features: {
  title: string
  shortDescription: string
  description: string
  icon: LucideIcon
  bgColor: string
  textColor: string
}[] = [
  {
    title: "Accessible",
    shortDescription: "ARIA, keyboard, screen readers",
    description:
      "Built with ARIA patterns, keyboard navigation, and screen reader support so everyone can use your app.",
    icon: CheckCircle2,
    bgColor: "bg-cyan-500",
    textColor: "text-white",
  },
  {
    title: "Customizable",
    shortDescription: "Tailwind, CSS, design system",
    description:
      "Style with Tailwind, CSS modules, or your design system. Components accept className and style props.",
    icon: Palette,
    bgColor: "bg-pink-500",
    textColor: "text-white",
  },
  {
    title: "TypeScript",
    shortDescription: "Full types, fewer bugs",
    description:
      "Full type definitions and generics. Better autocomplete and fewer runtime errors out of the box.",
    icon: Code2,
    bgColor: "bg-amber-400",
    textColor: "text-gray-900",
  },
  {
    title: "Tree-shakeable",
    shortDescription: "Import only what you use",
    description:
      "Import only what you use. Modern ESM builds keep your bundle small and fast.",
    icon: Package,
    bgColor: "bg-orange-500",
    textColor: "text-white",
  },
]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const card = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
}

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <SectionWrapper className="border-border relative overflow-hidden border-t px-4 py-14">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 -z-10 opacity-40 dark:opacity-30"
        aria-hidden
      >
        <div className="from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 absolute inset-0 bg-gradient-to-br via-transparent dark:via-transparent" />
        <motion.div
          className="to-primary/10 dark:to-primary/10 absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent dark:from-cyan-400/10"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="from-primary/10 dark:from-primary/15 absolute inset-0 bg-gradient-to-bl via-transparent to-cyan-500/10 dark:to-cyan-400/10"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-foreground mb-2 text-center text-lg font-bold sm:text-xl"
        >
          Why ZenithUi
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-muted-foreground mb-10 text-center text-sm"
        >
          Built for modern React apps that care about DX and accessibility.
        </motion.p>

        {/* Overlapping staggered cards (like reference image) */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="relative mx-auto flex justify-center"
          style={{
            minHeight: CARD_HEIGHT + (features.length - 1) * CARD_OFFSET_Y,
            width: "100%",
            maxWidth: CARD_WIDTH + (features.length - 1) * CARD_OFFSET_X + 48,
          }}
        >
          {features.map(
            (
              { title, shortDescription, icon: Icon, bgColor, textColor },
              index,
            ) => {
              const isPopped = hoveredIndex === index
              return (
                <motion.div
                  key={title}
                  variants={card}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    scale: isPopped ? 1.08 : 1,
                    zIndex: isPopped ? POPPED_Z : index,
                  }}
                  className={cn(
                    "absolute top-0 left-0 flex cursor-default flex-col rounded-2xl p-4 shadow-lg",
                    "min-w-0 border-0 transition-shadow duration-200",
                    isPopped && "shadow-xl ring-2 ring-white/20",
                    bgColor,
                    textColor,
                  )}
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    left: index * CARD_OFFSET_X,
                    top: index * CARD_OFFSET_Y,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className="size-5 shrink-0 opacity-90"
                      aria-hidden
                    />
                    <h3 className="font-semibold">{title}</h3>
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm opacity-90">
                    {shortDescription}
                  </p>
                </motion.div>
              )
            },
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
