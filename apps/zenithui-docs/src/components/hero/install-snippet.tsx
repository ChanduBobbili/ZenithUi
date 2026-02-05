"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Terminal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const INSTALL_CMD = "pnpm add @zenithui/day-picker"
const PROMPT = "$ "

export default function InstallSnippet() {
  const [displayedCmd, setDisplayedCmd] = useState("")
  const [typingDone, setTypingDone] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    if (expanded && !startTyping) setStartTyping(true)
  }, [expanded, startTyping])

  useEffect(() => {
    if (!startTyping) return
    if (displayedCmd.length >= INSTALL_CMD.length) {
      setTypingDone(true)
      return
    }
    const t = setTimeout(() => {
      setDisplayedCmd(INSTALL_CMD.slice(0, displayedCmd.length + 1))
    }, 40)
    return () => clearTimeout(t)
  }, [startTyping, displayedCmd])

  return (
    <>
      {/* Floating terminal window - appears above FAB when expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
              "border-border fixed right-6 bottom-24 z-50 flex flex-col overflow-hidden rounded-xl border bg-zinc-800 shadow-2xl sm:right-8 dark:bg-zinc-950",
              maximized
                ? "top-20 right-4 left-4 min-h-[min(70vh,28rem)] w-[calc(100vw-2rem)] sm:top-24 sm:right-8 sm:left-8 sm:w-[calc(100vw-4rem)]"
                : "min-h-[20rem] w-[min(calc(100vw-3rem),32rem)] max-w-2xl sm:min-h-[22rem]",
            )}
          >
            {/* Window title bar - red: close, green: maximize */}
            <div className="flex shrink-0 items-center gap-3 border-b border-zinc-700 bg-zinc-700/80 px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/80">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="size-3 shrink-0 rounded-full bg-red-500 transition-opacity hover:opacity-80 focus:opacity-80 focus:outline-none"
                  aria-label="Close terminal"
                />
                <button
                  type="button"
                  onClick={() => setMaximized((m) => !m)}
                  className="size-3 shrink-0 rounded-full bg-emerald-500 transition-opacity hover:opacity-80 focus:opacity-80 focus:outline-none"
                  aria-label={
                    maximized ? "Restore terminal" : "Maximize terminal"
                  }
                />
              </div>
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                terminal
              </span>
            </div>
            {/* Terminal content - fills container */}
            <div className="flex min-h-0 flex-1 flex-col p-2">
              <div className="flex min-h-0 flex-1 overflow-auto rounded-lg border border-zinc-600 bg-zinc-900/50 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900">
                <div className="flex min-h-full gap-1 px-4 py-3">
                  <span className="text-emerald-400 dark:text-emerald-400">
                    {PROMPT}
                  </span>
                  <span className="text-zinc-100 dark:text-zinc-100">
                    {displayedCmd}
                  </span>
                  {typingDone && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="inline-block h-4 w-2 bg-zinc-100 dark:bg-zinc-100"
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB - open terminal (hidden when terminal is expanded) */}
      <AnimatePresence>
        {!expanded && (
          <motion.button
            key="fab"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            type="button"
            onClick={() => setExpanded(true)}
            className={cn(
              "fixed right-6 bottom-6 z-40 flex size-14 items-center justify-center rounded-full shadow-lg transition-colors sm:right-8",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90 focus:ring-primary/20 focus:ring-2 focus:ring-offset-2 focus:outline-none",
            )}
            aria-label="Open install terminal"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Terminal
              className="size-7"
              aria-hidden
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
