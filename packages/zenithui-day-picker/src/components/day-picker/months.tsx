import { setMonth, format } from "date-fns"
import { useMemo } from "react"
import { DayPickerState } from "./index"

interface DayPickerMonthsProps {
  currentMonth: Date
  setCurrentMonth: (date: Date) => void
  setState: (state: DayPickerState) => void
}

export function DayPickerMonths({
  currentMonth,
  setCurrentMonth,
  setState,
}: DayPickerMonthsProps) {
  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => setMonth(currentMonth, i))
  }, [currentMonth])

  return (
    <div className="zenithui-months">
      {months.map((month) => (
        <div
          key={format(month, "M")}
          data-month={format(month, "M")}
          className="zenithui-day"
          onClick={() => {
            setCurrentMonth(month)
            setState("day")
          }}
        >
          {format(month, "MMMM")}
        </div>
      ))}
    </div>
  )
}
