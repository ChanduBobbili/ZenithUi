import { setMonth, format } from "date-fns"
import { useMemo } from "react"
import { useDayPicker } from "./../hooks/use-day-picker"
import { cn } from "@zenithui/utils"

export function DayPickerMonths() {
  const { currentMonth, classNames, setState, setCurrentMonth } = useDayPicker()

  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => setMonth(currentMonth, i))
  }, [currentMonth])

  return (
    <div className={cn("zenithui-months", classNames?.months)}>
      {months.map((month) => (
        <button
          type="button"
          key={`zenithui-month-${month}`}
          data-month={format(month, "M")}
          className={cn("zenithui-day", classNames?.day)}
          onClick={() => {
            setCurrentMonth(month)
            setState("day")
          }}
        >
          {format(month, "MMMM")}
        </button>
      ))}
    </div>
  )
}
