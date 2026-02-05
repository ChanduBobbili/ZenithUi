"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const defaultVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3 } },
}

type SectionWrapperProps = {
  children: React.ReactNode
  className?: string
  as?: "section" | "div"
}

export function SectionWrapper({
  children,
  className,
  as: Component = "section",
}: SectionWrapperProps) {
  const MotionComponent = motion[Component] as typeof motion.section
  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={defaultVariants}
      className={cn(className)}
    >
      {children}
    </MotionComponent>
  )
}
