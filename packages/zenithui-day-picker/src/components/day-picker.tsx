import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import * as React from "react"

interface DayPickerProps {
  selected: Date
  onSelect: (date: Date) => void
}

const DayPicker: React.FC<DayPickerProps> = ({ selected, onSelect }) => {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(selected)

  const days = React.useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(currentMonth)),
      end: endOfWeek(endOfMonth(currentMonth)),
    })
  }, [currentMonth])

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const handleSelectDate = (date: Date) => {
    if (!isSameMonth(date, currentMonth)) {
      setCurrentMonth(startOfMonth(date))
    }
    if (onSelect) onSelect(date)
  }

  return (
    <div className="w-72 rounded-lg bg-white p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={handlePrevMonth}>p</button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={handleNextMonth}>n</button>
      </div>
      <div className="grid grid-cols-7 text-center text-sm text-gray-500">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="font-medium"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1">
        {days.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => handleSelectDate(day)}
            className={`rounded-full p-2 text-sm ${
              selected &&
              format(selected, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            } ${!isSameMonth(day, currentMonth) ? "opacity-50" : ""}`}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DayPicker
