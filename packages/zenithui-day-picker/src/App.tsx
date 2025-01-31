import { useState } from "react"
import DayPicker from "./components/day-picker"

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  return (
    <>
      <DayPicker
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
    </>
  )
}

export default App
