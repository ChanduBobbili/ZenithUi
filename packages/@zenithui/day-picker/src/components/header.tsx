import { addMonths, addYears, format, subMonths, subYears } from "date-fns"
import { useDayPicker } from "./../hooks/use-day-picker"
import { cn } from "@zenithui/utils"

const Arrow = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    className={cn(className)}
  >
    <path
      d="M11.0175 5.41596C11.1793 5.41541 11.3392 5.45113 11.4855 5.52049C11.6317 5.58986 11.7605 5.69111 11.8625 5.8168L17.095 12.3168C17.2543 12.5106 17.3414 12.7538 17.3414 13.0047C17.3414 13.2556 17.2543 13.4988 17.095 13.6926L11.6783 20.1926C11.4944 20.4139 11.2302 20.553 10.9437 20.5794C10.6573 20.6058 10.3721 20.5173 10.1508 20.3335C9.92958 20.1496 9.79046 19.8853 9.76405 19.5989C9.73764 19.3124 9.8261 19.0272 10.01 18.806L14.8525 12.9993L10.1725 7.19263C10.04 7.03361 9.95586 6.83997 9.92999 6.63463C9.90412 6.42929 9.93762 6.22083 10.0265 6.03392C10.1154 5.84702 10.256 5.68949 10.4316 5.57997C10.6072 5.47046 10.8105 5.41354 11.0175 5.41596Z"
      fill="currentColor"
    />
  </svg>
)
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
