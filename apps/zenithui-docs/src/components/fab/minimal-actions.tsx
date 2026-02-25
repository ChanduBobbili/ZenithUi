"use client"

import * as Fab from "@zenithui/fab"
import { Plus, FilePlus, FolderPlus } from "lucide-react"
import { cn } from "@/lib/utils"

const itemStyles = cn(
  "group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm",
  "hover:bg-accent hover:text-accent-foreground",
  "focus:ring-primary/20 focus:ring-2 focus:outline-none",
  "transition-colors",
)

export default function MinimalActionsFab() {
  return (
    <Fab.Root
      position="bottom-left"
      xOffset={24}
      yOffset={24}
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
        placement="top"
        offset={8}
        className={cn(
          "border-border bg-background min-w-[9rem] rounded-lg border p-2 shadow-lg",
          "animate-in fade-in-0 zoom-in-95 duration-150",
        )}
      >
        <Fab.Item className={itemStyles}>
          <FilePlus
            className="size-4 shrink-0"
            aria-hidden
          />
          New file
        </Fab.Item>
        <Fab.Item className={itemStyles}>
          <FolderPlus
            className="size-4 shrink-0"
            aria-hidden
          />
          New folder
        </Fab.Item>
      </Fab.Content>
    </Fab.Root>
  )
}
