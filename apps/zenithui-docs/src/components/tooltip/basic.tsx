"use client"
import { Tooltip } from "@zenithui/tooltip"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function BasicTooltip() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button variant="outline">Hover</Button>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={cn(
          "bg-card-foreground text-card animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-sm px-3.5 py-2 text-xs",
        )}
      >
        <p>Add to library</p>
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
