"use client"

import CodePreview from "@/components/code-preview"
import { Button } from "@/components/ui/button"
import { toast } from "@zenithui/toast"

export default function BasicToast() {
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
        toast.success('This is a toast');
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
          toast.success("This is a toast")
        }}
      >
        Render toast
      </Button>
    </CodePreview>
  )
}
