"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Check, Copy } from "lucide-react"
import { useHomeTheme, THEME_TRANSITION } from "../../lib/homeTheme"
import { MOTION, containerVariants, itemVariants } from "../../lib/homeMotion"

/* ── Code Block ────────────────────────────────────────── */

function CodeBlock({ code, language }: { code: string; language: string }) {
  const THEME = useHomeTheme()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="group relative mt-4 overflow-hidden rounded-xl"
      style={{
        backgroundColor: THEME.code.bg,
        border: `1px solid ${THEME.code.border}`,
        transition: THEME_TRANSITION,
      }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-2 text-xs font-medium"
        style={{
          borderColor: THEME.code.border,
          color: THEME.text.secondary,
          transition: THEME_TRANSITION,
        }}
      >
        <span>{language}</span>
        <motion.button
          onClick={handleCopy}
          className="rounded-md p-1"
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
      <div
        className="overflow-x-auto p-4 font-mono text-sm"
        style={{ color: THEME.code.text }}
      >
        <code>{code}</code>
      </div>
    </div>
  )
}

/* ── Steps ─────────────────────────────────────────────── */

const steps = [
  {
    title: "Install",
    code: "npm install @zenithui/day-picker",
    lang: "bash",
  },
  {
    title: "Import",
    code: 'import { DayPicker } from "@zenithui/day-picker"\nimport "@zenithui/day-picker/style.css"',
    lang: "typescript",
  },
  {
    title: "Use",
    code: "const [date, setDate] = useState<Date>()\n\nexport default function App() {\n  return <DayPicker selected={date} onSelect={setDate} />\n}",
    lang: "tsx",
  },
]

/* ── Integration Strip SVG Logos ──────────────────────── */

function NextJsLogo() {
  return (
    <svg
      viewBox="0 0 180 180"
      className="h-10 w-10"
      aria-label="Next.js"
    >
      <title>Next.js</title>
      <mask
        id="nj"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="180"
        height="180"
      >
        <circle
          cx="90"
          cy="90"
          r="90"
          fill="white"
        />
      </mask>
      <g mask="url(#nj)">
        <circle
          cx="90"
          cy="90"
          r="90"
          fill="currentColor"
        />
        <path
          d="M149.508 157.52L69.142 54H54v71.97h12.114V69.384l73.885 95.461A90.304 90.304 0 00149.508 157.52z"
          fill="url(#nj_g1)"
        />
        <rect
          x="115"
          y="54"
          width="12"
          height="72"
          fill="url(#nj_g2)"
        />
      </g>
      <defs>
        <linearGradient
          id="nj_g1"
          x1="109"
          y1="116.5"
          x2="144.5"
          y2="160.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop
            offset="1"
            stopColor="white"
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          id="nj_g2"
          x1="121"
          y1="54"
          x2="120.799"
          y2="106.875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop
            offset="1"
            stopColor="white"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>
    </svg>
  )
}

function ViteLogo() {
  return (
    <svg
      viewBox="0 0 410 404"
      fill="none"
      className="h-10 w-10"
      aria-label="Vite"
    >
      <title>Vite</title>
      <path
        d="M399.641 59.525L215.643 388.545c-3.799 6.793-13.559 6.833-17.415.073L10.582 59.556c-4.2-7.367 2.099-16.29 10.447-14.798L205.223 77.682c1.175.21 2.378.208 3.553-.006L389.119 44.81c8.32-1.52 14.649 7.334 10.522 14.715z"
        fill="url(#vite_a)"
      />
      <path
        d="M292.965 1.473L156.801 28.255c-2.238.439-3.895 2.335-4.03 4.611l-8.376 134.478c-.197 3.273 2.863 5.704 6.009 4.79l38.556-11.716c3.58-1.046 6.861 2.19 5.871 5.786l-11.83 45.088c-1.039 3.755 2.527 7.035 6.19 5.727l25.344-9.193c3.672-1.311 7.245 1.986 6.187 5.746L200.86 282.889c-1.548 5.4 5.777 8.285 8.533 3.486l1.999-3.44L315.434 57.817c1.829-3.906-1.876-8.049-5.886-6.822l-39.749 12.189c-3.705 1.131-7.133-2.102-6.128-5.844l19.095-52.828c1.012-3.765-2.455-7.015-6.178-5.841l16.377 2.802z"
        fill="url(#vite_b)"
      />
      <defs>
        <linearGradient
          id="vite_a"
          x1="6"
          y1="33"
          x2="235"
          y2="344"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#41D1FF" />
          <stop
            offset="1"
            stopColor="#BD34FE"
          />
        </linearGradient>
        <linearGradient
          id="vite_b"
          x1="194.651"
          y1="8.818"
          x2="236.076"
          y2="292.989"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBD4F" />
          <stop
            offset="1"
            stopColor="#FF9500"
          />
        </linearGradient>
      </defs>
    </svg>
  )
}

