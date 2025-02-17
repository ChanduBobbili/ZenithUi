import { addMonths, format, subMonths } from "date-fns"
import { cn } from "../../utils"
import Arrow from "../assets/arrow.svg?react"

interface DayPickerHeaderProps {
  currentMonth: Date
  setCurrentMonth: (date: Date) => void
  classNames?: {
    header?: string
    prevMonthButton?: string
    nextMonthButton?: string
    monthCaption?: string
  }
}

export function DayPickerHeader({
  currentMonth,
  setCurrentMonth,
  classNames,
}: DayPickerHeaderProps) {
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  return (
    <div className={cn("calendar-header", classNames?.header)}>
      <button
        onClick={handlePrevMonth}
        className={cn("nav-button", classNames?.prevMonthButton)}
      >
        <Arrow className="arrow-icon left" />
      </button>
      <h2 className={cn("month-caption", classNames?.monthCaption)}>
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <button
        onClick={handleNextMonth}
        className={cn("nav-button", classNames?.nextMonthButton)}
      >
        <Arrow className="arrow-icon" />
      </button>
    </div>
  )
}
