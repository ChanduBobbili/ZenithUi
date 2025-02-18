import { useMemo } from "react"
import {
  DatePickerMode,
  DateRange,
  DayPickerclassNames,
  InternalRange,
} from "."
import { cn, getInitialDate, isBetweenRange } from "../../utils"
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

interface DayPickerDaysProps {
  hideWeekdays: boolean
  mode: DatePickerMode
  currentMonth: Date
  hideOutsideDates: boolean
  selected: Date | DateRange
  focus: Date | null
  range: InternalRange
  handleSelectDate: (date: Date) => void
  handleRangeSelect: (date: Date) => void
  handleMouseEnter: (date: Date) => void
  classNames?: Partial<DayPickerclassNames>
}

export function DayPickerDays({
  hideWeekdays,
  mode,
  currentMonth,
  hideOutsideDates,
  focus,
  range,
  selected,
  handleMouseEnter,
  handleRangeSelect,
  handleSelectDate,
  classNames,
}: DayPickerDaysProps) {
  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(currentMonth)),
      end: endOfWeek(endOfMonth(currentMonth)),
    })
  }, [currentMonth])

  return (
    <>
      {/* Weekdays Section */}
      {!hideWeekdays && (
        <div className={cn("zenithui-weekdays", classNames?.weekdays)}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
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
                  ? isBetweenRange(day, { from: range[0], to: range[1] }, focus)
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
