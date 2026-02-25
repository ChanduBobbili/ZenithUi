import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@zenithui/utils"
import * as React from "react"

const Root = PopoverPrimitive.Root as React.ElementType
const Trigger = PopoverPrimitive.Trigger as React.ElementType
const Close = PopoverPrimitive.Close as React.ElementType
const Portal = PopoverPrimitive.Portal as React.ElementType
const Content = PopoverPrimitive.Content as React.ElementType
const Anchor = PopoverPrimitive.Anchor as React.ElementType

const Popover = (
  props: PopoverPrimitive.PopoverProps & { "data-slot"?: string },
) => {
  return (
    <Root
      data-slot="popover"
      {...props}
    />
  )
}

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  PopoverPrimitive.PopoverTriggerProps & { "data-slot"?: string }
>((props, ref) => (
  <Trigger
    ref={ref}
    data-slot="popover-trigger"
    {...props}
  />
))
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverClose = React.forwardRef<
  HTMLButtonElement,
  PopoverPrimitive.PopoverCloseProps & { "data-slot"?: string }
>((props, ref) => (
  <Close
    ref={ref}
    data-slot="popover-close"
    {...props}
  />
))
PopoverClose.displayName = "PopoverClose"

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverPrimitive.PopoverContentProps & {
    isWithPortal?: boolean
    "data-slot"?: string
  }
>(
  (
    {
      className,
      align = "center",
      sideOffset = 4,
      isWithPortal = true,
      ...props
    },
    ref,
  ) => {
    const content = (
      <Content
        ref={ref}
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    )
    return isWithPortal ? <Portal>{content}</Portal> : content
  },
)
PopoverContent.displayName = "PopoverContent"

const PopoverAnchor = React.forwardRef<
  HTMLDivElement,
  PopoverPrimitive.PopoverAnchorProps & { "data-slot"?: string }
>((props, ref) => (
  <Anchor
    ref={ref}
    data-slot="popover-anchor"
    {...props}
  />
))
PopoverAnchor.displayName = "PopoverAnchor"

export { Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger }
