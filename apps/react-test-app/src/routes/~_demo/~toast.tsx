import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "zenithui-toast"

export const Route = createFileRoute("/_demo/toast")({
  component: RouteComponent,
})

function RouteComponent() {
  const [items, setItems] = useState<number[]>([])
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
      <button
        onClick={() =>
          toast.error("Error Toast", {
            richColors: true,
          })
        }
      >
        Toast Error
      </button>
      <button
        onClick={() =>
          toast.warning("Warning Toast", {
            position: "top-left",
          })
        }
      >
        Toast Warning
      </button>

      <div className="relative size-80 bg-slate-100">
        <button
          onClick={() =>
            setItems((prev) => [...prev, Math.floor(Math.random() * 10)])
          }
        >
          Add
        </button>
        {items.reverse().map((item, index) => (
          <div
            key={item}
            className="absolute bottom-10 right-2 h-20 w-60 rounded-sm bg-slate-300 shadow-md"
            style={{
              opacity: `${1 - index * 0.35}`,
              transform: `translateY(${-1 - index * 1 + "rem"}) scale(${1 - index * 0.05})`,
              zIndex: `${items.length - index}`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
