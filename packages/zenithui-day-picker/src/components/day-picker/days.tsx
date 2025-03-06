import { useCallback, useMemo } from "react"
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
import { useDayPicker } from "../../hooks/use-day-picker"
import { cn, getDisabled, getInitialDate, isBetweenRange } from "../utils"
import { useDeviceType } from "../../hooks/use-device"

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
    onSelect(date)
  }

  const handleMouseEnter = useCallback(
    (day: Date) => {
      if (mode === "range" && range.to === null) {
        setFocus(day)
      }
    },
    [range],
  )

  const handleRangeSelect = useCallback(
    (date: Date) => {
      setFocus(null)
      if (range.from && range.to) {
        setRange({ from: date, to: null })
      } else if (isAfter(date, range.from)) {
        setRange({ from: range.from, to: date })
      } else {
        setRange({ from: date, to: range.from })
      }
    },
    [range, setRange],
  )

  const handleMouseEnterDebounced = useCallback(
    (date: Date) => {
      const timeout = setTimeout(() => handleMouseEnter(date), 100)
      return () => clearTimeout(timeout)
    },
    [handleMouseEnter],
  )

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
        className={cn(
          "zenithui-days",
          classNames?.days,
          mode === "range" ? "zenithui-gap-x-4" : "",
        )}
      >
        {days.map((day) => {
          const today = isToday(day)

          const isSelected =
            mode === "single"
              ? isSameDay(selected ? getInitialDate(selected) : new Date(), day)
              : false

          const isRangeStart =
            mode === "range" ? isSameDay(range.from, day) : false

          const isRangeEnd =
            mode === "range" ? range.to && isSameDay(range.to, day) : false

          const isInRange =
            mode === "range"
              ? focus
                ? isBetweenRange(day, range, focus)
                : range.to &&
                  isBefore(day, range.to) &&
                  isAfter(day, range.from)
              : false

          const isDisabled = getDisabled(day, disabled)

          return (
            <button
              key={`zenithui-day-${day}-${Math.random}`}
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
