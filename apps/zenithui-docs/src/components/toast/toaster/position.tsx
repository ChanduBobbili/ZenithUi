"use client"

import CodePreview from "@/components/code-preview"
import { Button } from "@/components/ui/button"
import { toast, ToastProvider } from "zenithui-toast"

export default function ToasterPosition() {
  return (
    <CodePreview
      code={{
        code: `
import { Button } from "@/components/ui/button"
import { toast, ToastProvider } from "zenithui-toast"

const App = () => {

  return (
   <ToastProvider position="bottom-left">
          <Button
            onClick={() => {
              toast.success("Bottom Left Toast")
            }}
          >
            Bottom Left
          </Button>
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
        <ToastProvider position="bottom-left">
          <Button
            onClick={() => {
              toast.success("Bottom Left Toast")
            }}
          >
            Bottom Left
          </Button>
        </ToastProvider>
        {/* Bottom Right */}
        {/* Bottom Center */}
        {/* Top Right */}
        {/* Top Left */}
        {/* Top Center */}
      </div>
    </CodePreview>
  )
}
