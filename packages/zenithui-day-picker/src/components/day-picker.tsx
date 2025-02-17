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
        className={cn("calendar", classNames?.calendar)}
      >
        {/* Navgation Section */}
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
        {/* Weekdays Section */}
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
        {/* Days Section */}
        <div
          className={cn(
            "days",
            classNames?.days,
            mode === "range" ? "gap-x-4" : "",
          )}
        >
          {days.map((day) => {
            const date = getInitialDate(selected)
            const today = isToday(day)

            const isSelected = isSameDay(date, day)

            const isRangeStart =
              mode === "range"
                ? Array.isArray(range)
                  ? isSameDay(range[0], day)
                  : isSameDay(range.from, day)
                : false

            const isRangeEnd =
              mode === "range"
                ? Array.isArray(range)
                  ? range[1] && isSameDay(range[1], day)
                  : range.to && isSameDay(range.to, day)
                : false

            const isInRange =
              mode === "range"
                ? Array.isArray(range)
                  ? focus
                    ? isBetweenRange(
                        day,
                        { from: range[0], to: range[1] },
                        focus,
                      )
                    : range[1] &&
                      isBefore(day, range[1]) &&
                      isAfter(day, range[0])
                  : focus
                    ? isBetweenRange(day, range, focus)
                    : range.to &&
                      isBefore(day, range.to) &&
                      isAfter(day, range.from)
                : false

            return (
              <button
                key={day.toISOString()}
                data-today={today}
                data-today-custom={classNames?.today ? true : false}
                data-selected={isSelected}
                data-selected-custom={
                  isSelected && (classNames?.daySelected ? true : false)
                }
                data-range-start={isRangeStart}
                data-range-start-custom={
                  isRangeStart && (classNames?.rangeStart ? true : false)
                }
                data-range-end={isRangeEnd}
                data-range-end-custom={
                  isRangeEnd && (classNames?.rangeEnd ? true : false)
                }
                data-range-dates={isInRange}
                data-range-dates-custom={
                  isInRange && (classNames?.rangeDates ? true : false)
                }
                data-outside-date={!isSameMonth(day, currentMonth)}
                data-outside-date-custom={
                  !isSameMonth(day, currentMonth) &&
                  (classNames?.outsideDate ? true : false)
                }
                data-visibility={
                  !isSameMonth(day, currentMonth) && hideOutsideDates
                }
                data-day={format(day, "d")}
                onClick={() => {
                  if (mode === "single") {
                    handleSelectDate(day)
                  } else {
                    handleRangeSelect(day)
                  }
                }}
                onMouseEnter={() => handleMouseEnter(day)}
                className={cn("day", classNames?.day, {
                  // Outside date
                  [classNames?.outsideDate ?? ""]: !isSameMonth(
                    day,
                    currentMonth,
                  ),

                  // Selected date
                  [classNames?.daySelected ?? ""]: isSelected,

                  // Range Dates
                  [classNames?.rangeStart ?? ""]: isRangeStart,
                  [classNames?.rangeEnd ?? ""]: isRangeEnd,
                  [classNames?.rangeDates ?? ""]: isInRange,

                  // Today Date
                  [classNames?.today ?? ""]: today,
                })}
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
