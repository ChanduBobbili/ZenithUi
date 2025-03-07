"use client"

import CodePreview from "@/components/code-preview"
import { Button } from "@/components/ui/button"
import { toast } from "zenithui-toast"

export default function PromiseToast() {
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
        toast.promise(customPromise, {
            loading: "Please Wait !!",
            success: "Promise Success !!",
            error: "Promise Error !!",
          })
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
          const customPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
              const check = Math.random() > 0.5
              if (check) {
                resolve("Promise resolved")
              } else {
                reject("Promise rejected")
              }
            }, 5000)
          })
          toast.promise(customPromise, {
            loading: "Please Wait !!",
            success: "Promise Success !!",
            error: "Promise Error !!",
          })
        }}
      >
        Render Toast
      </Button>
    </CodePreview>
  )
}
