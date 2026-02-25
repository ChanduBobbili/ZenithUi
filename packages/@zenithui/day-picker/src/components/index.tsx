import { forwardRef, useEffect, useState } from "react"
import type {
  DateRange,
  DayPickerProps,
  DayPickerState,
  InternalRange,
} from "./../types"
import { getInitialDate, getInitialRange } from "./../utils"
import { DayPickerHeader } from "./header"
import { DayPickerContext } from "./../hooks/use-day-picker"
import { DayPickerYears } from "./years"
import { DayPickerMonths } from "./months"
import { DayPickerDays } from "./days"
import { cn } from "@zenithui/utils"

const DayPicker = forwardRef<HTMLDivElement, DayPickerProps>((props, ref) => {
  const {
    selected,
    classNames,
    onSelect,
    disableNavigation = false,
    disabled,
    hideNavigation = false,
    hideOutsideDates = false,
    hideWeekdays = false,
  } = props
  // Validate selected if provided
  if (
    props.mode === "range" &&
    selected !== undefined &&
    selected instanceof Date
  ) {
    throw new Error("Range mode requires a date range, not a single date.")
  }
  if (
    props.mode === "single" &&
    selected !== undefined &&
    !(selected instanceof Date)
  ) {
    throw new Error("Single mode requires a single date.")
  }

  const [state, setState] = useState<DayPickerState>("day")
  // Always fallback to today for currentMonth view only (not selection)
  const [currentMonth, setCurrentMonth] = useState<Date>(
    getInitialDate(selected),
  )
  // range state used internally for range selection
  const [range, setRange] = useState<InternalRange>(
    selected && props.mode === "range"
      ? getInitialRange(selected)
      : { from: null, to: null },
  )

  const [focus, setFocus] = useState<Date | null>(null)

  useEffect(() => {
    if (props.mode === "range" && onSelect && range.from && range.to) {
      ;(onSelect as (date: DateRange) => void)(range as DateRange)
    }
  }, [range, onSelect, props.mode])

  return (
    <DayPickerContext.Provider
      value={{
        currentMonth,
        focus,
        range,
        state,
        hideOutsideDates,
        disableNavigation,
        hideWeekdays,
        selected: selected ?? null,
        classNames,
        disabled,
        mode: props.mode,
        onSelect: onSelect ?? (() => {}),
        setCurrentMonth,
        setFocus,
        setRange,
        setState,
      }}
    >
      <div
        ref={ref}
        className={cn("zenithui-calendar", classNames?.calendar)}
      >
        {!hideNavigation ? <DayPickerHeader /> : null}
        {state === "year" ? (
          <DayPickerYears />
        ) : state === "month" ? (
          <DayPickerMonths />
        ) : (
          <DayPickerDays />
        )}
      </div>
    </DayPickerContext.Provider>
  )
})

export default DayPicker
