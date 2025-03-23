"use client"

import CodePreview from "@/components/code-preview"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "@zenithui/toast"

export default function ToastAnimations() {
  const [select, setSelect] = useState<"fade" | "slide" | "enter-with-icon">(
    "fade",
  )

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
        ${getToastCode(select)}
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
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          onClick={() => {
            setSelect("fade")
            toast.success("Toast with fade animation", {
              animation: "fade",
            })
          }}
        >
          Fade
        </Button>

        <Button
          onClick={() => {
            setSelect("slide")
            toast.success("Toast with slide animation", {
              animation: "slide",
            })
          }}
        >
          Slide
        </Button>

        <Button
          onClick={() => {
            setSelect("enter-with-icon")
            toast.success("Toast with enter with icon animation", {
              animation: "enter-with-icon",
            })
          }}
        >
          Enter with Icon
        </Button>
      </div>
    </CodePreview>
  )
}

const getToastCode = (animation: "fade" | "slide" | "enter-with-icon") => {
  switch (animation) {
    case "slide":
      return `toast.success("Toast with slide animation, {
            animation: "slide",
          })`
    case "enter-with-icon":
      return `toast.success("Toast with enter with icon animation", {
            animation: "enter-with-icon",
          })`
    case "fade":
    default:
      return `toast.success("Toast with fade animation", {
            animation: "fade",
          })`
  }
}
