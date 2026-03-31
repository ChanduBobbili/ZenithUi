import { setMonth, format, getYear } from "date-fns"
import { useMemo } from "react"
import { useDayPicker } from "./../hooks/use-day-picker"
import { cn } from "@zenithui/utils"

export function DayPickerMonths() {
  const { currentMonth, classNames, setState, setCurrentMonth } = useDayPicker()

  // FIX(#11): Depend on year only, not the full currentMonth Date.
  // The month list is the same for any month within the same year,
  // so recomputing on every month navigation was unnecessary.
  const year = getYear(currentMonth)
  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => setMonth(new Date(year, 0), i))
  }, [year])

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
