import * as React from "react"
import "./../index.css"
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import { cn, getInitialDate, getInitialRange } from "../utils"
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
   * The class names to apply to the range start date.
   */
  rangeStart: string
  /**
   * The class names to apply to the range end date.
   */
  rangeEnd: string
  /**
   * The class names to apply to the dates in the range.
   */
  rangeDates: string
  /**
   * The class names to apply to the outside date (not in the current month).
   */
  outsideDate: string
  /**
   * The class names to apply to the today date.
   */
  today: string
}

/**
 * The Date type from the Range Selection
 */
export type DateRange = [Date, Date] | { from: Date; to: Date }

interface DayPickerProps {
  /**
   * The date that is currently selected.
   */
  selected: Date | DateRange
  /**
   * The function that is called when a date is selected.
   */
  onSelect: (date: any) => void
  /**
   * The selection mode. (single | range)
   */
  mode: "single" | "range"
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
      mode = "single",
      hideNavigation = false,
      hideWeekdays = false,
      hideOutsideDates = false,
    },
    ref,
  ) => {
    if (mode === "range" && selected instanceof Date) {
      throw new Error(
        "Range mode requires an array of two dates or Range Object",
      )
    }
    const [currentMonth, setCurrentMonth] = React.useState<Date>(
      getInitialDate(selected),
    )
    const [range, setRange] = React.useState<DateRange>(
      getInitialRange(selected),
    )

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
      onSelect(date)
    }

    const handleRangeSelect = (date: Date) => {
      if (Array.isArray(range)) {
        // if (isBefore(date, range[0])) {
        //   setRange([date, range[1]])
        // } else if (isAfter(date, range[0])) {
        //   setRange([date, range[1]])
        // }

        // if (isAfter(date, range[1])) {
        //   setRange([range[0], date])
        // } else if (isBefore(date, range[1])) {
        //   setRange([range[0], date])
        // }

        if (date < range[0]) {
          setRange([date, range[0]])
        } else {
          setRange([range[0], date])
        }
      } else {
        // if (isBefore(date, range.from)) {
        //   setRange({ from: date, to: range.to })
        // } else if (isAfter(date, range.from)) {
        //   setRange({ from: date, to: range.to })
        // }

        // if (isAfter(date, range.to)) {
        //   setRange({ from: range.from, to: date })
        // } else if (isBefore(date, range.to)) {
        //   setRange({ from: range.from, to: date })
        // }

        if (date < range.from) {
          setRange({ from: date, to: range.to })
        } else {
          setRange({ from: range.from, to: date })
        }
      }
    }

    React.useEffect(() => {
      if (mode === "range") {
        if (Array.isArray(range)) {
          if (range[0] && range[1]) onSelect(range)
        } else {
          if (range.from && range.to) onSelect(range)
        }
      }
    }, [range])

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
        <div
          className={cn(
            "days",
            mode === "range" && "gap-x-4",
            classNames?.days,
          )}
        >
          {days.map((day) => {
            const date = getInitialDate(selected)

            const isSelected = isSameDay(date, day)

            const isRangeStart = Array.isArray(range)
              ? isSameDay(range[0], day)
              : isSameDay(range.from, day)

            const isRangeEnd = Array.isArray(range)
              ? isSameDay(range[1], day)
              : isSameDay(range.to, day)

            const isInRange = Array.isArray(range)
              ? isBefore(day, range[1]) && isAfter(day, range[0])
              : isBefore(day, range.to) && isAfter(day, range.from)

            return (
              <button
                key={day.toISOString()}
                onClick={() => {
                  if (mode === "single") {
                    handleSelectDate(day)
                  } else {
                    handleRangeSelect(day)
                  }
                }}
                className={cn(
                  "day",
                  classNames?.day,
                  // Outside date
                  !isSameMonth(day, currentMonth) &&
                    (hideOutsideDates
                      ? "hidden"
                      : (classNames?.outsideDate ?? "outside-date")),
                  // Selected date
                  mode === "single" &&
                    isSelected &&
                    (classNames?.daySelected ?? "day-selected"),
                  // Range Dates
                  mode === "range"
                    ? isRangeStart
                      ? (classNames?.rangeStart ?? "range-start")
                      : isRangeEnd
                        ? (classNames?.rangeEnd ?? "range-end")
                        : isInRange
                          ? (classNames?.rangeDates ?? "range-dates")
                          : ""
                    : "",
                  // Today date
                  isToday(day) && (classNames?.today ?? "today"),
                )}
              >
                {format(day, "d")}
              </button>
            )
          })}
        </div>
      </div>
    )
  },
)

export { DayPicker, type DayPickerProps }
