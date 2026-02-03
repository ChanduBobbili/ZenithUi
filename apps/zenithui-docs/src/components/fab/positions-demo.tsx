"use client"

import * as Fab from "@zenithui/fab"
import { useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const positions = [
  "top-left",
  "top-center",
  "top-right",
  "center-left",
  "center",
  "center-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const

type Position = (typeof positions)[number]

const itemStyles = cn(
  "group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm",
  "hover:bg-accent hover:text-accent-foreground",
  "focus:ring-primary/20 focus:ring-2 focus:outline-none",
  "transition-colors",
)

export default function PositionsDemoFab() {
  const [position, setPosition] = useState<Position>("bottom-right")

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-sm">Position:</span>
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value as Position)}
          className="border-input bg-background rounded-md border px-2 py-1 text-sm"
        >
          {positions.map((p) => (
            <option
              key={p}
              value={p}
            >
              {p}
            </option>
          ))}
        </select>
      </div>
      <Fab.Root
        position={position}
        xOffset={20}
        yOffset={20}
      >
        <Fab.Trigger
          className={cn(
            "flex size-12 items-center justify-center rounded-full shadow-lg transition-all",
            "bg-primary text-primary-foreground",
            "focus:outline-primary hover:opacity-90 focus:outline focus:outline-offset-2",
          )}
        >
          <Plus
            className="size-5"
            aria-hidden
          />
        </Fab.Trigger>
        <Fab.Content
          placement={position.includes("bottom") ? "top" : "bottom"}
          offset={8}
          className={cn(
            "border-border bg-background min-w-[9rem] rounded-lg border p-2 shadow-lg",
            "animate-in fade-in-0 zoom-in-95 duration-150",
          )}
        >
          <Fab.Item className={itemStyles}>Action one</Fab.Item>
          <Fab.Item className={itemStyles}>Action two</Fab.Item>
        </Fab.Content>
      </Fab.Root>
    </div>
  )
}
