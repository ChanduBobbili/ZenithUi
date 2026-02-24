export const MOTION = {
  spring: { type: "spring" as const, stiffness: 80, damping: 18 },
  snappy: { type: "spring" as const, stiffness: 200, damping: 22 },
  smooth: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  theme: { duration: 0.3, ease: "easeInOut" as const },
  stagger: 0.1,
}

export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: MOTION.stagger } },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: MOTION.smooth },
}
