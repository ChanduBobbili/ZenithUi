"use client"

import type { ComponentProps } from "react"
import * as TooltipPrimitive from "@zenithui/tooltip"
import { cn } from "@/lib/utils"

export const TooltipProvider = TooltipPrimitive.Provider

export function Tooltip({
  delayDuration = 700,
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipPrimitive.Root
      {...props}
      delayDuration={delayDuration}
    >
      {children}
    </TooltipPrimitive.Root>
  )
}

export function TooltipTrigger({
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return (
    <TooltipPrimitive.Trigger {...props}>{children}</TooltipPrimitive.Trigger>
  )
}

export function TooltipContent({
  className,
  children,
  showArrow = true,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content> & {
  showArrow?: boolean
}) {
  return (
    <TooltipPrimitive.Content
      {...props}
      className={cn(
        "bg-card-foreground text-card z-50 rounded-sm px-3.5 py-2 text-xs",
        className,
      )}
    >
      {children}
      {showArrow && <TooltipPrimitive.Arrow />}
    </TooltipPrimitive.Content>
  )
}
