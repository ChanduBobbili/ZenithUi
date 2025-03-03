"use client"

import PreviewComponent from "@/components/preview-component"
import { Button } from "@/components/ui/button"
import { toast } from "zenithui-toast"

export default function ToasterRichColors() {
  return (
    <PreviewComponent>
      {/* success */}
      <Button
        onClick={() => {
          toast.success("Success toast with rich color !!", {
            richColors: true,
          })
        }}
      >
        Success
      </Button>
      {/* info */}
      <Button
        onClick={() => {
          toast.info("Info toast with rich color !!", {
            richColors: true,
          })
        }}
      >
        Info
      </Button>
      {/* warning */}
      <Button
        onClick={() => {
          toast.warning("Success Toast with rich color !!", {
            richColors: true,
          })
        }}
      >
        Warning
      </Button>
      {/* error */}
      <Button
        onClick={() => {
          toast.error("Success Toast with rich color !!", {
            richColors: true,
          })
        }}
      >
        Error
      </Button>
    </PreviewComponent>
  )
}
