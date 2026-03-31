import { forwardRef, useCallback, useMemo, useState } from "react"
import type {
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
  // FIX(#2): Replaced render-time throw with console.error + early return.
  // Throwing during render crashes the entire React tree unless an error boundary
  // is present. For a library component, graceful degradation is preferred.
  if (
    props.mode === "range" &&
    selected !== undefined &&
    selected instanceof Date
  ) {
    console.error(
      "[DayPicker] Range mode requires a DateRange object, not a single Date.",
    )
    return null
  }
  if (
    props.mode === "single" &&
    selected !== undefined &&
    !(selected instanceof Date)
  ) {
    console.error(
      "[DayPicker] Single mode requires a single Date, not a DateRange.",
    )
    return null
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

  // FIX(#4): Stable no-op fallback to avoid new reference on every render
  const noOp = useCallback(() => {}, [])

  // FIX(#4): Memoize context value to prevent unnecessary re-renders of all
  // consumers. Without this, every state change in DayPicker re-renders every
  // child that calls useDayPicker(), even if the values they read haven't changed.
  const contextValue = useMemo(
    () => ({
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
      onSelect: onSelect ?? noOp,
      setCurrentMonth,
      setFocus,
      setRange,
      setState,
    }),
    [
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
      props.mode,
      onSelect,
      noOp,
    ],
  )

  return (
    <DayPickerContext.Provider value={contextValue}
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
