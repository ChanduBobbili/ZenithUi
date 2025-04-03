import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { DayPicker } from "@zenithui/day-picker"

export const Route = createFileRoute("/_demo/day-picker")({
  component: RouteComponent,
})

function RouteComponent() {
  const after7Days = new Date()
  after7Days.setDate(new Date().getDate() + 7)
  const [selectedDate, setSelectedDate] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: after7Days,
  })
  const [date, setDate] = useState<Date>(new Date())
  return (
    <div className="flex gap-4">
      <DayPicker
        mode="range"
        selected={selectedDate}
        onSelect={setSelectedDate}
        theme="light"
        // classNames={{
        //   calendar: "bg-slate-50",
        //   day: "bg-slate-50",
        //   rangeDates: "bg-sky-50",
        //   rangeStart: "bg-blue-500",
        //   rangeEnd: "bg-red-500",
        //   outsideDate: "bg-red-100",
        // }}
      />
      <DayPicker
        mode="single"
        selected={date}
        onSelect={setDate}
        theme="light"
        disabled={{
          modifier: (date) => {
            return date.getDay() === 5
          },
        }}
        // classNames={{
        //   calendar: "bg-slate-50",
        //   day: "bg-slate-50",
        //   rangeDates: "bg-sky-50",
        //   rangeStart: "bg-blue-500",
        //   rangeEnd: "bg-red-500",
        //   outsideDate: "bg-red-100",
        // }}
      />
    </div>
  )
}
