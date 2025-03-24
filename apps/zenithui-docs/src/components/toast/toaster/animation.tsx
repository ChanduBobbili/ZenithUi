"use client"

import CodePreview from "@/components/code-preview"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "@zenithui/toast"

export default function ToasterAnimation() {
  const [animation, setAnimation] = useState<string>("fade")

  return (
    <CodePreview
      code={{
        code: `
import { toast, ToastProvider } from "zenithui-toast"

const App = () => {

  return (
   <ToastProvider animation="${animation}">
      <button
        onClick={() => {
          toast.success("Toast with ${animation[0].toUpperCase()}${animation.slice(1)}")
        }}
      >
      ${animation[0].toUpperCase()}${animation.slice(1)}
    </button>
  </ToastProvider>
  );
};

export default App;
            `,
        language: "jsx",
      }}
    >
      <div className="flex flex-wrap gap-4">
        {/* fade */}
        <Button
          onClick={() => {
            setAnimation("fade")
            toast.success("Toast with fade animation", { animation: "fade" })
          }}
        >
          Fade
        </Button>
        {/* slide */}
        <Button
          onClick={() => {
            setAnimation("slide")
            toast.success("Toast with slide animation", { animation: "slide" })
          }}
        >
          Slide
        </Button>
        {/* enter with icon */}
        <Button
          onClick={() => {
            setAnimation("enter-with-icon")
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
