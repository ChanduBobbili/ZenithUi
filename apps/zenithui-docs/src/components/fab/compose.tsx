"use client"

import * as Fab from "@zenithui/fab"
import { PenSquare, Mail, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const itemStyles = cn(
  "group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm",
  "hover:bg-accent hover:text-accent-foreground",
  "focus:ring-primary/20 focus:ring-2 focus:outline-none",
  "transition-colors",
)

export default function ComposeFab() {
  return (
    <Fab.Root
      position="top-right"
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
        <PenSquare
          className="size-6"
          aria-hidden
        />
      </Fab.Trigger>
      <Fab.Content
        placement="top"
        offset={12}
        className={cn(
          "border-border bg-background min-w-[11rem] rounded-xl border p-3 shadow-lg",
          "animate-in fade-in-0 zoom-in-95 duration-200",
        )}
      >
        <Fab.Group>
          <Fab.Label
            className="text-muted-foreground mb-2 block text-xs font-semibold tracking-wider uppercase"
            aria-hidden
          >
            New
          </Fab.Label>
          <Fab.Item className={itemStyles}>
            <Mail
              className="size-4 shrink-0"
              aria-hidden
            />
            New email
          </Fab.Item>
          <Fab.Item className={itemStyles}>
            <FileText
              className="size-4 shrink-0"
              aria-hidden
            />
            New draft
          </Fab.Item>
        </Fab.Group>
      </Fab.Content>
    </Fab.Root>
  )
}
