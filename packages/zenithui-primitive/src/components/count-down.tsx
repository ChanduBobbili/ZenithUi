"use client"

import React, { useEffect, useState } from "react"
import { cn } from "../utils"

/**
 * Props for the CountdownTimer component.
 */
export type CountDownTimerProps = {
  /**
   * The start time for the countdown timer in a string format (ISO).
   */
  startTime: string

  /**
   * The format of the countdown display.
   * Can be "with-names" to include labels (e.g., hours, minutes) or "without-names" for a plain numeric display.
   * @default "without-names"
   */
  format?: "with-names" | "without-names"

  /**
   * Additional CSS class name(s) to apply to the countdown timer component.
   */
  className?: string

  /**
   * Description text to display alongside the countdown timer.
   */
  description?: string

  /**
   * The number of minutes for the countdown timer.
   * @default 5
   */
  minutes?: number

  /**
   * Additional CSS class name(s) to apply to the description text.
   */
  descriptionClassName?: string

  /**
   * Callback function to be called when the countdown timer expires.
   * @param isExpire - A boolean indicating whether the timer has expired.
   */
  onExpired?: (isExpire: boolean) => void
}

const CountDownTimer: React.FC<CountDownTimerProps> = ({
  startTime,
  className = "",
  description = "",
  minutes = 5,
  format = "without-names",
  descriptionClassName = "",
  onExpired,
}) => {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const startDate = new Date(startTime)
    const endDate = new Date(startDate.getTime() + minutes * 60 * 1000) // Add 5 minutes

    const interval = setInterval(() => {
      const now = new Date()
      const diff = endDate.getTime() - now.getTime()

      if (diff <= 0) {
        clearInterval(interval)
        if (format === "with-names") {
          setTimeLeft("00 minutes 00 seconds")
        } else {
          if (onExpired) {
            onExpired(true)
          }
          setTimeLeft("00 : 00")
        }
        return
      }

      const minutes = Math.floor(diff / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (format === "with-names") {
        setTimeLeft(
          `${String(minutes).padStart(2, "0")} minutes ${String(
            seconds,
          ).padStart(2, "0")} seconds`,
        )
      } else {
        setTimeLeft(
          `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`,
        )
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  return description ? (
    <span className={cn("text-red-500", className)}>
      {timeLeft}{" "}
      <span className={cn("text-white", descriptionClassName)}>
        {description}
      </span>
    </span>
  ) : (
    <span className={cn("text-red-500", className)}>{`${timeLeft}`}</span>
  )
}

export default CountDownTimer
