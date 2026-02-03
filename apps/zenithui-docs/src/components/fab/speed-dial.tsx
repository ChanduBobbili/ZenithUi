"use client"

import * as Fab from "@zenithui/fab"
import { Plus, Share2, FileEdit, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

const actions = [
  { icon: Share2, label: "Share" },
  { icon: FileEdit, label: "Edit" },
  { icon: Mail, label: "Send" },
]

const itemStyles = cn(
  "group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm",
  "hover:bg-accent hover:text-accent-foreground",
  "focus:ring-primary/20 focus:ring-2 focus:outline-none",
  "transition-colors",
)

export default function SpeedDialFab() {
  return (
    <Fab.Root
      position="bottom-right"
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
          "border-border bg-background min-w-[10rem] rounded-xl border p-2 shadow-lg",
          "animate-in fade-in-0 zoom-in-95 duration-200",
        )}
      >
        <Fab.Group>
          {actions.map(({ icon: Icon, label }) => (
            <Fab.Item
              key={label}
              className={itemStyles}
            >
              <Icon
                className="size-4 shrink-0"
                aria-hidden
              />
              {label}
            </Fab.Item>
          ))}
        </Fab.Group>
      </Fab.Content>
    </Fab.Root>
  )
}
