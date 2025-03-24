"use client"

import { useEffect, useMemo, useState } from "react"
import { useTheme, cn } from "@zenithui/utils"
import { CountDownTimerProps } from "./types"

const CountDownTimer: React.FC<CountDownTimerProps> = ({
  startTime,
  className = "",
  description = "",
  minutes = 5,
  format = "without-names",
  descriptionClassName = "",
  theme = "auto",
  onExpired,
}) => {
  const [timeLeft, setTimeLeft] = useState("")

  const hookTheme = useTheme()
  const themeClass = useMemo(
    () => (theme === "auto" ? hookTheme : theme === "dark" ? "dark" : ""),
    [theme],
  )

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
    <span className={cn(themeClass, "count-down-text", className)}>
      {timeLeft} <span className={cn(descriptionClassName)}>{description}</span>
    </span>
  ) : (
    <span
      className={cn(themeClass, "count-down-text", className)}
    >{`${timeLeft}`}</span>
  )
}

export default CountDownTimer
