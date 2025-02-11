import * as React from "react"
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
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
  /**
   * The class names to apply to the today date.
   */
  today: string
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
  classNames?: Partial<classNames>
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

const DayPicker = React.forwardRef<HTMLDivElement, DayPickerProps>(
  (
    {
      selected,
      onSelect,
      classNames,
      hideNavigation = false,
      hideWeekdays = false,
      hideOutsideDates = false,
    },
    ref,
  ) => {
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
        ref={ref}
        className={cn(
          "w-full max-w-sm rounded-lg bg-white p-4 text-slate-950 shadow-lg",
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
              className={cn(
                "flex items-center justify-center rounded-md border-none p-1 text-center text-sm",
                // Active state
                "active:scale-95 active:border-none active:border-transparent active:outline-hidden active:ring-0 active:hover:border-none active:hover:outline-hidden active:hover:ring-0 active:focus:border-none active:focus:outline-hidden active:focus:ring-0 active:disabled:border-none active:disabled:outline-hidden active:disabled:ring-0",
                // Hover state
                "hover:border-none hover:bg-gray-200",
                // Transition
                "transition-all duration-300 ease-in-out",
                // Focus state
                "focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                // Focus visible state
                "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-50",
                // Disabled state
                "disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:opacity-50",
                "disabled:hover:bg-gray-200 disabled:hover:text-gray-500",
                "disabled:active:scale-100 disabled:active:ring-0",
                "disabled:focus:outline-hidden disabled:focus:ring-0",
                classNames?.prevMonthButton,
              )}
            >
              <Arrow className="h-5 w-5 rotate-180" />
            </button>
            <h2
              className={cn("text-lg font-semibold", classNames?.monthCaption)}
            >
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button
              onClick={handleNextMonth}
              className={cn(
                "flex items-center justify-center rounded-md border-none p-1 text-center text-sm",
                // Active state
                "active:scale-95 active:border-none active:border-transparent active:outline-hidden active:ring-0 active:hover:border-none active:hover:outline-hidden active:hover:ring-0 active:focus:border-none active:focus:outline-hidden active:focus:ring-0 active:disabled:border-none active:disabled:outline-hidden active:disabled:ring-0",
                // Hover state
                "hover:border-none hover:bg-gray-200",
                // Transition
                "transition-all duration-300 ease-in-out",
                // Focus state
                "focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                // Focus visible state
                "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-50",
                // Disabled state
                "disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:opacity-50",
                "disabled:hover:bg-gray-200 disabled:hover:text-gray-500",
                "disabled:active:scale-100 disabled:active:ring-0",
                "disabled:focus:outline-hidden disabled:focus:ring-0",
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
              "grid grid-cols-7 gap-2 text-center text-xs text-gray-500",
              classNames?.weekdays,
            )}
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className={cn(
                  "flex size-9 items-center justify-center text-center text-xs font-medium",
                  classNames?.weekday,
                )}
              >
                {day}
              </div>
            ))}
          </div>
        )}
        <div className={cn("mt-2 grid grid-cols-7 gap-2", classNames?.days)}>
          {days.map((day) => (
            <button
              key={day.toISOString()}
              onClick={() => handleSelectDate(day)}
              className={cn(
                "flex size-9 items-center justify-center rounded-md border text-center text-sm",
                // Active state
                "active:scale-95 active:border-none active:border-transparent active:outline-hidden active:ring-0 active:hover:border-none active:hover:outline-hidden active:hover:ring-0 active:focus:border-none active:focus:outline-hidden active:focus:ring-0 active:disabled:border-none active:disabled:outline-hidden active:disabled:ring-0",
                // Hover state
                "hover:border-none hover:bg-gray-200",
                // Transition
                "transition-all duration-300 ease-in-out",
                // Focus state
                "focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                // Focus visible state
                "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-50",
                // Disabled state
                "disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:opacity-50",
                "disabled:hover:bg-gray-200 disabled:hover:text-gray-500",
                "disabled:active:scale-100 disabled:active:ring-0",
                "disabled:focus:outline-hidden disabled:focus:ring-0",
                classNames?.day,
                // Outside date
                !isSameMonth(day, currentMonth) &&
                  (hideOutsideDates
                    ? "invisible"
                    : (classNames?.outsideDate ?? "opacity-50")),
                // Selected date
                format(selected, "yyyy-MM-dd") === format(day, "yyyy-MM-dd") &&
                  (classNames?.daySelected ??
                    "bg-blue-500 text-white hover:bg-blue-600"),
                // Today date
                isToday(day) && (classNames?.today ?? "border-blue-100"),
              )}
            >
              {format(day, "d")}
            </button>
          ))}
        </div>
      </div>
    )
  },
)

export { DayPicker, type DayPickerProps }
