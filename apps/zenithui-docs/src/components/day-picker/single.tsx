"use client"

import { useState } from "react"
import { DayPicker } from "@zenithui/day-picker"
import "@zenithui/day-picker/style.css"
import CodePreview from "../code-preview"

export default function SingleDayPicker() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <CodePreview
      code={{
        code: `
import { useState } from "react";
import { DayPicker } from "@zenithui/day-picker";
import "@zenithui/day-picker/style.css"

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <DayPicker
        mode="single"
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
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
    </CodePreview>
  )
}
