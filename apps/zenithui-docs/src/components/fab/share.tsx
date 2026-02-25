"use client"

import * as Fab from "@zenithui/fab"
import { Share2, Link2, Mail, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const itemStyles = cn(
  "group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm",
  "hover:bg-accent hover:text-accent-foreground",
  "focus:ring-primary/20 focus:ring-2 focus:outline-none",
  "transition-colors",
)

export default function ShareFab() {
  return (
    <Fab.Root
      position="top-left"
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
        <Share2
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
        <Fab.Group>
          <Fab.Label
            className="text-muted-foreground mb-2 block text-xs font-semibold tracking-wider uppercase"
            aria-hidden
          >
            Share
          </Fab.Label>
          <Fab.Item className={itemStyles}>
            <Link2
              className="size-4 shrink-0"
              aria-hidden
            />
            Copy link
          </Fab.Item>
          <Fab.Item className={itemStyles}>
            <Mail
              className="size-4 shrink-0"
              aria-hidden
            />
            Email
          </Fab.Item>
          <Fab.Item className={itemStyles}>
            <MessageCircle
              className="size-4 shrink-0"
              aria-hidden
            />
            Messages
          </Fab.Item>
        </Fab.Group>
      </Fab.Content>
    </Fab.Root>
  )
}
