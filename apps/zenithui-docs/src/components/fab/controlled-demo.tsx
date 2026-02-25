"use client"

import * as Fab from "@zenithui/fab"
import { useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const itemStyles = cn(
  "group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm",
  "hover:bg-accent hover:text-accent-foreground",
  "focus:ring-primary/20 focus:ring-2 focus:outline-none",
  "transition-colors",
)

export default function ControlledDemoFab() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        FAB is controlled: <strong>{open ? "open" : "closed"}</strong>. Toggle
        below or use the FAB.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="border-input bg-background hover:bg-accent rounded-md border px-3 py-1.5 text-sm"
        >
          Open FAB
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="border-input bg-background hover:bg-accent rounded-md border px-3 py-1.5 text-sm"
        >
          Close FAB
        </button>
      </div>
      <Fab.Root
        open={open}
        onOpenChange={setOpen}
        position="bottom-center"
        xOffset={24}
        yOffset={24}
      >
        <Fab.Trigger
          className={cn(
            "flex size-14 items-center justify-center rounded-full shadow-lg transition-all",
            "bg-primary text-primary-foreground",
            "hover:scale-105 hover:shadow-xl",
            "focus:outline-primary focus:outline focus:outline-offset-2",
          )}
        >
          <Plus
            className="size-6"
            aria-hidden
          />
        </Fab.Trigger>
        <Fab.Content
          placement="top"
          offset={12}
          className={cn(
            "border-border bg-background min-w-[10rem] rounded-xl border p-3 shadow-lg",
            "animate-in fade-in-0 zoom-in-95 duration-200",
          )}
        >
          <Fab.Item className={itemStyles}>Controlled action 1</Fab.Item>
          <Fab.Item className={itemStyles}>Controlled action 2</Fab.Item>
        </Fab.Content>
      </Fab.Root>
    </div>
  )
}
