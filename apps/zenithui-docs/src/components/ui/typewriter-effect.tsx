"use client"

import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

const TYPE_DELAY_MS = 80
const PAUSE_AFTER_WORD_MS = 400
const RESTART_DELAY_MS = 2500

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  const charsWithClass = useMemo(
    () =>
      words.flatMap((word, wordIdx) => {
        const className = word.className ?? "text-sky-800 dark:text-sky-100"
        const chars = word.text.split("").map((char) => ({ char, className }))
        if (wordIdx < words.length - 1) chars.push({ char: " ", className })
        return chars
      }),
    [words],
  )
  const [visibleLength, setVisibleLength] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return
    if (visibleLength >= charsWithClass.length) {
      const t = setTimeout(() => setVisibleLength(0), RESTART_DELAY_MS)
      return () => clearTimeout(t)
    }
    const isSpace = charsWithClass[visibleLength]?.char === " "
    const delay = isSpace ? PAUSE_AFTER_WORD_MS : TYPE_DELAY_MS
    const t = setTimeout(() => setVisibleLength((n) => n + 1), delay)
    return () => clearTimeout(t)
  }, [isInView, visibleLength, charsWithClass])

  return (
    <div
      ref={ref}
      className={cn(
        "text-center text-xl font-bold sm:text-xl md:text-3xl lg:text-5xl",
        className,
      )}
    >
      <span className="inline">
        {charsWithClass.map(({ char, className }, index) => (
          <span
            key={`${index}-${char}`}
            className={cn(!(visibleLength > index) && "opacity-0", className)}
          >
            {char}
          </span>
        ))}
      </span>
      <motion.span
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block h-4 w-[4px] rounded-sm bg-sky-700 align-middle md:h-6 lg:h-10",
          cursorClassName,
        )}
      />
    </div>
  )
}

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    }
  })
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          const wordKey = word.text.join("") + (idx > 0 ? `-${idx}` : "")
          return (
            <div
              key={wordKey}
              className="inline-block"
            >
              {word.text.map((char, index) => (
                <span
                  key={`${wordKey}-${word.text.slice(0, index + 1).join("")}`}
                  className={cn("text-white dark:text-white", word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={cn("my-6 flex space-x-1", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 1,
        }}
      >
        <div
          className="lg:text:3xl text-xs font-bold sm:text-base md:text-xl xl:text-5xl"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,

          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={cn(
          "block h-4 w-[4px] rounded-sm bg-sky-700 sm:h-6 xl:h-12",
          cursorClassName,
        )}
      />
    </div>
  )
}
