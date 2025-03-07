"use client"

import CodePreview from "@/components/code-preview"
import { Button } from "@/components/ui/button"
import { toast } from "zenithui-toast"

export default function ActionToast({
  type,
}: {
  type: "action" | "cancel" | "close"
}) {
  return (
    <CodePreview
      code={{
        code: `
import { toast } from "zenithui-toast"

export default function BasicToast() {
  return (
    <button
      className="toast-button"
      onClick={() => {
        ${getToastCode(type)}
      }}
    >
      Render toast
    </button>
  );
}
`,
        language: "jsx",
      }}
    >
      <Button
        onClick={() => {
          switch (type) {
            case "action":
              toast.success("This is a toast", {
                onAction: () => {
                  toast.info("Toast's action btn clicked !!")
                },
              })
              break
            case "cancel":
              toast.success("This is a toast", {
                onCancel: () => {
                  toast.info("Toast's cancel btn clicked !!")
                },
              })
              break
            case "close":
              toast.success("This is a toast", {
                showCloseButton: true,
                onClose: () => {
                  toast.info("Toast's close btn clicked !!")
                },
              })
              break
            default:
              toast.success("This is a toast")
              break
          }
        }}
      >
        Render toast
      </Button>
    </CodePreview>
  )
}

function getToastCode(type: "action" | "cancel" | "close") {
  switch (type) {
    case "action":
      return `
toast.success("This is a toast", {
  onAction: () => {
    toast.info("Toast's action btn clicked !!")
  },
})`
    case "cancel":
      return `
toast.success("This is a toast", {
  onCancel: () => {
    toast.info("Toast's cancel btn clicked !!")
  },
})`
    case "close":
      return `
toast.success("This is a toast", {
  showCloseButton: true,
  onClose: () => {
    toast.info("Toast's close btn clicked !!")
  },
})`
    default:
      return `
toast.success("This is a toast")`
  }
}
