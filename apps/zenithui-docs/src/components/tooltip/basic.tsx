"use client"
import { Tooltip } from "@zenithui/tooltip"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function BasicTooltip() {
  return (
    <>
      <Tooltip.Root>
        <Tooltip.Trigger>
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
    </>
  )
}
