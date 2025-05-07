"use client"
import type { ComponentProps } from "react"
import { DayPicker } from "@zenithui/day-picker"
import { cn } from "@/lib/utils"

export default function Calendar({
  ...props
}: ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      {...props}
      classNames={{
        calendar:
          "w-full min-w-[300px] max-w-[320px] bg-background text-primary p-4 rounded-lg",
        header: "flex justify-between items-center",
        prevMonthButton: cn(
          "rotate-180 cursor-pointer rounded-lg border-none bg-transparent p-2 transition-colors duration-200 ease-in-out",
          // Hover Styles
          "hover:bg-accent hover:text-accent-foreground",
          // Focus Styles
          "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          // Disabled Styles
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        ),
        nextMonthButton: cn(
          "cursor-pointer rounded-lg border-none bg-transparent p-2 transition-colors duration-200 ease-in-out",
          // Hover Styles
          "hover:bg-accent hover:text-accent-foreground",
          // Focus Styles
          "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          // Disabled Styles
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        ),
        monthCaption: cn(
          "text-primary flex h-10 min-w-[100px] cursor-pointer items-center justify-center rounded-md border-2 border-transparent bg-transparent text-sm font-medium",
          // Hover Styles
          "hover:bg-accent hover:text-accent-foreground",
          // Focus Styles
          "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          // Disabled Styles
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        ),
        months: "grid grid-cols-3 gap-1",
        weekdays: "grid grid-cols-7 text-center text-xs text-muted-foreground",
        weekday: "py-2",
        days: "grid grid-cols-7 gap-1 data-[mode='range']:gap-x-0",
        day: cn(
          "text-accent-foreground flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-transparent text-sm font-medium transition-colors duration-200 ease-in-out",
          // Hover Styles
          "hover:bg-accent hover:text-accent-foreground",
          // Focus Styles
          "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          // Disabled Styles
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          // Selected Styles
          "data-[selected=true]:bg-primary data-[selected=true]:!text-primary-foreground",
          // Today Styles
          "data-[today=true]:border-accent-foreground data-[today=true]:text-accent-foreground data-[today=true]:border-2",
          // Outside Month Styles
          "data-[outside=true]:text-muted-foreground data-[outside=true]:opacity-50",
          // Disabled Day Styles
          "data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
          // OutSide Day Styles
          "data-[outside-date=true]:pointer-events-none data-[outside-date=true]:cursor-not-allowed data-[outside-date=true]:opacity-50",
          // Range Start Styles
          "data-[range-start=true]:bg-primary data-[range-start=true]:!text-primary-foreground data-[range-start=true]:rounded-tr-none data-[range-start=true]:rounded-br-none",
          // Range End Styles
          "data-[range-end=true]:bg-primary data-[range-end=true]:!text-primary-foreground data-[range-end=true]:rounded-tl-none data-[range-end=true]:rounded-bl-none",
          // Range Dates Styles
          "data-[range-dates=true]:bg-muted data-[range-dates=true]:!text-muted-foreground data-[range-dates=true]:!rounded-none",
          // UnVisible Day Styles
          "data-[visibility=true]:pointer-events-none data-[visibility=true]:invisible data-[visibility=true]:cursor-not-allowed",
        ),
      }}
    />
  )
}
