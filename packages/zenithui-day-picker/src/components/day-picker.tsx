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
import { cn, getInitialDate, getInitialRange, isBetweenRange } from "../utils"
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
type InternalRange = [Date, Date | null] | { from: Date; to: Date | null }

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
    const [range, setRange] = React.useState<InternalRange>(
      getInitialRange(selected),
    )
    const [focus, setFocus] = React.useState<Date | null>(null)

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

    const handleRangeSelect = React.useCallback(
      (date: Date) => {
        if (Array.isArray(range)) {
          if (range[0] && range[1]) {
            setRange([date, null])
          } else if (isAfter(date, range[0])) {
            setFocus(null)
            setRange([range[0], date])
          } else {
            setFocus(null)
            setRange([date, range[0]])
          }
        } else {
          if (range.from && range.to) {
            setRange({ from: date, to: null })
          } else if (isAfter(date, range.from)) {
            setFocus(null)
            setRange({ from: range.from, to: date })
          } else {
            setFocus(null)
            setRange({ from: date, to: range.from })
          }
        }
      },
      [range, setRange],
    )

    const handleMouseEnter = React.useCallback(
      (day: Date) => {
        if (
          mode === "range" &&
          (Array.isArray(range) ? range[1] === null : range.to === null)
        ) {
          setFocus(day)
        }
      },
      [range],
    )

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
        className={cn(classNames?.calendar ? classNames?.calendar : "calendar")}
      >
        {!hideNavigation && (
          <div
            className={cn(
              classNames?.header ? classNames.header : "calendar-header",
            )}
          >
            <button
              onClick={handlePrevMonth}
              className={cn(
                classNames?.prevMonthButton
                  ? classNames.prevMonthButton
                  : "nav-button",
              )}
            >
              <Arrow className="arrow-icon left" />
            </button>
            <h2
              className={cn(
                classNames?.monthCaption
                  ? classNames.monthCaption
                  : "month-caption",
              )}
            >
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button
              onClick={handleNextMonth}
              className={cn(
                classNames?.nextMonthButton
                  ? classNames.nextMonthButton
                  : "nav-button",
              )}
            >
              <Arrow className="arrow-icon" />
            </button>
          </div>
        )}
        {!hideWeekdays && (
          <div
            className={cn(
              classNames?.weekdays ? classNames.weekdays : "weekdays",
            )}
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className={cn(
                  classNames?.weekday ? classNames.weekday : "weekday",
                )}
              >
                {day}
              </div>
            ))}
          </div>
        )}
        <div
          className={cn(
            mode === "range" ? "gap-x-4" : "",
            classNames?.days ? classNames.day : "days",
          )}
        >
          {days.map((day) => {
            const date = getInitialDate(selected)

            const isSelected = isSameDay(date, day)

            const isRangeStart = Array.isArray(range)
              ? isSameDay(range[0], day)
              : isSameDay(range.from, day)

            const isRangeEnd = Array.isArray(range)
              ? range[1] && isSameDay(range[1], day)
              : range.to && isSameDay(range.to, day)

            const isInRange = Array.isArray(range)
              ? focus
                ? isBetweenRange(day, { from: range[0], to: range[1] }, focus)
                : range[1] && isBefore(day, range[1]) && isAfter(day, range[0])
              : focus
                ? isBetweenRange(day, range, focus)
                : range.to &&
                  isBefore(day, range.to) &&
                  isAfter(day, range.from)

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
                onMouseEnter={() => handleMouseEnter(day)}
                className={cn(
                  classNames?.day ? classNames.day : "day",
                  // Outside date
                  !isSameMonth(day, currentMonth)
                    ? hideOutsideDates
                      ? "hidden"
                      : classNames?.outsideDate
                        ? classNames.outsideDate
                        : "outside-date"
                    : "",
                  // Selected date
                  mode === "single"
                    ? isSelected
                      ? classNames?.daySelected
                        ? classNames.daySelected
                        : "day-selected"
                      : ""
                    : "",
                  // Range Dates
                  mode === "range"
                    ? isRangeStart
                      ? classNames?.rangeStart
                        ? classNames.rangeStart
                        : "range-start"
                      : isRangeEnd
                        ? classNames?.rangeEnd
                          ? classNames.rangeEnd
                          : "range-end"
                        : isInRange
                          ? classNames?.rangeDates
                            ? classNames.rangeDates
                            : "range-dates"
                          : ""
                    : "",
                  // Today date
                  isToday(day)
                    ? classNames?.today
                      ? classNames.today
                      : "today"
                    : "",
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
