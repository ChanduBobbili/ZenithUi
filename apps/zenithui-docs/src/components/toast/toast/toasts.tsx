"use client"

import CodePreview from "@/components/code-preview"
import { Button } from "@/components/ui/button"
import { toast } from "@zenithui/toast"

export default function ToastsExample({
  type,
}: {
  type: "s" | "i" | "w" | "e" | "w-c" | "l"
}) {
  return (
    <CodePreview
      code={{
        code: `
import { toast } from "@zenithui/toast"

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
            case "s":
              toast.success("This is a success toast")
              break
            case "i":
              toast.info("This is a info toast")
              break
            case "w":
              toast.warning("This is a warning toast")
              break
            case "e":
              toast.error("This is a error toast")
              break
            case "w-c":
              toast.success("This is a success toast", {
                showCloseButton: true,
              })
              break
            case "l":
              toast.loading("This is a loading toast")
            default:
              break
          }
        }}
      >
        Render toast
      </Button>
    </CodePreview>
  )
}

const getToastCode = (type: "s" | "i" | "w" | "e" | "w-c" | "l") => {
  switch (type) {
    case "s":
      return `toast.success("This is a success toast")`
    case "i":
      return `toast.info("This is a info toast")`
    case "w":
      return `toast.warning("This is a warning toast")`
    case "e":
      return `toast.error("This is a error toast")`
    case "w-c":
      return `toast.warning("This is a warning toast", { showCloseButton: true })`
    case "l":
      return `toast.loading("This is a loading toast")`
    default:
      return `toast.success("This is a success toast")`
  }
}
