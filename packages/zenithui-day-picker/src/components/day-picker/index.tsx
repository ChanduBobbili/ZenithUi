import * as React from "react"

import "./../index.css"
import { cn, getInitialDate, getInitialRange } from "../../utils"
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isAfter,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns"
import { DayPickerHeader } from "./header"
import { DayPickerDay } from "./day"

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
export type DatePickerMode = "single" | "range"
export type InternalRange =
  | [Date, Date | null]
  | { from: Date; to: Date | null }

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
  mode: DatePickerMode
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
          <DayPickerHeader
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            classNames={{
              header: classNames?.header,
              monthCaption: classNames?.monthCaption,
              nextMonthButton: classNames?.nextMonthButton,
              prevMonthButton: classNames?.prevMonthButton,
            }}
          />
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
          {days.map((day) => (
            <DayPickerDay
              key={day.toISOString()}
              currentMonth={currentMonth}
              day={day}
              focus={focus}
              range={range}
              selected={selected}
              mode={mode}
              hideOutsideDates={hideOutsideDates}
              handleMouseEnter={handleMouseEnter}
              handleRangeSelect={handleRangeSelect}
              handleSelectDate={handleSelectDate}
              classNames={{
                day: classNames?.day,
                daySelected: classNames?.daySelected,
                outsideDate: classNames?.outsideDate,
                rangeDates: classNames?.rangeDates,
                rangeEnd: classNames?.rangeEnd,
                rangeStart: classNames?.rangeStart,
                today: classNames?.today,
              }}
            />
          ))}
        </div>
      </div>
    )
  },
)

export { DayPicker, type DayPickerProps }
