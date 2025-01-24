import * as React from "react"
import { ClockIcon } from "@radix-ui/react-icons"
import {
  cn,
  convertTo24Hour,
  formatTime,
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
  time: string // HH:MM
  onTimeChange: (time: string) => void // HH:MM
  align?: "center" | "end" | "start"
  side?: "top" | "right" | "bottom" | "left"
  alignOffset?: number
  sideOffset?: number
}

function TimePicker({
  time,
  align = "center",
  side = "bottom",
  alignOffset = 10,
  sideOffset = 10,
  onTimeChange,
}: TimePickerProps) {
  const [hour, setHour] = React.useState(getInitialHour(time))
  const [minute, setMinute] = React.useState(time?.split(":")?.[1])
  const [period, setPeriod] = React.useState(getInitialPeriod(time))

  const hours = React.useMemo(() => {
    return Array.from({ length: 13 }, (_, i) =>
      i.toString().padStart(2, "0"),
    ).filter((hour) => hour !== "00")
  }, [])

  const minutes = React.useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))
  }, [])

  // Handle time change effect
  React.useEffect(() => {
    const newTime = `${convertTo24Hour(hour, period)}:${minute}`
    onTimeChange(newTime)
  }, [hour, minute, period])

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          className={cn(
            "flex w-full max-w-40 items-center justify-between text-white",
          )}
        >
          <span>{`${formatTime(time)}`}</span>
          <ClockIcon className="size-6 cursor-pointer self-center" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        openAnimate="slide"
        closeAnimate="slide"
        className="grid h-80 w-60 grid-cols-3 gap-1 overflow-hidden rounded-md px-0 py-3"
        onWheel={(e) => {
          e.stopPropagation()
        }}
      >
        <TimeScrollList
          options={hours}
          value={hour}
          onChange={setHour}
        />
        <TimeScrollList
          options={minutes}
          value={minute}
          onChange={setMinute}
        />
        <TimeScrollList
          options={["AM", "PM"]}
          value={period}
          onChange={setPeriod}
        />
      </PopoverContent>
    </Popover>
  )
}

function TimeScrollList({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  const listRef = React.useRef<HTMLDivElement>(null)

  // // Scroll to the selected item when the list renders
  React.useEffect(() => {
    const index = options.findIndex((option) => option === value)
    if (listRef.current && index >= 0) {
      const item = listRef.current.children[index] as HTMLElement
      item?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [value, options])

  return (
    <div className="h-80 overflow-y-auto">
      <ToggleGroup
        ref={listRef}
        type="single"
        className="pointer-events-auto flex flex-col gap-2 p-0"
        value={value}
        onValueChange={(value) => {
          if (value) onChange(value)
        }}
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option}
            value={option}
            aria-label={option}
            className={cn(
              "h-12 w-12 data-[state='on']:!bg-primary data-[state='on']:!text-white",
            )}
          >
            {option}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

export { TimePicker, type TimePickerProps }
