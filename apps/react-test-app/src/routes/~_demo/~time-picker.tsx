import { createFileRoute } from "@tanstack/react-router"
import { TimePicker } from "@zenithui/time-picker"

export const Route = createFileRoute("/_demo/time-picker")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <TimePicker
        time="14:34"
        onTimeChange={(time) => console.log(time)}
        align="center"
        side="right"
        theme="light"
      />
    </div>
  )
}
