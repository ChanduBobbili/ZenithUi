"use client"

import { useState } from "react"
import { TimePicker } from "@zenithui/time-picker"
import CodePreview from "../code-preview"

export default function TimePickerDemo() {
  const [time, setTime] = useState<string>("16:13")

  return (
    <CodePreview
      code={{
        code: `
import { TimePicker } from "@zenithui/time-picker"

const [time, setTime] = useState<string>("${time}")

<TimePicker
  time={time}
  onTimeChange={(time) => setTime(time)}
  align="center"
  side="right"
  theme="light"
/>
        `,
        language: "jsx",
      }}
    >
      <TimePicker
        time={time}
        onTimeChange={(time) => setTime(time)}
        align="center"
        side="right"
        theme="light"
      />
    </CodePreview>
  )
}
