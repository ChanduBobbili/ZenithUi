import { forwardRef, useEffect, useMemo, useState } from "react"
import { DayPickerProps, DayPickerState, InternalRange } from "../types"
import { cn, getInitialDate, getInitialRange } from "../utils"
import { useTheme } from "../../hooks/use-theme"
import { DayPickerHeader } from "./header"
import { DayPickerContext } from "../../hooks/use-day-picker"
import { DayPickerYears } from "./years"
import { DayPickerMonths } from "./months"
import { DayPickerDays } from "./days"

const DayPicker = forwardRef<HTMLDivElement, DayPickerProps>(
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
      disabled,
    },
    ref,
  ) => {
    if (mode === "range" && selected instanceof Date) {
      throw new Error(
        "Range mode requires an array of two dates or Range Object",
      )
    }

    const [state, setState] = useState<DayPickerState>("day")
    const [currentMonth, setCurrentMonth] = useState<Date>(
      getInitialDate(selected),
    )
    const [range, setRange] = useState<InternalRange>(getInitialRange(selected))
    const [focus, setFocus] = useState<Date | null>(null)

    const hookTheme = useTheme()
    const themeClass = useMemo(
      () => (theme === "auto" ? hookTheme : theme === "dark" ? "dark" : ""),
      [theme],
    )

    useEffect(() => {
      if (mode === "range") {
        if (range.from && range.to) onSelect(range)
      }
    }, [range])

    return (
      <DayPickerContext.Provider
        value={{
          currentMonth,
          focus,
          mode,
          range,
          state,
          hideOutsideDates,
          hideWeekdays,
          selected,
          classNames,
          disabled,
          onSelect,
          setCurrentMonth,
          setFocus,
          setRange,
          setState,
        }}
      >
        <div
          ref={ref}
          className={cn(themeClass, "zenithui-calendar", classNames?.calendar)}
        >
          {!hideNavigation && <DayPickerHeader />}
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
  },
)

export default DayPicker
