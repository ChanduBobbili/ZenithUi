import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "@zenithui/toast"

export const Route = createFileRoute("/_demo/toast")({
  component: RouteComponent,
})

function RouteComponent() {
  const [items, setItems] = useState<number[]>([])

  const handleAction = () => {
    console.log("Custom Toast Action Triggered")
    toast.info("Action btn is clicked !!")
  }

  const handleCancel = () => {
    console.log("Custom Toast Cancel Triggered")
    toast.info("Cancel btn is clicked !!")
  }

  const customPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const check = Math.random() > 0.5
      if (check) {
        resolve("Promise resolved")
      } else {
        reject("Promise rejected")
      }
    }, 10000)
  })

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() =>
          toast.success("Success Toast", {
            animation: "slide",
            duration: 2000,
            showCloseButton: true,
            richColors: true,
            description: "Success Description",
          })
        }
      >
        Toast Success
      </button>
      <button onClick={() => toast.info("Info Toast")}>Toast Info</button>
      <button
        onClick={() =>
          toast.error("Error Toast", {
            title: "Error Title",
            description: "Error Description",
            showCloseButton: true,
            // richColors: true,
            position: "top-right",
            classNames: {
              className: "text-red-500",
              icon: "text-blue-500",
              closeButton: "text-black bg-blue-500",
              description: "text-sky-500",
            },
          })
        }
      >
        Toast Error
      </button>
      <button
        onClick={() =>
          toast.warning("Warning Toast", {
            position: "top-left",
            showCloseButton: true,
            description: "Warning Description",
            classNames: { description: "text-red-500" },
            action: (props) => (
              <button
                {...props}
                onClick={() => console.log("custom component")}
              >
                Action
              </button>
            ),
          })
        }
      >
        Toast Warning
      </button>
      <button
        onClick={() => {
          toast.success("Custom Toast", {
            position: "top-center",
            showCloseButton: true,
            description: "Custom Description",
            disableAutoDismiss: true,
            onAction: handleAction,
            onCancel: handleCancel,
          })
        }}
      >
        Custom
      </button>

      <button
        onClick={() => {
          toast.loading("Please Wait !!", {
            animation: "enter-with-icon",
            disableAutoDismiss: true,
            position: "top-center",
          })
        }}
      >
        Loading
      </button>

      <button
        onClick={() => {
          toast.promise(customPromise, {
            loading: "Please Wait !!",
            success: (data) => {
              return JSON.stringify(data)
            },
            error: "Promise Error !!",
          })
        }}
      >
        Promise
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
