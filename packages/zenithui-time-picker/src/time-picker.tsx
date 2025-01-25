import * as React from "react"
import { ClockIcon } from "@radix-ui/react-icons"
import {
  cn,
  convertTo24Hour,
  formatTime24To12,
  getInitialHour,
  getInitialPeriod,
} from "./utils"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ToggleGroup,
  ToggleGroupItem,
} from "zenithui-primitive"

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
      <PopoverTrigger>
        <Button
          variant="outline"
          className={cn(
            "flex w-full max-w-40 items-center justify-between text-white",
            classNames?.button,
          )}
        >
          <span>{formatter(time)}</span>
          <ClockIcon className="size-6 cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        openAnimate="slide"
        closeAnimate="slide"
        className={cn(
          "grid h-80 w-60 grid-cols-3 gap-1 overflow-hidden rounded-md px-0 py-3",
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
    <div className="h-full overflow-y-auto">
      <ToggleGroup
        ref={listRef}
        type="single"
        className={cn(
          "pointer-events-auto flex flex-col gap-2 p-0",
          classNames?.timeScrollList,
        )}
        value={value}
        onValueChange={(selectedValue) =>
          selectedValue && onChange(selectedValue)
        }
      >
        {options.map((option) => {
          const activeClasses = cn(
            "data-[state=on]:!bg-primary data-[state=on]:!text-white", // Package default
            generateActiveClasses(classNames?.Selected), // App-provided styles
          )
          return (
            <ToggleGroupItem
              key={option}
              value={option}
              aria-label={option}
              className={cn(
                "h-12 w-12 transition-all duration-500 ease-in-out",
                classNames?.timeScrollListItem,
                activeClasses,
              )}
            >
              {option}
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>
    </div>
  )
}

// Utility function to generate time options
/**
 * Generates an array of time options (hours or minutes) as strings,
 * padded with leading zeros if necessary.
 *
 * @param start - Starting number of the range (inclusive).
 * @param end - Ending number of the range (inclusive).
 * @returns Array of time options as strings.
 */
const generateTimeOptions = (start: number, end: number): string[] => {
  return Array.from({ length: end - start + 1 }, (_, i) =>
    (i + start).toString().padStart(2, "0"),
  )
}

// Utility function to generate active classes for selected items
/**
 * Generates CSS classes for active (selected) items.
 *
 * @param classNames - Class names provided by the user.
 * @returns CSS classes for active items.
 */
const generateActiveClasses = (classNames: string | undefined) => {
  const activeClasses = classNames?.split(" ") ?? []
  return activeClasses
    .map((className) => `data-[state=on]:!${className}`)
    .join(" ")
}

export { TimePicker, type TimePickerProps }
