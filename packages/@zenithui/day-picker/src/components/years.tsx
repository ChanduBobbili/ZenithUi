import { format, setYear, getYear } from "date-fns"
import { useMemo } from "react"
import { useDayPicker } from "./../hooks/use-day-picker"
import { cn } from "@zenithui/utils"

export function DayPickerYears() {
  const { currentMonth, classNames, setState, setCurrentMonth } = useDayPicker()

  const years = useMemo(() => {
    const endYear = getYear(currentMonth)
    return Array.from({ length: 12 }, (_, i) =>
      setYear(currentMonth, endYear - (11 - i)),
    )
  }, [currentMonth])

  return (
    <div className={cn("zenithui-months", classNames?.months)}>
      {years.map((year) => (
        <div
          key={`zenithui-year-${format(year, "yyyy")}`}
          data-month={format(year, "yyyy")}
          className={cn("zenithui-day", classNames?.day)}
          onClick={() => {
            setCurrentMonth(year)
            setState("month")
          }}
        >
          {format(year, "yyyy")}
        </div>
      ))}
    </div>
  )
}
