"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Github, Heart, Code2 } from "lucide-react"
import { motion } from "framer-motion"
import { SectionWrapper } from "./section-wrapper"

function FloatingOrb({
  delay,
  x,
  y,
  size,
}: {
  delay: number
  x: string
  y: string
  size: number
}) {
  return (
    <motion.span
      className="bg-primary/10 dark:bg-primary/20 absolute rounded-full"
      style={{ width: size, height: size, left: x, top: y }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        delay,
      }}
    />
  )
}

export default function OpenSourceSection() {
  return (
    <SectionWrapper className="border-border from-background to-muted/20 relative overflow-hidden border-t bg-gradient-to-b px-4 py-14">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <FloatingOrb
          delay={0}
          x="10%"
          y="20%"
          size={120}
        />
        <FloatingOrb
          delay={1}
          x="75%"
          y="60%"
          size={80}
        />
        <FloatingOrb
          delay={2}
          x="50%"
          y="80%"
          size={60}
        />
        <FloatingOrb
          delay={0.5}
          x="85%"
          y="15%"
          size={100}
        />
        <FloatingOrb
          delay={1.5}
          x="15%"
          y="70%"
          size={70}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary mb-4 flex justify-center"
        >
          <motion.span
            className="bg-primary/10 flex size-14 items-center justify-center rounded-2xl"
            whileHover={{ rotate: 5, scale: 1.05 }}
          >
            <Github
              className="size-8"
              aria-hidden
            />
          </motion.span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-foreground mb-2 text-xl font-bold sm:text-2xl"
        >
          Open source
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-6 text-sm leading-relaxed sm:text-base"
        >
          ZenithUi is free and open source. We welcome contributions — bug
          reports, docs, and pull requests. Whether you fix a typo or add a
          feature, your help makes the library better for everyone.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="https://github.com/ChanduBobbili/ZenithUi"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "border-primary/30 bg-primary/5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-semibold transition-all",
              "hover:bg-primary hover:text-primary-foreground hover:border-primary",
            )}
          >
            <Code2
              className="size-4"
              aria-hidden
            />
            Contributions welcome
          </Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mt-4 flex items-center justify-center gap-1.5 text-xs"
        >
          <Heart
            className="size-3.5 text-red-500"
            aria-hidden
          />
          Built with care for the React community
        </motion.p>
      </div>
    </SectionWrapper>
  )
}
