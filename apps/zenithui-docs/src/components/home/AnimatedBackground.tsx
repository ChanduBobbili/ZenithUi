"use client"

import { motion } from "framer-motion"
import { useHomeTheme } from "../../lib/homeTheme"

export default function AnimatedBackground() {
  const THEME = useHomeTheme()

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Mesh/noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: THEME.gradient.glow }}
      />

      {/* Radial gradient glow — pulsing */}
      <motion.div
        className="absolute top-[20%] left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,1) 0%, rgba(139,92,246,1) 50%, rgba(6,182,212,0) 100%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
