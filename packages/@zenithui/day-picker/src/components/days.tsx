import { useCallback, useEffect, useMemo, useRef } from "react"
import {
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
} from "date-fns"
import { useDayPicker } from "./../hooks/use-day-picker"
import { getDisabled, getInitialDate, isBetweenRange } from "./../utils"
import { cn, useDeviceType } from "@zenithui/utils"
import type { DateRange } from "./../types"

export function DayPickerDays() {
  const {
    selected,
    mode,
    range,
    focus,
    currentMonth,
    hideWeekdays,
    hideOutsideDates,
    disabled,
    onSelect,
    setCurrentMonth,
    setFocus,
    setRange,
    classNames,
  } = useDayPicker()

  const device = useDeviceType()

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(currentMonth)),
      end: endOfWeek(endOfMonth(currentMonth)),
    })
  }, [currentMonth])

  const handleSelectDate = (date: Date) => {
    if (!isSameMonth(date, currentMonth)) {
      setCurrentMonth(startOfMonth(date))
    }
    ;(onSelect as (date: Date) => void)(date)
  }

  const handleMouseEnter = useCallback(
    (day: Date) => {
      if (mode === "range" && range.to === null) {
        setFocus(day)
      }
    },
    [range, mode, setFocus],
  )

  const handleRangeSelect = useCallback(
    (date: Date) => {
      setFocus(null)
      if (range.from && range.to) {
        // Both already set — start a new range
        setRange({ from: date, to: null })
      } else if (range.from && isAfter(date, range.from)) {
        const newRange = { from: range.from, to: date }
        setRange(newRange)
        ;(onSelect as (date: DateRange) => void)(newRange)
      } else if (range.from) {
        const newRange = { from: date, to: range.from }
        setRange(newRange)
        ;(onSelect as (date: DateRange) => void)(newRange)
      } else {
        // No from date yet — set as start of range
        setRange({ from: date, to: null })
      }
    },
    [range, setRange, setFocus, onSelect],
  )

  // FIX(#3): Use a ref to track and clear the previous timeout.
  // Previously, each mouse-enter created a setTimeout whose cleanup was
  // discarded (return value ignored), causing a memory leak and stale
  // setFocus calls when hovering rapidly across cells.
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnterDebounced = useCallback(
    (date: Date) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => handleMouseEnter(date), 100)
    },
    [handleMouseEnter],
  )

  // FIX(#9): Clear any pending timeout when the component unmounts
  // to avoid React state-update-on-unmounted-component warnings.
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <>
      {/* Weekdays Section */}
      {!hideWeekdays && (
        <div className={cn("zenithui-weekdays", classNames?.weekdays)}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={`zenithui-week-${day}`}
              className={cn("zenithui-weekday", classNames?.weekday)}
            >
              {day}
            </div>
          ))}
        </div>
      )}

      {/* Days Section */}
      <div
        data-mode={mode}
        className={cn(
          "zenithui-days",
          classNames?.days,
          mode === "range" ? "zenithui-gap-x-4" : "",
        )}
      >
        {days.map((day) => {
          const today = isToday(day)

          // FIX(#6): Only mark a day as "selected" when there is an actual
          // selection. Previously, `new Date()` was used as fallback, causing
          // today to appear selected even when nothing was picked.
          const isSelected =
            mode === "single" && selected
              ? isSameDay(getInitialDate(selected), day)
              : false

          // FIX(#7): Guard against null range.from. Previously, `new Date()`
          // fallback caused today to be highlighted as range start when no
          // range was selected.
          const isRangeStart =
            mode === "range" && range.from ? isSameDay(range.from, day) : false

          const isRangeEnd =
            mode === "range" ? range.to && isSameDay(range.to, day) : false

          // FIX(#7): Same null-fallback fix for in-range calculation
          const isInRange =
            mode === "range"
              ? focus
                ? isBetweenRange(day, range, focus)
                : range.from &&
                  range.to &&
                  isBefore(day, range.to) &&
                  isAfter(day, range.from)
              : false

          const isDisabled = getDisabled(day, disabled)

          return (
            <button
              // FIX(#5): Math.random (without `()`) is a function reference,
              // not a random number. Use the date ISO string for a stable,
              // unique key that doesn't destroy DOM nodes on re-render.
              key={`zenithui-day-${day.toISOString()}`}
              type="button"
              // FIX(#8): Basic accessibility — provide a descriptive label
              // for screen readers instead of just the day number.
              aria-label={format(day, "EEEE, MMMM d, yyyy")}
              aria-selected={isSelected || isRangeStart || !!isRangeEnd}
              data-today={today}
              data-selected={isSelected}
              data-range-start={isRangeStart}
              data-range-end={isRangeEnd}
              data-range-dates={isInRange}
              data-outside-date={!isSameMonth(day, currentMonth)}
              data-visibility={
                !isSameMonth(day, currentMonth) && hideOutsideDates
              }
              data-day={format(day, "d")}
              disabled={isDisabled}
              onClick={() => {
                if (mode === "single") {
                  handleSelectDate(day)
                } else {
                  handleRangeSelect(day)
                }
              }}
              onMouseEnter={() => {
                if (device === "desktop") {
                  handleMouseEnterDebounced(day)
                }
              }}
              className={cn("zenithui-day", classNames?.day, {
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
    </>
  )
}
