import { format, setYear, getYear } from "date-fns"
import { useMemo } from "react"
import { useDayPicker } from "./../hooks/use-day-picker"

export function DayPickerYears() {
  const { currentMonth, setState, setCurrentMonth } = useDayPicker()

  const years = useMemo(() => {
    const endYear = getYear(currentMonth)
    return Array.from({ length: 12 }, (_, i) =>
      setYear(currentMonth, endYear - (11 - i)),
    )
  }, [currentMonth])

  return (
    <div className="zenithui-months">
      {years.map((year) => (
        <div
          key={`zenithui-year-${format(year, "yyyy")}`}
          data-month={format(year, "yyyy")}
          className="zenithui-day"
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
