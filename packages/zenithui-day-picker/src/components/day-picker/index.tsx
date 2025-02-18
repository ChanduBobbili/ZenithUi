import * as React from "react"
import { cn, getInitialDate, getInitialRange, getTheme } from "../../utils"
import { isAfter, isSameMonth, startOfMonth } from "date-fns"
import { DayPickerHeader } from "./header"
import "./../../index.css"
import { DayPickerDays } from "./days"
import { DayPickerMonths } from "./months"
import { DayPickerYears } from "./years"

export interface DayPickerclassNames {
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
export type DayPickerState = "day" | "month" | "year"
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
  classNames?: Partial<DayPickerclassNames>
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
  /**
   * Enables the dark theme of the calendar.
   */
  theme?: "light" | "dark" | "auto"
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
      theme = "auto",
    },
    ref,
  ) => {
    if (mode === "range" && selected instanceof Date) {
      throw new Error(
        "Range mode requires an array of two dates or Range Object",
      )
    }

    const [state, setState] = React.useState<DayPickerState>("day")

    const [currentMonth, setCurrentMonth] = React.useState<Date>(
      getInitialDate(selected),
    )
    const [range, setRange] = React.useState<InternalRange>(
      getInitialRange(selected),
    )
    const [focus, setFocus] = React.useState<Date | null>(null)

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
        className={cn(
          getTheme(theme),
          "zenithui-calendar",
          classNames?.calendar,
        )}
      >
        {/* Navgation Section */}
        {!hideNavigation && (
          <DayPickerHeader
            currentMonth={currentMonth}
            state={state}
            setCurrentMonth={setCurrentMonth}
            setState={setState}
            classNames={classNames}
          />
        )}
        {/* Days Section */}
        {state === "day" ? (
          <DayPickerDays
            hideWeekdays={hideWeekdays}
            currentMonth={currentMonth}
            focus={focus}
            hideOutsideDates={hideOutsideDates}
            mode={mode}
            range={range}
            selected={selected}
            handleSelectDate={handleSelectDate}
            handleMouseEnter={handleMouseEnter}
            handleRangeSelect={handleRangeSelect}
            classNames={classNames}
          />
        ) : state === "month" ? (
          <DayPickerMonths
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            setState={setState}
          />
        ) : (
          <DayPickerYears
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            setState={setState}
          />
        )}
      </div>
    )
  },
)

export { DayPicker, type DayPickerProps }
