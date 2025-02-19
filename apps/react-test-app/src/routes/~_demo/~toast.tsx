import { createFileRoute } from "@tanstack/react-router"
import { toast } from "zenithui-toast"

export const Route = createFileRoute("/_demo/toast")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() =>
          toast.success("Success Toast", {
            animation: "slide",
            duration: 2000,
            disableAutoDismiss: true,
            showCloseButton: true,
            richColors: true,
          })
        }
      >
        Toast Success
      </button>
      <button onClick={() => toast.info("Info Toast")}>Toast Info</button>
      <button onClick={() => toast.error("Error Toast")}>Toast Error</button>
      <button onClick={() => toast.warning("Warning Toast")}>
        Toast Warning
      </button>

      <div className="relative"></div>
    </div>
  )
}
