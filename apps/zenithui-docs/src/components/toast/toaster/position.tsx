"use client"

import CodePreview from "@/components/code-preview"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "zenithui-toast"

export default function ToasterPosition() {
  const [position, setPosition] = useState<string>("bottom-left")

  return (
    <CodePreview
      code={{
        code: `
import { toast, ToastProvider } from "zenithui-toast"

const App = () => {

  return (
   <ToastProvider position="${position}">
      <button
        onClick={() => {
          toast.success("${getFormattedPosition(position)} Toast")
        }}
      >
      ${getFormattedPosition(position)}
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
        {/* Bottom Left */}
        <Button
          onClick={() => {
            setPosition("bottom-left")
            toast.success("Bottom Left Toast", { position: "bottom-left" })
          }}
        >
          Bottom Left
        </Button>
        {/* Bottom Right */}
        <Button
          onClick={() => {
            setPosition("bottom-right")
            toast.info("Bottom Right Toast", { position: "bottom-right" })
          }}
        >
          Bottom Right
        </Button>
        {/* Bottom Center */}
        <Button
          onClick={() => {
            setPosition("bottom-center")
            toast.info("Bottom Center Toast", { position: "bottom-center" })
          }}
        >
          Bottom Center
        </Button>
        {/* Top Right */}
        <Button
          onClick={() => {
            setPosition("top-right")
            toast.info("Top Right Toast", { position: "top-right" })
          }}
        >
          Top Right
        </Button>
        {/* Top Left */}
        <Button
          onClick={() => {
            setPosition("top-left")
            toast.info("Top Left Toast", { position: "top-left" })
          }}
        >
          Top Left
        </Button>
        {/* Top Center */}
        <Button
          onClick={() => {
            setPosition("top-center")
            toast.info("Top Center Toast", { position: "top-center" })
          }}
        >
          Top Center
        </Button>
      </div>
    </CodePreview>
  )
}

function getFormattedPosition(position: string) {
  return position
    .split("-")
    .map((i) => {
      return i[0].toUpperCase() + i.slice(1)
    })
    .join(" ")
}
