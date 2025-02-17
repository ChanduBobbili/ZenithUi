import {
  isAfter,
  isBefore,
  format,
  isSameDay,
  isSameMonth,
  isToday,
} from "date-fns"
import { cn, getInitialDate, isBetweenRange } from "../../utils"
import { DatePickerMode, DateRange, InternalRange } from "./index"

interface DayPickerDayProps {
  selected: Date | DateRange
  day: Date
  focus: Date | null
  range: InternalRange
  currentMonth: Date
  mode: DatePickerMode
  hideOutsideDates: boolean
  handleSelectDate: (date: Date) => void
  handleRangeSelect: (date: Date) => void
  handleMouseEnter: (date: Date) => void
  classNames?: {
    day?: string
    today?: string
    daySelected?: string
    rangeStart?: string
    rangeEnd?: string
    rangeDates?: string
    outsideDate?: string
  }
}

export function DayPickerDay({
  selected,
  day,
  range,
  focus,
  currentMonth,
  hideOutsideDates,
  mode,
  classNames,
  handleRangeSelect,
  handleSelectDate,
  handleMouseEnter,
}: DayPickerDayProps) {
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
          : range[1] && isBefore(day, range[1]) && isAfter(day, range[0])
        : focus
          ? isBetweenRange(day, range, focus)
          : range.to && isBefore(day, range.to) && isAfter(day, range.from)
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
      data-visibility={!isSameMonth(day, currentMonth) && hideOutsideDates}
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
        [classNames?.outsideDate ?? ""]: !isSameMonth(day, currentMonth),

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
}