function TailwindLogo() {
  return (
    <svg
      viewBox="0 0 54 33"
      className="h-10 w-10"
      aria-label="Tailwind CSS"
    >
      <title>Tailwind CSS</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
        fill="currentColor"
      />
    </svg>
  )
}

function ReactLogo() {
  return (
    <svg
      viewBox="-11.5 -10.232 23 20.463"
      className="h-10 w-10"
      aria-label="React"
    >
      <title>React</title>
      <circle
        r="2.05"
        fill="currentColor"
      />
      <g
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      >
        <ellipse
          rx="11"
          ry="4.2"
        />
        <ellipse
          rx="11"
          ry="4.2"
          transform="rotate(60)"
        />
        <ellipse
          rx="11"
          ry="4.2"
          transform="rotate(120)"
        />
      </g>
    </svg>
  )
}

/* ── QuickStart Component ──────────────────────────────── */

export default function QuickStart() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })
  const THEME = useHomeTheme()

  const integrationRef = useRef(null)
  const integrationInView = useInView(integrationRef, {
    once: true,
    amount: 0.25,
  })

  return (
    <section
      className="relative z-10 flex w-full flex-col items-center border-t px-6 py-24"
      style={{
        backgroundColor: THEME.bg.page,
        borderColor: THEME.border.default,
        transition: THEME_TRANSITION,
      }}
    >
      <motion.div
        ref={ref}
        className="mx-auto w-full max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          variants={itemVariants}
          className="mb-4 text-center"
        >
          <h2
            className="mb-4 text-3xl font-extrabold tracking-tight md:text-5xl"
            style={{ color: THEME.text.primary, transition: THEME_TRANSITION }}
          >
            Up and running in 60 seconds
          </h2>
          <p
            className="mx-auto mb-16 max-w-xl text-lg"
            style={{
              color: THEME.text.secondary,
              transition: THEME_TRANSITION,
            }}
          >
            Install the DayPicker and start picking dates immediately.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting dashed line (Desktop only) */}
          <div className="absolute top-[28px] right-[10%] left-[10%] z-0 hidden h-[2px] md:block">
            <svg
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            >
              <title>Connecting line</title>
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke={THEME.border.hover}
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <motion.line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke={THEME.border.accent}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
              />
            </svg>
          </div>

          <motion.div
            className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12"
            variants={containerVariants}
          >
            {steps.map((step) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="flex flex-col"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border text-xl font-bold shadow-lg"
                    style={{
                      backgroundColor: THEME.bg.card,
                      color: THEME.text.primary,
                      borderColor: THEME.border.default,
                      transition: THEME_TRANSITION,
                    }}
                  >
                    {steps.indexOf(step) + 1}
                  </div>
                  <h3
                    className="text-xl font-bold"
                    style={{
                      color: THEME.text.primary,
                      transition: THEME_TRANSITION,
                    }}
                  >
                    {step.title}
                  </h3>
                </div>
                <CodeBlock
                  code={step.code}
                  language={step.lang}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Integration Strip */}
        <motion.div
          ref={integrationRef}
          className="mt-32 flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate={integrationInView ? "visible" : "hidden"}
        >
          <motion.p
            variants={itemVariants}
            className="mb-10 text-sm font-medium tracking-widest uppercase"
            style={{ color: THEME.text.muted, transition: THEME_TRANSITION }}
          >
            Works seamlessly with
          </motion.p>
          <motion.div
            className="flex items-end justify-center gap-16 sm:gap-20"
            variants={containerVariants}
          >
            {[
              { name: "Next.js", icon: <NextJsLogo /> },
              { name: "Vite", icon: <ViteLogo /> },
              { name: "Tailwind CSS", icon: <TailwindLogo /> },
              { name: "React", icon: <ReactLogo /> },
            ].map((item) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                className="flex flex-col items-center gap-3"
                whileHover={{ scale: 1.1 }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100"
                  style={{ color: THEME.text.secondary }}
                >
                  {item.icon}
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: THEME.text.muted }}
                >
                  {item.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
