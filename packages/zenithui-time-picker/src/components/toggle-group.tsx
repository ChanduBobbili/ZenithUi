"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cn } from "../utils"

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        "flex size-9 items-center justify-center rounded-md border text-center text-sm",
        // Active state
        "active:scale-95 active:border-none active:border-transparent active:outline-none active:ring-0 active:hover:border-none active:hover:outline-none active:hover:ring-0 active:focus:border-none active:focus:outline-none active:focus:ring-0 active:disabled:border-none active:disabled:outline-none active:disabled:ring-0",
        // Hover state
        "hover:border-none hover:bg-slate-200",
        // Transition
        "transition-all duration-300 ease-in-out",
        // Focus state
        "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50",
        // Focus visible state
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-opacity-50",
        // Disabled state
        "disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:opacity-50",
        "disabled:hover:bg-slate-200 disabled:hover:text-slate-500",
        "disabled:active:scale-100 disabled:active:ring-0",
        "disabled:focus:outline-none disabled:focus:ring-0",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
