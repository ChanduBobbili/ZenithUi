"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useHomeTheme, THEME_TRANSITION } from "../../lib/homeTheme"
import { MOTION } from "../../lib/homeMotion"
import { useTheme } from "nextra-theme-docs"

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const THEME = useHomeTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-20 right-6 z-50 flex items-center justify-center rounded-full p-2"
      style={{
        backgroundColor: THEME.bg.subtle,
        border: `1px solid ${THEME.border.default}`,
        transition: THEME_TRANSITION,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={MOTION.snappy}
      aria-label="Toggle theme"
    >
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        {resolvedTheme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={MOTION.snappy}
          >
            <Sun
              className="h-5 w-5"
              style={{ color: THEME.text.primary }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={MOTION.snappy}
          >
            <Moon
              className="h-5 w-5"
              style={{ color: THEME.text.primary }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
