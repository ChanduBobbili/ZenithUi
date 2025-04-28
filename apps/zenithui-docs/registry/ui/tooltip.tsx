"use client"

import type { ComponentProps } from "react"
import { Tooltip } from "@zenithui/tooltip"

export function TooltipRoot({
  children,
  ...props
}: ComponentProps<typeof Tooltip.Root>) {
  return <Tooltip.Root {...props}>{children}</Tooltip.Root>
}

export function TooltipTrigger({
  children,
  ...props
}: ComponentProps<typeof Tooltip.Trigger>) {
  return <Tooltip.Trigger {...props}>{children}</Tooltip.Trigger>
}

export function TooltipContent({
  children,
  ...props
}: ComponentProps<typeof Tooltip.Content>) {
  return <Tooltip.Content {...props}>{children}</Tooltip.Content>
}
