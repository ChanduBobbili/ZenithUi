import * as React from "react"
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
import { cn } from "../utils"
import Arrow from "../assets/arrow.svg?react"
interface classNames {
  /**
   * The class names to apply to the calendar.
   */
  calendar: string
  /**
   * The class names to apply to the selected date.
   */
  selected: string
  /**
   * The class names to apply to the not selected date.
   */
  notSelected: string
  /**
   * The class names to apply to the header.
   */
  header: string
  /**
   * The class names to apply to the month caption.
   */
  monthCaption: string
  /**
   * The class names to apply to the previous month button.
   */
  prevMonthButton: string
  /**
   * The class names to apply to the next month button.
   */
  nextMonthButton: string
  /**
   * The class names to apply to the weekdays.
   */
  weekdays: string
  /**
   * The class names to apply to the weekday.
   */
  weekday: string
  /**
   * The class names to apply to the days.
   */
  days: string
  /**
   * The class names to apply to the day.
   */
  day: string
  /**
   * The class names to apply to the selected day.
   */
  daySelected: string
  /**
   * The class names to apply to the outside date (not in the current month).
   */
  outsideDate: string
}

interface DayPickerProps {
  /**
   * The date that is currently selected.
   */
  selected: Date
  /**
   * The function that is called when a date is selected.
   */
  onSelect: (date: Date) => void
  /**
   * The class names to apply to the day picker.
   */
  classNames?: classNames
  /**
   * Whether to hide the navigation buttons.
   */
  hideNavigation?: boolean
  /**
   * Whether to hide the weekdays.
   */
  hideWeekdays?: boolean
  /**
   * Whether to hide the outside dates.
   */
  hideOutsideDates?: boolean
}

const DayPicker: React.FC<DayPickerProps> = ({
  selected,
  onSelect,
  classNames,
  hideNavigation = false,
  hideWeekdays = false,
  hideOutsideDates = true,
}) => {
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
    <div
      className={cn(
        "w-72 rounded-lg bg-white p-4 shadow-lg",
        classNames?.calendar,
      )}
    >
      {!hideNavigation && (
        <div
          className={cn(
            "mb-4 flex items-center justify-between",
            classNames?.header,
          )}
        >
          <button
            onClick={handlePrevMonth}
            className={cn("text-sm", classNames?.prevMonthButton)}
          >
            <Arrow className="h-5 w-5 rotate-180" />
          </button>
          <h2 className={cn("text-lg font-semibold", classNames?.monthCaption)}>
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <button
            onClick={handleNextMonth}
            className={cn(
              "text-sm text-slate-950",
              classNames?.nextMonthButton,
            )}
          >
            <Arrow className="h-5 w-5" />
          </button>
        </div>
      )}
      {!hideWeekdays && (
        <div
          className={cn(
            "grid grid-cols-7 text-center text-xs text-gray-500",
            classNames?.weekdays,
          )}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className={cn("text-xs font-medium", classNames?.weekday)}
            >
              {day}
            </div>
          ))}
        </div>
      )}
      <div className={cn("mt-2 grid grid-cols-7 gap-1", classNames?.days)}>
        {days.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => handleSelectDate(day)}
            className={cn(
              "rounded-full p-2 text-sm hover:bg-gray-200",
              classNames?.day,
              !isSameMonth(day, currentMonth) &&
                (hideOutsideDates
                  ? "invisible"
                  : (classNames?.outsideDate ?? "")),
              format(selected, "yyyy-MM-dd") === format(day, "yyyy-MM-dd") &&
                (classNames?.daySelected ?? "bg-blue-500 text-white"),
            )}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  )
}

export { DayPicker, type DayPickerProps }
