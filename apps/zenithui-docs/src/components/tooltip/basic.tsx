"use client"
import * as TooltipPrimitive from "@zenithui/tooltip"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function BasicTooltip() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <TooltipPrimitive.Root open={open}>
        <TooltipPrimitive.Trigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side="top"
          animation="fade"
          className={cn(
            "bg-card-foreground text-card z-50 rounded-sm px-3.5 py-2 text-sm",
          )}
        >
          Add to library
          <TooltipPrimitive.Arrow />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>

      <Button
        variant="outline"
        onClick={() => setOpen((open) => !open)}
      >
        open
      </Button>
    </>
  )
}
