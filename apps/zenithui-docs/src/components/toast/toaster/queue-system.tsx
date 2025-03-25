"use client"

import PreviewComponent from "@/components/preview-component"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "@zenithui/toast"

export default function ToasterQueue() {
  const [count, setCount] = useState<number>(0)

  return (
    <PreviewComponent>
      <Button
        onClick={() => {
          toast.success(`Toast of count : ${count + 1}`)
          setCount(count + 1)
        }}
      >
        {`show ${count + 1} toast`}
      </Button>
    </PreviewComponent>
  )
}
