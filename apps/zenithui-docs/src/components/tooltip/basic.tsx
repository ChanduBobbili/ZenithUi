"use client"
import { Tooltip } from "@zenithui/tooltip"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function BasicTooltip() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Tooltip.Root open={open}>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Hover</Button>
        </Tooltip.Trigger>
        <Tooltip.Content
          side="top"
          animation="fade"
          className={cn(
            "bg-card-foreground text-card z-50 rounded-sm px-3.5 py-2 text-sm",
          )}
        >
          Add to library
        </Tooltip.Content>
      </Tooltip.Root>

      <Button
        variant="outline"
        onClick={() => setOpen((open) => !open)}
      >
        open
      </Button>
    </>
  )
}
