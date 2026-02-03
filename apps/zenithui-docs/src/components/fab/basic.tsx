"use client"

import * as Fab from "@zenithui/fab"
import { useState } from "react"
import {
  Plus,
  Share2,
  FileEdit,
  Mail,
  Check,
  List,
  LayoutGrid,
} from "lucide-react"
import { cn } from "@/lib/utils"

const quickActions = [
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

const indicatorStyles =
  "hidden size-4 shrink-0 group-data-[state=checked]:inline-flex"

export default function BasicFab() {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState("list")
  const [compact, setCompact] = useState(false)

  return (
    <Fab.Root
      open={open}
      onOpenChange={setOpen}
      position="bottom-center"
      xOffset={0}
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
          className={cn(
            "size-6 transition-transform duration-200",
            open && "rotate-45",
          )}
          aria-hidden
        />
      </Fab.Trigger>
      <Fab.Content
        placement="top"
        offset={12}
        className={cn(
          "border-border bg-background min-w-[12rem] rounded-xl border p-3 shadow-lg",
          "animate-in fade-in-0 zoom-in-95 duration-200",
        )}
      >
        <Fab.Group>
          <Fab.Label
            className="text-muted-foreground mb-2 block text-xs font-semibold tracking-wider uppercase"
            aria-hidden
          >
            Quick actions
          </Fab.Label>
          {quickActions.map(({ icon: Icon, label }) => (
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

        <Fab.Separator className="bg-border my-2 h-px" />

        <Fab.Group>
          <Fab.Label
            className="text-muted-foreground mb-2 block text-xs font-semibold tracking-wider uppercase"
            aria-hidden
          >
            View
          </Fab.Label>
          <Fab.RadioGroup
            value={view}
            onValueChange={setView}
          >
            <Fab.RadioItem
              value="list"
              className={itemStyles}
            >
              <List
                className="size-4 shrink-0"
                aria-hidden
              />
              List
              <Fab.ItemIndicator className={cn("ml-auto", indicatorStyles)}>
                <Check
                  className="size-4"
                  aria-hidden
                />
              </Fab.ItemIndicator>
            </Fab.RadioItem>
            <Fab.RadioItem
              value="grid"
              className={itemStyles}
            >
              <LayoutGrid
                className="size-4 shrink-0"
                aria-hidden
              />
              Grid
              <Fab.ItemIndicator className={cn("ml-auto", indicatorStyles)}>
                <Check
                  className="size-4"
                  aria-hidden
                />
              </Fab.ItemIndicator>
            </Fab.RadioItem>
          </Fab.RadioGroup>
        </Fab.Group>

        <Fab.Separator className="bg-border my-2 h-px" />

        <Fab.CheckboxItem
          checked={compact}
          onCheckedChange={setCompact}
          className={itemStyles}
        >
          Compact view
          <Fab.ItemIndicator className={cn("ml-auto", indicatorStyles)}>
            <Check
              className="size-4"
              aria-hidden
            />
          </Fab.ItemIndicator>
        </Fab.CheckboxItem>
      </Fab.Content>
    </Fab.Root>
  )
}
