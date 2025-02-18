import { format, setYear, getYear } from "date-fns"
import { useMemo } from "react"
import { DayPickerState } from "./index"

interface DayPickerYearsProps {
  currentMonth: Date
  setCurrentMonth: (date: Date) => void
  setState: (state: DayPickerState) => void
}

export function DayPickerYears({
  currentMonth,
  setCurrentMonth,
  setState,
}: DayPickerYearsProps) {
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
          key={format(year, "yyyy")}
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
