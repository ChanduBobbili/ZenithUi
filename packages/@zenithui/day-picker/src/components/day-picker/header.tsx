import { addMonths, addYears, format, subMonths, subYears } from "date-fns"
import Arrow from "../../assets/arrow.svg?react"
import { useDayPicker } from "../../hooks/use-day-picker"
import { cn } from "@zenithui/utils"

export function DayPickerHeader() {
  const { state, currentMonth, setState, setCurrentMonth, classNames } =
    useDayPicker()

  const handlePrev = () => {
    if (state === "day") setCurrentMonth(subMonths(currentMonth, 1))
    else if (state === "year") setCurrentMonth(subYears(currentMonth, 12))
  }

  const handleNext = () => {
    if (state === "day") setCurrentMonth(addMonths(currentMonth, 1))
    else if (state === "year") setCurrentMonth(addYears(currentMonth, 12))
  }

  return (
    <div className={cn("zenithui-calendar-header", classNames?.header)}>
      <button
        onClick={handlePrev}
        className={cn("zenithui-nav-button", classNames?.prevMonthButton)}
        disabled={state === "month"}
      >
        <Arrow className="zenithui-arrow-icon left" />
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          className={cn("zenithui-month-caption", classNames?.monthCaption)}
          onClick={() => setState("month")}
        >
          {format(currentMonth, "MMMM")}
        </button>
        <button
          className={cn("zenithui-month-caption", classNames?.monthCaption)}
          onClick={() => setState("year")}
        >
          {format(currentMonth, "yyyy")}
        </button>
      </div>

      <button
        onClick={handleNext}
        className={cn("zenithui-nav-button", classNames?.nextMonthButton)}
        disabled={state === "month"}
      >
        <Arrow className="zenithui-arrow-icon" />
      </button>
    </div>
  )
}
