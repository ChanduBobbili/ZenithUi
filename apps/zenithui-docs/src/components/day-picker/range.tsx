"use client"
import { useState } from "react"
import { DayPicker } from "zenithui-day-picker"
import CodePreview from "../code-preview"

export default function RangeDayPicker() {
  const after7Days = new Date()
  after7Days.setDate(new Date().getDate() + 7)
  const [selectedDate, setSelectedDate] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: after7Days,
  })
  return (
    <CodePreview
      code={{
        code: `
import { useState } from "react";
import { DayPicker } from "zenithui-day-picker";

const App = () => {
  const after7Days = new Date()
  after7Days.setDate(new Date().getDate() + 7)
  const [selectedDate, setSelectedDate] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: after7Days,
  })

  return (
    <div>
      <DayPicker
        mode="range"
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
    </div>
  );
};

export default App;
        `,
        language: "jsx",
      }}
    >
      <DayPicker
        mode="range"
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
    </CodePreview>
  )
}
