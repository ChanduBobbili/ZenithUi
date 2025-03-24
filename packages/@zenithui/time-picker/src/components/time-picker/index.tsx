"use client"

import { useEffect, useMemo, useState } from "react"
import { TimePickerProps } from "../types"
import {
  convertTo24Hour,
  formatTime24To12,
  generateTimeOptions,
  getInitialHour,
  getInitialPeriod,
} from "../utils"
import { useTheme, cn, useDeviceType } from "@zenithui/utils"
import { Popover, PopoverContent, PopoverTrigger } from "../popover"
import TimeScrollList from "./scroll-list"

const TimePicker: React.FC<TimePickerProps> = ({
  time,
  align = "center",
  side = "bottom",
  theme = "auto",
  alignOffset = 10,
  sideOffset = 10,
  classNames,
  onTimeChange,
  formatter = formatTime24To12,
}) => {
  const device = useDeviceType()
  const hookTheme = useTheme()
  const [hour, setHour] = useState(getInitialHour(time))
  const [minute, setMinute] = useState(time?.split(":")?.[1])
  const [period, setPeriod] = useState(getInitialPeriod(time))

  const hours = useMemo(() => generateTimeOptions(1, 12), [])
  const minutes = useMemo(() => generateTimeOptions(0, 59), [])
  const themeClass = useMemo(
    () => (theme === "auto" ? hookTheme : theme === "dark" ? "dark" : ""),
    [theme],
  )

  // Update time whenever hour, minute, or period changes
  useEffect(() => {
    const newTime = `${convertTo24Hour(hour, period)}:${minute}`
    if (newTime !== time) {
      onTimeChange(newTime)
    }
  }, [hour, minute, period, time, onTimeChange])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            themeClass,
            "zenithui-time-trigger",
            classNames?.button,
          )}
        >
          <span>{formatter(time)}</span>
          <ClockIcon />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        side={device.includes("Mobile") ? "top" : side}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        openAnimate="slide"
        closeAnimate="slide"
        className={cn(
          themeClass,
          "zenithui-time-container",
          classNames?.popoverContent,
        )}
        onWheel={(e) => e.stopPropagation()}
      >
        <TimeScrollList
          options={hours}
          value={hour}
          classNames={classNames}
          onChange={setHour}
        />
        <TimeScrollList
          options={minutes}
          value={minute}
          classNames={classNames}
          onChange={setMinute}
        />
        <TimeScrollList
          options={["AM", "PM"]}
          value={period}
          classNames={classNames}
          onChange={setPeriod}
        />
      </PopoverContent>
    </Popover>
  )
}

const ClockIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
)

export default TimePicker
