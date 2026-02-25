import { cn, useTheme } from "@zenithui/utils"
import { useEffect, useMemo, useState } from "react"
import type { CountDownTimerProps } from "./types"

const CountDownTimer: React.FC<CountDownTimerProps> = ({
  startTime,
  className = "",
  description = "",
  type = "seconds",
  duration = 5,
  format = "without-names",
  descriptionClassName = "",
  theme = "auto",
  onExpired,
}) => {
  const [timeLeft, setTimeLeft] = useState("")

  const hookTheme = useTheme()
  const themeClass = useMemo(
    () => (theme === "auto" ? hookTheme : theme === "dark" ? "dark" : ""),
    [theme, hookTheme],
  )

  useEffect(() => {
    const startDate = new Date(startTime)

    // Convert duration into milliseconds based on type
    const durationMs =
      type === "seconds"
        ? duration * 1000
        : type === "minutes"
          ? duration * 60 * 1000
          : duration * 60 * 60 * 1000

    const endDate = new Date(startDate.getTime() + durationMs)

    const interval = setInterval(() => {
      const now = new Date()
      const diff = endDate.getTime() - now.getTime()

      if (diff <= 0) {
        clearInterval(interval)
        if (format === "with-names") {
          setTimeLeft("00 hours 00 minutes 00 seconds")
        } else {
          if (onExpired) {
            onExpired(true)
          }
          setTimeLeft("00 : 00 : 00")
        }
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (format === "with-names") {
        setTimeLeft(
          `${String(hours).padStart(2, "0")} hours ${String(minutes).padStart(
            2,
            "0",
          )} minutes ${String(seconds).padStart(2, "0")} seconds`,
        )
      } else {
        setTimeLeft(
          `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
            2,
            "0",
          )} : ${String(seconds).padStart(2, "0")}`,
        )
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime, type, duration, format, onExpired])

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
