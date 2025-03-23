import { setMonth, format } from "date-fns"
import { useMemo } from "react"
import { useDayPicker } from "../../hooks/use-day-picker"

export function DayPickerMonths() {
  const { currentMonth, setState, setCurrentMonth } = useDayPicker()

  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => setMonth(currentMonth, i))
  }, [currentMonth])

  return (
    <div className="zenithui-months">
      {months.map((month) => (
        <div
          key={`zenithui-month-${month}`}
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
