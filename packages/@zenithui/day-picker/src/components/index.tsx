import { forwardRef, useEffect, useState } from "react"
import {
  DateRange,
  DayPickerProps,
  DayPickerState,
  InternalRange,
} from "./../types"
import { cn, getInitialDate, getInitialRange } from "./../utils"
import { DayPickerHeader } from "./header"
import { DayPickerContext } from "./../hooks/use-day-picker"
import { DayPickerYears } from "./years"
import { DayPickerMonths } from "./months"
import { DayPickerDays } from "./days"

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
  if (props.mode === "range" && selected instanceof Date) {
    throw new Error("Range mode requires an array of two dates or Range Object")
  }
  if (props.mode === "single" && !(selected instanceof Date)) {
    throw new Error("Single mode requires a single date or null")
  }

  const [state, setState] = useState<DayPickerState>("day")
  const [currentMonth, setCurrentMonth] = useState<Date>(
    getInitialDate(selected),
  )
  const [range, setRange] = useState<InternalRange>(getInitialRange(selected))
  const [focus, setFocus] = useState<Date | null>(null)

  useEffect(() => {
    if (props.mode === "range") {
      if (range.from instanceof Date && range.to instanceof Date) {
        ;(onSelect as (date: DateRange) => void)(range as DateRange)
      }
    }
  }, [range])

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
        selected,
        classNames,
        disabled,
        mode: props.mode,
        onSelect,
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
