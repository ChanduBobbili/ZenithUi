import { useEffect, useMemo, useState } from "react"
import { UseTimePickerProps } from "./types"
import {
  convertTo24Hour,
  generateTimeOptions,
  getInitialHour,
  getInitialPeriod,
} from "./utils"

export const useTimePicker = ({
  initialTime,
  format = "12-hours",
  onTimeChange,
}: UseTimePickerProps) => {
  const is12HourFormat = useMemo(() => format === "12-hours", [format])

  const [hour, setHour] = useState(() =>
    is12HourFormat
      ? getInitialHour(initialTime)
      : initialTime?.split(":")?.[0] || "00",
  )
  const [minute, setMinute] = useState(initialTime?.split(":")?.[1] || "00")
  const [period, setPeriod] = useState(
    is12HourFormat ? getInitialPeriod(initialTime) : "",
  )

  const hours = useMemo(
    () => generateTimeOptions(is12HourFormat ? 1 : 0, is12HourFormat ? 12 : 23),
    [is12HourFormat],
  )
  const minutes = useMemo(() => generateTimeOptions(0, 59), [])
  const periods = is12HourFormat ? ["AM", "PM"] : []

  useEffect(() => {
    let newTime = ""
    if (is12HourFormat) {
      newTime = `${convertTo24Hour(hour, period)}:${minute}`
    } else {
      newTime = `${hour}:${minute}`
    }

    if (newTime !== initialTime) {
      onTimeChange?.(newTime)
    }
  }, [hour, minute, period, initialTime, is12HourFormat, onTimeChange])

  return {
    hour,
    minute,
    period,
    setHour,
    setMinute,
    setPeriod,
    hours,
    minutes,
    periods,
  }
}
