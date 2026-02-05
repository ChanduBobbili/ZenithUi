"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import type { ReactNode } from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export default function TiltCard({
  children,
  className,
  x: sx = 3,
  y: sy = 3,
  entryAnimation = true,
  onMouseMove: onMouseMoveProp,
  onMouseLeave: onMouseLeaveProp,
}: {
  children: ReactNode
  className?: string
  x?: number
  y?: number
  entryAnimation?: boolean
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [sx, -sx]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(x, [0, 1], [-sy, sy]), {
    stiffness: 200,
    damping: 20,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return

    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    x.set(px)
    y.set(py)
    onMouseMoveProp?.(e)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    x.set(0.5)
    y.set(0.5)
    onMouseLeaveProp?.(e)
  }

  useEffect(() => {
    x.set(0.5)
    y.set(0.5)
  }, [x, y])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      initial={entryAnimation ? { opacity: 0, scale: 0.75 } : false}
      animate={entryAnimation ? { opacity: 1, scale: 1 } : false}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-shadow will-change-transform hover:shadow-md",
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
