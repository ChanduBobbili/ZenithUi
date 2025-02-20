"use client"

import { useState } from "react"
import { TimePicker } from "zenithui-time-picker"

export default function TimePickerDemo() {
  const [time, setTime] = useState<string>("")

  return (
    <TimePicker
      time={time}
      onTimeChange={(time) => setTime(time)}
      align="center"
      side="right"
      theme="light"
    />
  )
}
