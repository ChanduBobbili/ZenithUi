"use client"

import Link from "next/link"
import type * as React from "react"
import { useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Calendar, Clock, Bell, ImageIcon, Zap, LayoutGrid } from "lucide-react"
import { motion } from "framer-motion"
import TiltCard from "@/components/ui/tilt-card"
import { SectionWrapper } from "./section-wrapper"

const components = [
  {
    name: "Day Picker",
    href: "/docs/docs/day-picker",
    icon: Calendar,
    description: "Single & range date selection",
  },
  {
    name: "Time Picker",
    href: "/docs/docs/time-picker",
    icon: Clock,
    description: "12/24h, intervals, countdown",
  },
  {
    name: "Toast",
    href: "/docs/docs/toast",
    icon: Bell,
    description: "Notifications & queue",
  },
  {
    name: "Lightbox",
    href: "/docs/docs/light-box",
    icon: ImageIcon,
    description: "Images & media viewer",
  },
  {
    name: "FAB",
    href: "/docs/docs/fab",
    icon: Zap,
    description: "Floating action menu",
  },
] as const

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function GlowCard({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    setIsHovered(true)
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  return (
    <Link
      href={href}
      className={cn("block", className)}
    >
      <TiltCard
        entryAnimation={false}
        x={3}
        y={3}
        className={cn(
          "group relative min-h-[140px]",
          "border-border/60 bg-card border-2",
          "border-primary/20 shadow-sm transition-shadow duration-200",
          "hover:border-primary/40 dark:border-primary/15 dark:hover:border-primary/30 hover:shadow-lg",
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative flex h-full min-h-[140px] flex-col items-center justify-center gap-3 p-5 text-center"
          ref={cardRef}
        >
          {/* Cursor-following blurred circle */}
          {isHovered && (
            <div
              className="bg-primary/20 dark:bg-primary/25 pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
              style={{
                width: 120,
                height: 120,
                left: position.x,
                top: position.y,
              }}
            />
          )}
          {children}
        </div>
      </TiltCard>
    </Link>
  )
}

export default function ComponentStrip() {
  return (
    <SectionWrapper className="border-border bg-background border-t px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-foreground mb-2 text-center text-lg font-bold sm:text-xl"
        >
          Components
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-8 text-center text-sm"
        >
          Pick what you need. Each package is documented and tree-shakeable.
        </motion.p>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 gap-4 [perspective:1000px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {components.map(({ name, href, icon: Icon, description }) => (
            <motion.div
              key={name}
              variants={item}
              className="flex"
            >
              <GlowCard
                href={href}
                className="w-full"
              >
                <motion.span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-xl",
                    "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
                    "transition-colors duration-200",
                  )}
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon
                    className="size-6"
                    aria-hidden
                  />
                </motion.span>
                <span className="text-foreground font-semibold">{name}</span>
                <span className="text-muted-foreground text-xs leading-tight">
                  {description}
                </span>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex justify-center"
        >
          <Link
            href="/docs"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <LayoutGrid
              className="size-4"
              aria-hidden
            />
            View all documentation
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
