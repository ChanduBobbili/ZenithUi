import * as React from "react"
import {
  convertTo24Hour,
  formatTime24To12,
  getInitialHour,
  getInitialPeriod,
  generateTimeOptions,
  cn,
  getTheme,
} from "./utils"
import { Popover, PopoverContent, PopoverTrigger } from "./components/popover"
import { ToggleGroupRoot, ToggleGroupItem } from "./components/toggle-group"

interface TimePickerProps {
  /**
   * The selected time in "HH:MM" format (24-hour clock).
   */
  time: string

  /**
   * Callback function to handle time changes, receives updated time in "HH:MM" format (24-hour clock).
   */
  onTimeChange: (time: string) => void

  /**
   * Alignment of the popover relative to the trigger element.
   * Can be "center", "end", or "start".
   * Default: "center".
   */
  align?: "center" | "end" | "start"

  /**
   * Side of the trigger element where the popover will appear.
   * Can be "top", "right", "bottom", or "left".
   * Default: "bottom".
   */
  side?: "top" | "right" | "bottom" | "left"

  /**
   * Offset for popover alignment along the alignment axis.
   * Default: 10.
   */
  alignOffset?: number

  /**
   * Offset for popover alignment along the side axis.
   * Default: 10.
   */
  sideOffset?: number
  /**
   * Class names for the Time Picker.
   */
  classNames?: TimePickerClassNames
  /**
   * Enables the dark theme of the Time Picker.
   */
  theme?: "light" | "dark" | "system"
  /**
   * Custom formatter for time display.
   * @param time - The time in "HH:MM" format (24-hour clock).
   * @returns Formatted time string.
   */
  formatter?: (time: string) => string
}

interface TimePickerClassNames {
  /**
   * Class name for the popover content.
   */
  popoverContent?: string
  /**
   * Class name for the popover trigger button.
   */
  button?: string

  /**
   * Class name for the time scroll list.
   */
  timeScrollList?: string

  /**
   * Class name for the time scroll list item.
   */
  timeScrollListItem?: string
  /**
   * Class name for the time scroll list item when selected.
   */
  Selected?: string
}

const TimePicker: React.FC<TimePickerProps> = ({
  time,
  align = "center",
  side = "bottom",
  theme = "system",
  alignOffset = 10,
  sideOffset = 10,
  classNames,
  onTimeChange,
  formatter = formatTime24To12,
}) => {
  const [hour, setHour] = React.useState(getInitialHour(time))
  const [minute, setMinute] = React.useState(time?.split(":")?.[1])
  const [period, setPeriod] = React.useState(getInitialPeriod(time))

  const hours = React.useMemo(() => generateTimeOptions(1, 12), [])
  const minutes = React.useMemo(() => generateTimeOptions(0, 59), [])

  // Update time whenever hour, minute, or period changes
  React.useEffect(() => {
    onTimeChange(`${convertTo24Hour(hour, period)}:${minute}`)
  }, [hour, minute, period, onTimeChange])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            getTheme(theme),
            "zenithui-time-trigger",
            classNames?.button,
          )}
        >
          <span>{formatter(time)}</span>
          <ClockIcon />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        openAnimate="slide"
        closeAnimate="slide"
        className={cn(
          getTheme(theme),
          "zenithui-time-container",
          classNames?.popoverContent,
        )}
        onWheel={(e) => e.stopPropagation()}
      >
        <TimeScrollList
          options={hours}
          value={hour}
          classNames={classNames}
          onChange={setHour}
        />
        <TimeScrollList
          options={minutes}
          value={minute}
          classNames={classNames}
          onChange={setMinute}
        />
        <TimeScrollList
          options={["AM", "PM"]}
          value={period}
          classNames={classNames}
          onChange={setPeriod}
        />
      </PopoverContent>
    </Popover>
  )
}

interface TimeScrollListProps {
  /**
   * List of time options to display (e.g., hours, minutes, or AM/PM).
   */
  options: string[]

  /**
   * The currently selected value from the list.
   */
  value: string

  /**
   * Callback function triggered when a new value is selected.
   */
  onChange: (value: string) => void
  /**
   * Class names for the Time Scroll List.
   */
  classNames?: TimePickerClassNames
}

const TimeScrollList: React.FC<TimeScrollListProps> = ({
  options,
  value,
  classNames,
  onChange,
}) => {
  const listRef = React.useRef<HTMLDivElement>(null)

  // Scroll to the selected item when the list renders
  React.useEffect(() => {
    const index = options.findIndex((option) => option === value)
    if (listRef.current && index >= 0) {
      const item = listRef.current.children[index] as HTMLElement
      item?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [value, options])

  return (
    <div className="zenithui-time-custom-scroll">
      <ToggleGroupRoot
        ref={listRef}
        type="single"
        className={cn(
          "zenithui-time-scroll-container",
          classNames?.timeScrollList,
        )}
        value={value}
        onValueChange={(selectedValue) => {
          if (typeof selectedValue === "string") {
            onChange(selectedValue)
          }
        }}
      >
        {options.map((option) => {
          return (
            <ToggleGroupItem
              key={option}
              value={option}
              aria-label={option}
              className={cn(
                "zenithui-time-item",
                classNames?.timeScrollListItem,
                value === option ? "zenithui-selected" : "",
                value === option ? classNames?.Selected : "",
              )}
            >
              {option}
            </ToggleGroupItem>
          )
        })}
      </ToggleGroupRoot>
    </div>
  )
}

const ClockIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
)

export { TimePicker, type TimePickerProps }
