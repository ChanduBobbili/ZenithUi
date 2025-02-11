import * as React from "react"
import "./../index.css"
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
        className={cn("calendar", classNames?.calendar)}
      >
        {!hideNavigation && (
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
        )}
        {!hideWeekdays && (
          <div className={cn("weekdays", classNames?.weekdays)}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className={cn("weekday", classNames?.weekday)}
              >
                {day}
              </div>
            ))}
          </div>
        )}
        <div className={cn("days", classNames?.days)}>
          {days.map((day) => (
            <button
              key={day.toISOString()}
              onClick={() => handleSelectDate(day)}
              className={cn(
                "day",
                classNames?.day,
                // Outside date
                !isSameMonth(day, currentMonth) &&
                  (hideOutsideDates
                    ? "hidden"
                    : (classNames?.outsideDate ?? "outside-date")),
                // Selected date
                format(selected, "yyyy-MM-dd") === format(day, "yyyy-MM-dd") &&
                  (classNames?.daySelected ?? "day-selected"),
                // Today date
                isToday(day) && (classNames?.today ?? "today"),
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
