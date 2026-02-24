"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Copy, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useHomeTheme, THEME_TRANSITION } from "../../lib/homeTheme"
import { MOTION } from "../../lib/homeMotion"

export interface CodeTab {
  id: string
  label: string
  code: string
}

export interface ComponentPreviewCardProps {
  activeTabId: string
  component: React.ReactNode
  codeTabs: CodeTab[]
  docsHref: string
}

export default function ComponentPreviewCard({
  activeTabId,
  component,
  codeTabs,
  docsHref,
}: ComponentPreviewCardProps) {
  const THEME = useHomeTheme()
  const [activeCodeTab, setActiveCodeTab] = useState(codeTabs[0].id)
  const [copied, setCopied] = useState(false)

  const activeSnippet =
    codeTabs.find((t) => t.id === activeCodeTab) ?? codeTabs[0]

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  /** Simple syntax colorizer — highlights keywords, strings, and comments */
  const colorize = (code: string) => {
    const parts: React.ReactNode[] = []
    const lines = code.split("\n")

    lines.forEach((line, li) => {
      if (li > 0) parts.push("\n")

      // Comment line
      if (line.trimStart().startsWith("//")) {
        parts.push(
          <span
            key={`c-${li}`}
            style={{ color: THEME.code.comment }}
          >
            {line}
          </span>,
        )
        return
      }

      // Preserve leading whitespace
      const leadingWs = line.match(/^\s*/)?.[0] ?? ""
      if (leadingWs) parts.push(leadingWs)

      const rest = line.slice(leadingWs.length)
      const regex =
        /(import|from|export|const|function|return|default)|(["'`][^"'`]*["'`])|(\s+)|(\S+)/g
      let m: RegExpExecArray | null = null

      while ((m = regex.exec(rest)) !== null) {
        if (m[1]) {
          parts.push(
            <span
              key={`k-${li}-${m.index}`}
              style={{ color: THEME.code.keyword }}
            >
              {m[0]}
            </span>,
          )
        } else if (m[2]) {
          parts.push(
            <span
              key={`s-${li}-${m.index}`}
              style={{ color: THEME.code.string }}
            >
              {m[0]}
            </span>,
          )
        } else if (m[3]) {
          parts.push(m[0])
        } else {
          parts.push(
            <span
              key={`t-${li}-${m.index}`}
              style={{ color: THEME.code.text }}
            >
              {m[0]}
            </span>,
          )
        }
      }
    })

    return parts
  }

  return (
    <motion.div
      className="flex w-full flex-col overflow-hidden rounded-2xl border lg:flex-row"
      style={{
        backgroundColor: THEME.bg.card,
        borderColor: THEME.border.default,
        transition: THEME_TRANSITION,
      }}
      key={activeTabId}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={MOTION.smooth}
      whileHover={{
        borderColor: THEME.border.accent,
        boxShadow: THEME.shadow.glow,
      }}
    >
      {/* Left panel: Live Component (60%) */}
      <div
        className="relative flex min-h-[380px] w-full items-center justify-center overflow-hidden border-b p-8 md:p-12 lg:w-[60%] lg:border-r lg:border-b-0"
        style={{
          borderColor: THEME.border.default,
          backgroundColor: THEME.bg.card,
          transition: THEME_TRANSITION,
        }}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 flex w-full items-center justify-center">
          {component}
        </div>
      </div>

      {/* Right panel: Install + Import only (40%) */}
      <div
        className="flex w-full flex-col lg:w-[40%]"
        style={{
          backgroundColor: THEME.code.bg,
          transition: THEME_TRANSITION,
        }}
      >
        {/* Tabs */}
        <div
          className="flex overflow-x-auto border-b px-4"
          style={{ borderColor: THEME.code.border }}
        >
          {codeTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCodeTab(tab.id)}
              className="relative px-4 py-3 text-sm font-medium whitespace-nowrap"
              style={{
                color:
                  activeCodeTab === tab.id
                    ? THEME.text.primary
                    : THEME.text.muted,
                transition: THEME_TRANSITION,
              }}
            >
              {tab.label}
              {activeCodeTab === tab.id && (
                <motion.div
                  layoutId="activeCodeTab"
                  className="absolute right-0 bottom-0 left-0 h-0.5"
                  style={{ backgroundColor: THEME.accent.primary }}
                />
              )}
            </button>
          ))}
          <div className="ml-auto flex items-center px-2">
            <motion.button
              onClick={handleCopy}
              className="rounded-md p-1.5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Copy code"
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={MOTION.spring}
                  >
                    <Check className="h-4 w-4 text-emerald-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={MOTION.spring}
                  >
                    <Copy
                      className="h-4 w-4"
                      style={{ color: THEME.text.secondary }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Code View */}
        <div className="max-h-[400px] flex-1 overflow-auto p-4">
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeCodeTab}
              className="font-mono text-sm"
              style={{ color: THEME.code.text }}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
            >
              <code>{colorize(activeSnippet.code)}</code>
            </motion.pre>
          </AnimatePresence>
        </div>

        {/* Read the docs link */}
        <div
          className="border-t px-4 py-3"
          style={{ borderColor: THEME.code.border }}
        >
          <Link href={docsHref}>
            <motion.span
              className="inline-flex items-center gap-1 text-sm font-medium"
              style={{ color: THEME.accent.primary }}
              whileHover="hover"
            >
              Read the docs
              <motion.span
                variants={{ hover: { x: 4 } }}
                transition={MOTION.snappy}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
