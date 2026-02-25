"use client"

import type { ComponentProps } from "react"
import * as FabPrimitive from "@zenithui/fab"
import { cn } from "@/lib/utils"

export function FabRoot(props: ComponentProps<typeof FabPrimitive.Root>) {
  return <FabPrimitive.Root {...props} />
}

export function FabTrigger({
  className,
  ...props
}: ComponentProps<typeof FabPrimitive.Trigger>) {
  return (
    <FabPrimitive.Trigger
      className={cn(
        "flex size-12 items-center justify-center rounded-full shadow-lg transition-all",
        "bg-primary text-primary-foreground",
        "focus:outline-primary hover:opacity-90 focus:outline-2 focus:outline-offset-2",
        className,
      )}
      {...props}
    />
  )
}

export function FabContent({
  className,
  ...props
}: ComponentProps<typeof FabPrimitive.Content>) {
  return (
    <FabPrimitive.Content
      className={cn(
        "border-border bg-background min-w-[12rem] rounded-xl border p-3 shadow-lg",
        className,
      )}
      {...props}
    />
  )
}

export function FabGroup({
  className,
  ...props
}: ComponentProps<typeof FabPrimitive.Group>) {
  return (
    <FabPrimitive.Group
      className={cn(className)}
      {...props}
    />
  )
}

export function FabLabel({
  className,
  ...props
}: ComponentProps<typeof FabPrimitive.Label>) {
  return (
    <FabPrimitive.Label
      className={cn(
        "text-muted-foreground mb-2 block text-xs font-semibold tracking-wider uppercase",
        className,
      )}
      {...props}
    />
  )
}

export function FabSeparator({
  className,
  ...props
}: ComponentProps<typeof FabPrimitive.Separator>) {
  return (
    <FabPrimitive.Separator
      className={cn("bg-border my-2 h-px", className)}
      {...props}
    />
  )
}

export function FabItem({
  className,
  ...props
}: ComponentProps<typeof FabPrimitive.Item>) {
  return (
    <FabPrimitive.Item
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:ring-primary/20 focus:ring-2 focus:outline-none",
        "transition-colors",
        className,
      )}
      {...props}
    />
  )
}

export function FabItemIndicator({
  className,
  ...props
}: ComponentProps<typeof FabPrimitive.ItemIndicator>) {
  return (
    <FabPrimitive.ItemIndicator
      className={cn(
        "hidden size-4 shrink-0 group-data-[state=checked]:inline-flex",
        className,
      )}
      {...props}
    />
  )
}

export function FabCheckboxItem({
  className,
  ...props
}: ComponentProps<typeof FabPrimitive.CheckboxItem>) {
  return (
    <FabPrimitive.CheckboxItem
      className={cn(
        "group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:ring-primary/20 focus:ring-2 focus:outline-none",
        "transition-colors",
        className,
      )}
      {...props}
    />
  )
}

export function FabRadioGroup({
  className,
  ...props
}: ComponentProps<typeof FabPrimitive.RadioGroup>) {
  return (
    <FabPrimitive.RadioGroup
      className={cn(className)}
      {...props}
    />
  )
}

export function FabRadioItem({
  className,
  ...props
}: ComponentProps<typeof FabPrimitive.RadioItem>) {
  return (
    <FabPrimitive.RadioItem
      className={cn(
        "group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:ring-primary/20 focus:ring-2 focus:outline-none",
        "transition-colors",
        className,
      )}
      {...props}
    />
  )
}
