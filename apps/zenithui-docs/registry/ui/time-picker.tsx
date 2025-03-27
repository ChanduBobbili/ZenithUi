import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import { useTimePicker } from "@zenithui/time-picker"
import { useEffect, useRef } from "react"
import { Clock } from "lucide-react"

function formatTimeto24(time: string) {
  const [hours, minutes] = time.split(":").map(Number)
  const period = hours >= 12 ? "PM" : "AM"
  // Convert 0 -> 12 for AM and 12 -> 12 for PM
  const formattedHours = hours % 12 || 12
  // Ensure two-digit minutes
  const formattedMinutes = String(minutes).padStart(2, "0")
  return `${formattedHours}:${formattedMinutes} ${period}`
}

interface TimePickerProps {
  time: string // HH:MM
  onTimeChange: (time: string) => void // HH:MM
  className?: string
  format?: "12-hours" | "24-hours"
  align?: "center" | "end" | "start"
  side?: "top" | "right" | "bottom" | "left"
  alignOffset?: number
  sideOffset?: number
  formatter?: (time: string) => string
}

export default function TimePicker({
  time,
  onTimeChange,
  className,
  format = "24-hours",
  align = "center",
  side = "bottom",
  alignOffset = 0,
  sideOffset = 0,
  formatter = formatTimeto24,
}: TimePickerProps) {
  const {
    hours,
    minutes,
    periods,
    hour,
    minute,
    period,
    setHour,
    setMinute,
    setPeriod,
  } = useTimePicker({
    format: "12-hours",
    initialTime: time,
    onTimeChange: onTimeChange,
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex w-full max-w-32 items-center justify-between",
            className,
          )}
        >
          <span className="text-sky-950">{`${formatter(time)}`}</span>
          <Clock className="size-5 cursor-pointer self-center text-slate-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "grid h-fit gap-1 overflow-hidden rounded-sm px-0 py-3",
          format === "12-hours" ? "w-60 grid-cols-3" : "w-40 grid-cols-2",
        )}
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
        {format === "12-hours" ? (
          <TimeScrollList
            options={periods}
            value={period}
            onChange={setPeriod}
          />
        ) : null}
      </PopoverContent>
    </Popover>
  )
}

// Helper Components and Functions
function TimeScrollList({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  const listRef = useRef<HTMLDivElement>(null)

  // Scroll to the selected item when the list renders
  useEffect(() => {
    const index = options.findIndex((option) => option === value)
    if (listRef.current && index >= 0) {
      const item = listRef.current.children[index] as HTMLElement
      item?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [value, options])

  return (
    <ScrollArea className="h-80 overflow-y-auto">
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
    </ScrollArea>
  )
}
